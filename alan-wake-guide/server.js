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
      achievement_id: 'aw_nightmare',
      name: 'Nightmare Difficulty',
      description: 'Complete the game on Nightmare difficulty',
      image_url: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Nightmare',
      guide_description: 'This is the hardest difficulty in Alan Wake. Enemies are tougher and ammunition is scarce.',
      how_to_complete: 'Complete all episodes on Nightmare mode. Save ammunition, use flares wisely, and master dodging. Focus on headshots with the revolver for maximum efficiency.',
      characters: JSON.stringify([
        { name: 'Alan Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alan_Wake' }
      ]),
      points: 50
    },
    {
      achievement_id: 'aw_collector',
      name: 'Manuscript Collector',
      description: 'Collect all manuscript pages',
      image_url: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Collector',
      guide_description: 'Find all 106 manuscript pages scattered throughout the game.',
      how_to_complete: 'Explore thoroughly, check every building and hidden area. Use a flashlight to reveal hidden pages. Some pages only appear on Nightmare difficulty.',
      characters: JSON.stringify([
        { name: 'Thomas Zane', fandom_url: 'https://alanwake.fandom.com/wiki/Thomas_Zane' }
      ]),
      points: 30
    },
    {
      achievement_id: 'aw_coffee',
      name: 'Coffee Thermos Hunter',
      description: 'Find all 100 coffee thermoses',
      image_url: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=Coffee',
      guide_description: 'Collect every coffee thermos hidden in the game.',
      how_to_complete: 'Search off the beaten path, check cabins, rest areas, and lookout points. Use guides to find the trickiest locations. Cannot be done on Nightmare difficulty.',
      characters: JSON.stringify([]),
      points: 25
    },
    {
      achievement_id: 'aw_signal',
      name: 'Follow the Signal',
      description: 'Complete The Signal DLC',
      image_url: 'https://via.placeholder.com/150/FFD700/000000?text=Signal',
      guide_description: 'Complete the first DLC episode focusing on Alan trapped in a nightmare.',
      how_to_complete: 'Navigate through surreal environments, fight through waves of Taken, and follow the mysterious television signals to escape.',
      characters: JSON.stringify([
        { name: 'Alan Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alan_Wake' },
        { name: 'Thomas Zane', fandom_url: 'https://alanwake.fandom.com/wiki/Thomas_Zane' }
      ]),
      points: 20
    },
    {
      achievement_id: 'aw_writer',
      name: 'The Writer',
      description: 'Complete The Writer DLC',
      image_url: 'https://via.placeholder.com/150/4169E1/FFFFFF?text=Writer',
      guide_description: 'Complete the second DLC episode and conclude Alan\'s journey.',
      how_to_complete: 'Use words to reshape reality, defeat Mr. Scratch manifestations, and reach the final confrontation to escape the Dark Place.',
      characters: JSON.stringify([
        { name: 'Alan Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alan_Wake' },
        { name: 'Mr. Scratch', fandom_url: 'https://alanwake.fandom.com/wiki/Mr._Scratch' }
      ]),
      points: 20
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
