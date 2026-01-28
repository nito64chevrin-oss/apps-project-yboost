# How to Run Your Alan Wake Guide Locally

## The Problem
You're seeing "Loading achievements..." because the Node.js server isn't running yet. The website needs the backend server to fetch achievement data from the database.

## Quick Fix - Start the Server

### Step 1: Open Terminal in VS Code
- Click on **Terminal** → **New Terminal** (or press Ctrl+` or Cmd+`)

### Step 2: Navigate to Project Directory
```bash
cd alan-wake-guide
```

### Step 3: Install Dependencies (First Time Only)
```bash
npm install
```
This will download all required packages (Express, PostgreSQL, etc.)

### Step 4: Start the Server
```bash
npm start
```

You should see:
```
Database table initialized
Sample achievements inserted
Server running on port 3000
```

### Step 5: Open Your Browser
Go to: **http://localhost:3000**

Now you should see all the achievements! 🎉

---

## If You See Database Errors

The app uses PostgreSQL. For local testing without setting up PostgreSQL, you have two options:

### Option A: Use SQLite Instead (Easier for Testing)

I can modify the app to use SQLite which doesn't require installation. Let me know if you want this!

### Option B: Install PostgreSQL

**On Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set

**On Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**On Linux:**
```bash
sudo apt-get install postgresql
sudo service postgresql start
```

Then create the database:
```bash
createdb alan_wake_db
```

---

## For Scalingo Deployment (Production)

When you push to Scalingo, you don't need to worry about any of this! Scalingo will:
1. Automatically install dependencies
2. Set up PostgreSQL database
3. Start the server
4. Initialize the database with sample data

Just follow the QUICKSTART.md guide to deploy.

---

## Common Issues

### "npm: command not found"
You need to install Node.js:
- Download from https://nodejs.org
- Install the LTS version
- Restart VS Code

### "Port 3000 is already in use"
Another app is using port 3000. Either:
- Stop that app
- Or change the port in server.js (line with `const PORT = process.env.PORT || 3000`)

### Still seeing "Loading achievements..."
1. Check the browser console (F12 → Console tab)
2. Make sure server is running (check terminal)
3. Try refreshing the page (Ctrl+R or Cmd+R)

---

## Quick Commands Reference

```bash
# Install dependencies (first time only)
npm install

# Start the server
npm start

# Start with auto-reload on changes
npm run dev
```

---

**Need help?** Check the error messages in:
- VS Code Terminal (where you ran `npm start`)
- Browser Console (press F12)
