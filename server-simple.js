const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const achievements = [
  {
    id: 1,
    achievement_id: 'follow_the_light',
    name: 'Follow the Light',
    description: 'Take a night course of light education',
    image_url: '/images/follow_the_light.png',
    guide_description: 'Beat the tutorial.',
    how_to_complete: 'You need to complete the tutorial at the start of the game (Episode One: Nightmare) which will cover all button like moving, looking around, sprinting, performing dodge, healing, using the flashlight to burn away the darkness, shooting and when to shoot. You cannot continue the game without it being done.',
    characters: [
      { name: 'Alan Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alan_Wake' }
    ],
    points: 50,
    difficulty: 'Easy',
    percentage: 83.0
  },
  {
    id: 2,
    achievement_id: 'let_there_be_light',
    name: 'Let There Be Light',
    description: 'Get a generator running',
    image_url: '/images/let_there_be_light.png',
    guide_description: 'The first generator is found - in Diver\'s Isle in Episode One: Nightmare',
    how_to_complete: 'In Episode One, you will arrive at the house where Alan and Alice Wake are to stay at. Alice has nyctophobia, which is a fear of the dark, and it beging to get dark, so she wishes you to turn the lights on. You must head outside from the front and you will see a shed that contains the generator. To operate it, you must press a key (space by default) when the little dot enters the green area, if you have played Dead by Daylight it\'s pretty much easy. After the generator is up and working, you will receive the achievement.',
    characters: [
      { name: 'Alan Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alan_Wake' },
      { name: 'Alice Wake', fandom_url: 'https://alanwake.fandom.com/wiki/Alice_Wake' }
    ],
    points: 25,
    difficulty: 'Easy',
    percentage: 70.5
  },
  {
    id: 3,
    achievement_id: 'float_like_a_butterfly',
    name: 'Float Like a Butterfly',
    description: 'Perform a cinematic dodge',
    image_url: '/images/float_like_a_butterfly.png',
    guide_description: 'Dodge perfectly an taken attack or an object.',
    how_to_complete: 'You need to dodge an attack perfectly one time in the entire game except in the tutorial, lower is the difficulty, bigger is the window, so if you really struggle you can change the difficulty in order to do it.',
    characters: [
      { name: 'Taken', fandom_url: 'https://alanwake.fandom.com/wiki/Taken' },
      { name: 'Poltergeist objects', fandom_url: 'https://alanwake.fandom.com/wiki/Taken#Poltergeist_objects' }
    ],
    points: 25,
    difficulty: 'Easy',
    percentage: 65.1
  },
  {
    id: 4,
    achievement_id: 'nordic_walking',
    name: 'Nordic Walking',
    description: 'Take a walk through the logging area, and meet one of the quirky locals.',
    image_url: '/images/nordic_walking.png',
    guide_description: 'You need to kill Stucky in the Episode 1.',
    how_to_complete: 'In Episode 1, after finding your way out of the lumber yard in Episode One. It is unlocked when you kill Stucky. Stucky is a boss; it\'s not necessary to boost your flashlight on him, privilege on the other taken around, and if you have preserved your flare gun, in normal difficulty or less, he can be one shot. After killing him, the achievement will unlock.',
    characters: [
      { name: 'Stucky', fandom_url: 'https://alanwake.fandom.com/wiki/Stucky' }
    ],
    points: 25,
    difficulty: 'Normal',
    percentage: 57.1
  },
  {
    id: 5,
    achievement_id: 'brights_falls_finest',
    name: 'Bright Falls\' Finest',
    description: 'Call for help',
    image_url: '/images/bright_fall_finest.png',
    guide_description: 'Finish Episode One: Nightmare',
    how_to_complete: 'You earn this achievement when you call the Bright Falls Sheriff Station at the end of Episode One.',
    characters: [
      { name: 'Bright Falls Sheriff Station', fandom_url: 'https://alanwake.fandom.com/wiki/Bright_Falls_Sheriff_Station' }
    ],
    points: 25,
    difficulty: 'Easy',
    percentage: 56.4
  },
  {
    id: 6,
    achievement_id: 'under_a_thin_layer_of_skin',
    name: 'Under a Thin Layer of Skin',
    description: 'Defy the park ranger',
    image_url: '/images/under_skin.png',
    guide_description: 'Kill the Taken Rusty in Episode Two: Taken',
    how_to_complete: 'Rusty is really fast boss, against him you need to boost your flashlight a lot, it will be necessary to dodge and manage yout batteries, once he lost his shroud and speed, he become an easy kill. Just stay in a corner and flash last second to stun him. After killing him, the achievement will unlock.',
    characters: [
      { name: 'Rusty', fandom_url: 'https://alanwake.fandom.com/wiki/Rusty' },
      { name: 'Elderwood National Park', fandom_url: 'https://alanwake.fandom.com/wiki/Elderwood_National_Park' }
    ],
    points: 25,
    difficulty: 'Normal',
    percentage: 49.7
  },
  {
    id: 7,
    achievement_id: 'paging_mr_wake',
    name: 'Paging Mr. Wake',
    description: 'Find 25 manuscript pages',
    image_url: '/images/paging_mr_wake.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Easy',
    percentage: 40.6
  },
  {
    id: 8,
    achievement_id: 'park_ranger',
    name: 'Park Ranger',
    description: 'Enjoy the sounds and sights of Elderwood National Park',
    image_url: '/images/park_ranger.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Easy',
    percentage: 40.2
  },
  {
    id: 9,
    achievement_id: 'back_back_i_say',
    name: 'Back! Back, I say!',
    description: 'Save yourself with a flare',
    image_url: '/images/back_back_i_say.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Easy',
    percentage: 39.5
  },
  {
    id: 10,
    achievement_id: 'finders_keepers',
    name: 'Finders Keepers',
    description: 'Discover 5 hidden chests',
    image_url: '/images/finders_keepers.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Easy',
    percentage: 39.2
  },
  {
    id: 11,
    achievement_id: 'damn_good_cup_of_coffee',
    name: 'Damn Good Cup of Coffee',
    description: 'Discover 25 coffee thermos',
    image_url: '/images/damn_good_cup_of_cofee.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Easy',
    percentage: 35
  },
  {
    id: 12,
    achievement_id: 'sound_and_fury',
    name: 'Sound and Fury',
    description: 'Kill four Taken with a single flashbang',
    image_url: '/images/sound_and_fury.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Medium',
    percentage: 34.4
  },
  {
    id: 13,
    achievement_id: 'theyre_heeeeeere',
    name: 'They\'re Heeeeeere!',
    description: 'Inanimate objects shouldn\'t move of their own accord. Put a stop to the affront, oh, say, 20 times',
    image_url: '/images/they\'re_hereeeeere.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Medium',
    percentage: 33.6
  },
  {
    id: 14,
    achievement_id: 'the_sixgun_scribe',
    name: 'The Six-Gun Scribe',
    description: 'Defeat 100 Taken with the revolver',
    image_url: '/images/the_six_gun_scribe.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Medium',
    percentage: 33.6
  },
  {
    id: 15,
    achievement_id: 'wheels_within_wheels',
    name: 'Wheels Within Wheels',
    description: 'Meet the kidnapper',
    image_url: '/images/wheels_within_wheels.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Easy',
    percentage: 32.5
  },
  {
    id: 16,
    achievement_id: 'missed_by_a_mile',
    name: 'Missed by a Mile',
    description: 'Perform a cinematic dodge 20 times',
    image_url: '/images/missed_by_mile.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Medium',
    percentage: 32.2
  },
  {
    id: 17,
    achievement_id: 'collateral_carnage',
    name: 'Collateral Carnage',
    description: 'Defeat 20 Taken with indirect means',
    image_url: '/images/collateral_carnage.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Medium',
    percentage: 31.3
  },
  {
    id: 18,
    achievement_id: 'two_for_the_price_of_one',
    name: 'Two For the Price of One',
    description: 'Kill two Taken with a single shotgun blast',
    image_url: '/images/two_for_the_price_of_one.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: 'Hard',
    percentage: 30.2
  },
  {
    id: 19,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 20,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 21,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 22,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 23,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 24,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 25,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 26,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 27,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 28,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 29,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 30,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 31,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 32,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 33,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 34,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 35,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 36,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 37,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 38,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 39,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 40,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 41,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 42,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 43,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 44,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 45,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 46,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 47,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 48,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 49,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 50,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 51,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 52,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 53,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 54,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 55,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 56,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 57,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 58,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 59,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 60,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 61,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 62,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 63,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 64,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 65,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 66,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  },
  {
    id: 67,
    achievement_id: '',
    name: '',
    description: '',
    image_url: '/images/achievement-placeholder.png',
    guide_description: '',
    how_to_complete: '',
    characters: [],
    points: 0,
    difficulty: '',
    percentage: 0
  }
];

// API Routes

// Get all achievements
app.get('/api/achievements', (req, res) => {
  res.json(achievements);
});

// Get single achievement by ID
app.get('/api/achievements/:id', (req, res) => {
  const achievement = achievements.find(a => a.achievement_id === req.params.id);
  
  if (!achievement) {
    return res.status(404).json({ error: 'Achievement not found' });
  }
  
  res.json(achievement);
});

// Update achievement
app.put('/api/achievements/:id', (req, res) => {
  const index = achievements.findIndex(a => a.achievement_id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Achievement not found' });
  }
  
  achievements[index] = {
    ...achievements[index],
    ...req.body
  };
  
  res.json(achievements[index]);
});

// Add new achievement
app.post('/api/achievements', (req, res) => {
  const newAchievement = {
    id: achievements.length + 1,
    achievement_id: `achievement_${achievements.length + 1}`,
    ...req.body
  };
  achievements.push(newAchievement);
  res.status(201).json(newAchievement);
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve achievement detail page
app.get('/achievement/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'achievement.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 ${achievements.length} achievement placeholders ready`);
  console.log(`🎮 Open http://localhost:${PORT} in your browser`);
});
