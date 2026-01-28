require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.SCALINGO_POSTGRESQL_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize database table
async function initDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS achievements (
      id SERIAL PRIMARY KEY,
      achievement_id VARCHAR(100) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      image_url TEXT,
      guide_description TEXT,
      how_to_complete TEXT,
      characters JSONB,
      points INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log('Database table initialized');
    
    // Insert sample data if table is empty
    const countResult = await pool.query('SELECT COUNT(*) FROM achievements');
    if (parseInt(countResult.rows[0].count) === 0) {
      await insertSampleData();
    }
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

// Insert sample Alan Wake achievements
async function insertSampleData() {
  const sampleAchievements = [
    {
      achievement_id: 'aw_lightbringer',
      name: 'Light Bringer',
      description: 'Defeat 50 Taken using only flares',
      image_url: '/images/achievement-placeholder.png',
      guide_description: 'This achievement requires you to use flares strategically to defeat enemies. Flares create a protective barrier of light that burns away the darkness possessing the Taken.',
      how_to_complete: 'Focus on using handheld flares and flare guns rather than your flashlight and firearms. The best locations are Episode 2 and Episode 4 where there are many Taken encounters. Hold the flare until multiple Taken are close, then drop it at your feet or shoot a flare gun into groups. Each Taken killed by the flare light counts toward your total.',
      characters: JSON.stringify([
        { name: 'Alan Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alan_Wake' },
        { name: 'The Taken', fandom_url: 'https://alanwake.fandom.com/wiki/Taken' }
      ]),
      points: 25
    },
    {
      achievement_id: 'aw_nightmare',
      name: 'Nightmare Difficulty',
      description: 'Complete the game on Nightmare difficulty',
      image_url: '/images/achievement-placeholder.png',
      guide_description: 'This is the hardest difficulty in Alan Wake. Enemies are tougher, deal more damage, and ammunition is extremely scarce. You must be strategic with every resource.',
      how_to_complete: 'Complete all episodes on Nightmare mode. Master dodging to conserve ammunition. Use environmental hazards whenever possible. Save revolver ammo for Taken that are already weak. Focus on headshots with the hunting rifle. Use flares to crowd control. Consider playing through once on Normal first to learn enemy spawns and collect manuscript pages.',
      characters: JSON.stringify([
        { name: 'Alan Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alan_Wake' }
      ]),
      points: 50
    },
    {
      achievement_id: 'aw_manuscript_hunter',
      name: 'Manuscript Hunter',
      description: 'Collect all 106 manuscript pages',
      image_url: '/images/achievement-placeholder.png',
      guide_description: 'Find all manuscript pages scattered throughout Bright Falls. These pages reveal parts of the story Alan has written, often foreshadowing events you will encounter.',
      how_to_complete: 'Explore thoroughly every area you visit. Use your flashlight to reveal hidden pages that glow with a golden light. Some pages only appear on Nightmare difficulty. Check buildings, rest stops, lookout points, and off-path locations. Episodes 2, 4, and 5 have the most pages. Keep track of which episodes you need to replay using the Statistics menu.',
      characters: JSON.stringify([
        { name: 'Thomas Zane', fandom_url: 'https://alanwake.fandom.com/wiki/Thomas_Zane' },
        { name: 'Barbara Jagger', fandom_url: 'https://alanwake.fandom.com/wiki/Barbara_Jagger' }
      ]),
      points: 30
    },
    {
      achievement_id: 'aw_collector',
      name: 'The Collector',
      description: 'Find all 100 coffee thermoses',
      image_url: '/images/achievement-placeholder.png',
      guide_description: 'Alan needs his coffee! Track down every thermos hidden throughout the game. These collectibles are well-hidden and often in unexpected locations.',
      how_to_complete: 'Search everywhere: cabins, rest areas, behind objects, on high ledges, and in secluded spots. Use a guide if needed as some thermoses are very difficult to spot. This achievement cannot be completed on Nightmare difficulty as thermoses do not appear in that mode. Best done during a Normal or Hard playthrough.',
      characters: JSON.stringify([]),
      points: 25
    },
    {
      achievement_id: 'aw_signal',
      name: 'Follow the Signal',
      description: 'Complete The Signal DLC episode',
      image_url: '/images/achievement-placeholder.png',
      guide_description: 'The first DLC takes Alan deeper into the nightmare. Reality becomes even more unstable as he struggles to find the way out of the Dark Place.',
      how_to_complete: 'Navigate through the surreal nightmare environments where objects and locations shift unexpectedly. Fight through waves of Taken while following mysterious television signals. Use words you find to reshape reality and create safe paths. Watch for environmental changes and be ready to adapt your strategy quickly.',
      characters: JSON.stringify([
        { name: 'Alan Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alan_Wake' },
        { name: 'Thomas Zane', fandom_url: 'https://alanwake.fandom.com/wiki/Thomas_Zane' }
      ]),
      points: 20
    },
    {
      achievement_id: 'aw_writer',
      name: 'The Writer',
      description: 'Complete The Writer DLC episode',
      image_url: '/images/achievement-placeholder.png',
      guide_description: 'In the final DLC episode, Alan must confront his dark double and find the strength to write his way back to reality.',
      how_to_complete: 'Use the power of words to manipulate the nightmare world around you. Shine your light on words to make them real and create paths forward. Battle manifestations of Mr. Scratch and face your fears. The final confrontation requires you to embrace your role as a writer and take control of the story.',
      characters: JSON.stringify([
        { name: 'Alan Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alan_Wake' },
        { name: 'Mr. Scratch', fandom_url: 'https://alanwake.fandom.com/wiki/Mr._Scratch' }
      ]),
      points: 20
    },
    {
      achievement_id: 'aw_boob_tube',
      name: 'Boob Tube',
      description: 'Watch every single TV show',
      image_url: '/images/achievement-placeholder.png',
      guide_description: 'Find and watch all the Night Springs TV episodes scattered throughout the game. These Twilight Zone-style shows add atmosphere and Easter eggs.',
      how_to_complete: 'Look for televisions in safe houses, cabins, and other buildings throughout each episode. There are 14 TVs total showing episodes of the fictional show Night Springs. When you find a TV, interact with it and watch the entire episode. Missing even one will require a chapter replay.',
      characters: JSON.stringify([]),
      points: 10
    },
    {
      achievement_id: 'aw_paging_mr_wake',
      name: 'Paging Mr. Wake',
      description: 'Discover 25 manuscript pages',
      image_url: '/images/achievement-placeholder.png',
      guide_description: 'Begin your manuscript collection by finding your first 25 pages. This is a stepping stone toward the full collection.',
      how_to_complete: 'As you progress through Episodes 1-3, thoroughly explore each area. Manuscript pages emit a golden glow when you shine your flashlight near them. Check buildings, side paths, and elevated areas. This achievement will unlock naturally if you are exploring carefully during your first playthrough.',
      characters: JSON.stringify([
        { name: 'Alan Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alan_Wake' }
      ]),
      points: 15
    }
  ];

  for (const achievement of sampleAchievements) {
    try {
      await pool.query(
        `INSERT INTO achievements (achievement_id, name, description, image_url, guide_description, how_to_complete, characters, points)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (achievement_id) DO NOTHING`,
        [
          achievement.achievement_id,
          achievement.name,
          achievement.description,
          achievement.image_url,
          achievement.guide_description,
          achievement.how_to_complete,
          achievement.characters,
          achievement.points
        ]
      );
    } catch (err) {
      console.error('Error inserting sample achievement:', err);
    }
  }
  console.log('Sample achievements inserted');
}

// API Routes

// Get all achievements
app.get('/api/achievements', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM achievements ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching achievements:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get single achievement by ID
app.get('/api/achievements/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM achievements WHERE achievement_id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching achievement:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Add new achievement (for admin purposes)
app.post('/api/achievements', async (req, res) => {
  const { achievement_id, name, description, image_url, guide_description, how_to_complete, characters, points } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO achievements (achievement_id, name, description, image_url, guide_description, how_to_complete, characters, points)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [achievement_id, name, description, image_url, guide_description, how_to_complete, JSON.stringify(characters), points]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating achievement:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update achievement
app.put('/api/achievements/:id', async (req, res) => {
  const { name, description, image_url, guide_description, how_to_complete, characters, points } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE achievements 
       SET name = $1, description = $2, image_url = $3, guide_description = $4, 
           how_to_complete = $5, characters = $6, points = $7
       WHERE achievement_id = $8
       RETURNING *`,
      [name, description, image_url, guide_description, how_to_complete, JSON.stringify(characters), points, req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating achievement:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve achievement detail page
app.get('/achievement/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'achievement.html'));
});

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
