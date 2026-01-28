# Deployment Guide for apps-project on Scalingo

## Your Setup
- **Scalingo App**: apps-project
- **GitHub Repository**: apps-project-yboost
- **Project**: Alan Wake Achievement Guide

## Step-by-Step Deployment

### Step 1: Add Files to Your GitHub Repository

1. Copy all the files from the `alan-wake-guide` folder to your `apps-project-yboost` repository:

```bash
# Navigate to your local repository
cd /path/to/apps-project-yboost

# Copy all project files (adjust the source path as needed)
cp -r /path/to/alan-wake-guide/* .

# Check what was copied
ls -la
```

You should now have these files in your repository:
```
apps-project-yboost/
├── server.js
├── package.json
├── Procfile
├── scalingo.json
├── .gitignore
├── .env.example
├── README.md
└── public/
    ├── index.html
    ├── achievement.html
    ├── css/
    │   └── style.css
    └── js/
        ├── main.js
        └── achievement.js
```

### Step 2: Add PostgreSQL to Your Scalingo App

```bash
# Login to Scalingo
scalingo login

# Add PostgreSQL addon to your existing app
scalingo --app apps-project addons-add postgresql postgresql-sandbox

# Verify the addon was added
scalingo --app apps-project addons
```

### Step 3: Link Your Scalingo App to GitHub

**Option A: Using Scalingo Dashboard (Recommended)**
1. Go to https://dashboard.scalingo.com
2. Select your app "apps-project"
3. Go to "Deploy" tab
4. Click "Link with GitHub"
5. Select your repository "apps-project-yboost"
6. Choose the branch to deploy (usually "main" or "master")
7. Enable "Auto-deploy" if you want automatic deployments on push

**Option B: Using Git Remote**
```bash
# In your repository directory
cd apps-project-yboost

# Add Scalingo as a remote (if not already added)
git remote add scalingo git@ssh.osc-fr1.scalingo.com:apps-project.git

# Verify remotes
git remote -v
```

### Step 4: Commit and Push Your Code

```bash
# In your repository directory
cd apps-project-yboost

# Add all files
git add .

# Commit
git commit -m "Add Alan Wake Achievement Guide application"

# Push to GitHub
git push origin main

# If using Option B (Git remote), also push to Scalingo
git push scalingo main
```

### Step 5: Verify Deployment

```bash
# Check deployment status
scalingo --app apps-project deployments

# View logs
scalingo --app apps-project logs --lines 50

# Open your app
scalingo --app apps-project open
```

Your app will be available at: **https://apps-project.osc-fr1.scalingo.io**

### Step 6: Check Database Initialization

The database will automatically create the table and insert sample achievements on first run.

To verify:
```bash
# Access PostgreSQL console
scalingo --app apps-project pgsql-console

# Check if table exists
\dt

# View achievements
SELECT name, achievement_id FROM achievements;

# Exit
\q
```

## Environment Variables

Scalingo automatically sets these for you:
- `SCALINGO_POSTGRESQL_URL` - Database connection (set by PostgreSQL addon)
- `PORT` - Application port (set by Scalingo)

No additional configuration needed!

## Troubleshooting

### If deployment fails:

1. **Check logs**:
```bash
scalingo --app apps-project logs --lines 100
```

2. **Verify Node.js version**:
Make sure your `package.json` has:
```json
"engines": {
  "node": ">=18.x"
}
```

3. **Check PostgreSQL addon**:
```bash
scalingo --app apps-project addons
```

4. **Restart the app**:
```bash
scalingo --app apps-project restart
```

### If database doesn't initialize:

```bash
# Access database console
scalingo --app apps-project pgsql-console

# Manually create table (copy from server.js)
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
```

## Updating Your App

When you make changes:

```bash
# Make your changes to files
# ...

# Commit and push
git add .
git commit -m "Your update message"
git push origin main

# If auto-deploy is enabled, it will deploy automatically
# Otherwise, push to Scalingo:
git push scalingo main
```

## Testing Locally Before Deployment

1. Create a `.env` file:
```bash
cp .env.example .env
```

2. Edit `.env` with local PostgreSQL credentials:
```
DATABASE_URL=postgresql://username:password@localhost:5432/alan_wake_db
PORT=3000
NODE_ENV=development
```

3. Install dependencies and run:
```bash
npm install
npm start
```

4. Visit: http://localhost:3000

## Useful Commands

```bash
# View app info
scalingo --app apps-project info

# View environment variables
scalingo --app apps-project env

# Scale your app
scalingo --app apps-project scale web:1:S

# View database info
scalingo --app apps-project --addon postgresql info
```

## Need Help?

- Scalingo Documentation: https://doc.scalingo.com
- Check logs: `scalingo --app apps-project logs`
- Your app URL: https://apps-project.osc-fr1.scalingo.io

---

**Quick Summary:**
1. Copy files to your repo
2. Add PostgreSQL addon: `scalingo --app apps-project addons-add postgresql postgresql-sandbox`
3. Link GitHub repo in Scalingo dashboard OR add git remote
4. Push code: `git push origin main`
5. Check: `scalingo --app apps-project open`
