# Alan Wake Achievement Guide

A comprehensive web application for tracking and learning how to complete achievements in Alan Wake. Built with Node.js, Express, and PostgreSQL.

## Features

- **Achievement List**: Browse all Alan Wake achievements with images and descriptions
- **Detailed Guides**: Click on any achievement to see comprehensive completion guides
- **Character Links**: Direct links to Alan Wake Fandom wiki for related characters
- **RESTful API**: Full CRUD API for managing achievements
- **PostgreSQL Database**: Persistent storage for all achievement data
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure

```
alan-wake-guide/
├── server.js              # Express server and API routes
├── package.json           # Dependencies and scripts
├── Procfile              # Scalingo deployment configuration
├── scalingo.json         # Scalingo app configuration
├── .env.example          # Environment variables template
├── public/               # Static files
│   ├── index.html        # Main achievements list page
│   ├── achievement.html  # Achievement detail page
│   ├── css/
│   │   └── style.css     # Styles
│   └── js/
│       ├── main.js       # Main page JavaScript
│       └── achievement.js # Detail page JavaScript
└── README.md             # This file
```

## Database Schema

The application uses a PostgreSQL database with the following schema:

```sql
CREATE TABLE achievements (
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
```

## API Endpoints

- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/:id` - Get a specific achievement
- `POST /api/achievements` - Create a new achievement
- `PUT /api/achievements/:id` - Update an achievement

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd alan-wake-guide
```

2. Install dependencies:
```bash
npm install
```

3. Set up your local database:
```bash
# Create a PostgreSQL database
createdb alan_wake_db
```

4. Create a `.env` file:
```bash
cp .env.example .env
```

5. Edit `.env` and add your database credentials:
```
DATABASE_URL=postgresql://username:password@localhost:5432/alan_wake_db
PORT=3000
NODE_ENV=development
```

6. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

For development with auto-reload:
```bash
npm run dev
```

## Deploying to Scalingo

### Step 1: Create a Scalingo Account
1. Go to [scalingo.com](https://scalingo.com)
2. Sign up for a free account

### Step 2: Install Scalingo CLI
```bash
# On macOS
brew install scalingo

# On Linux
curl -O https://cli-dl.scalingo.com/install && bash install

# On Windows
# Download from https://cli.scalingo.com/
```

### Step 3: Login to Scalingo
```bash
scalingo login
```

### Step 4: Create Your App
```bash
# Create a new app (replace 'my-alan-wake-guide' with your preferred name)
scalingo create my-alan-wake-guide
```

### Step 5: Add PostgreSQL Database
```bash
# Add PostgreSQL addon
scalingo --app my-alan-wake-guide addons-add postgresql postgresql-sandbox
```

### Step 6: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 7: Deploy to Scalingo
```bash
# Add Scalingo remote
git remote add scalingo git@ssh.osc-fr1.scalingo.com:my-alan-wake-guide.git

# Deploy
git push scalingo main
```

### Step 8: Check Your App
```bash
# Open your app in browser
scalingo --app my-alan-wake-guide open

# Check logs
scalingo --app my-alan-wake-guide logs
```

## Environment Variables on Scalingo

Scalingo automatically sets these variables:
- `SCALINGO_POSTGRESQL_URL` - Database connection string
- `PORT` - Server port

No additional configuration needed!

## Customizing Your App

### Adding New Achievements

You can add achievements through the API:

```bash
curl -X POST https://your-app.scalingo.io/api/achievements \
  -H "Content-Type: application/json" \
  -d '{
    "achievement_id": "new_achievement",
    "name": "New Achievement",
    "description": "Achievement description",
    "image_url": "https://example.com/image.png",
    "guide_description": "Detailed guide description",
    "how_to_complete": "Steps to complete",
    "characters": [
      {"name": "Character Name", "fandom_url": "https://alanwake.fandom.com/wiki/Character"}
    ],
    "points": 25
  }'
```

### Updating the Design

Edit `/public/css/style.css` to customize colors, fonts, and layout.

### Modifying Sample Data

Edit the `insertSampleData()` function in `server.js` to change the pre-loaded achievements.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Deployment**: Scalingo

## API Integration

The app is designed to work with external APIs. You can integrate with:
- Steam API for real-time achievement data
- RAWG API for game information
- Custom gaming APIs

To add API integration, modify the server.js file and add your API calls in the appropriate routes.

## Troubleshooting

### Database Connection Issues
```bash
# Check database status
scalingo --app my-alan-wake-guide addons

# Access database console
scalingo --app my-alan-wake-guide pgsql-console
```

### View Logs
```bash
scalingo --app my-alan-wake-guide logs --lines 100
```

### Restart App
```bash
scalingo --app my-alan-wake-guide restart
```

## Support

For issues or questions:
- Check Scalingo documentation: https://doc.scalingo.com
- Review the application logs
- Ensure all environment variables are set correctly

## License

This is a student project for educational purposes.

---

**Note**: This is a fan-made guide and is not officially affiliated with Remedy Entertainment or the Alan Wake franchise.
