# Quick Start - Deploy to Your Scalingo App

## Fast Track Deployment 🚀

### 1️⃣ Add PostgreSQL (One-time setup)
```bash
scalingo --app apps-project addons-add postgresql postgresql-sandbox
```

### 2️⃣ Copy Files to Your GitHub Repo
Copy everything from the `alan-wake-guide` folder to your `apps-project-yboost` repository.

### 3️⃣ Push to GitHub
```bash
cd /path/to/apps-project-yboost
git add .
git commit -m "Add Alan Wake Achievement Guide"
git push origin main
```

### 4️⃣ Deploy via Scalingo Dashboard
1. Go to https://dashboard.scalingo.com/apps/apps-project
2. Click "Deploy" tab
3. Link your GitHub repo: **apps-project-yboost**
4. Enable "Auto-deploy"
5. Click "Deploy now"

### 5️⃣ Done! 
Visit: **https://apps-project.osc-fr1.scalingo.io**

---

## Alternative: Deploy via Git Remote

```bash
# Add Scalingo remote (one-time)
git remote add scalingo git@ssh.osc-fr1.scalingo.com:apps-project.git

# Deploy
git push scalingo main
```

---

## Check Status
```bash
# View logs
scalingo --app apps-project logs

# Open app
scalingo --app apps-project open
```

---

**See DEPLOYMENT.md for detailed instructions and troubleshooting.**
