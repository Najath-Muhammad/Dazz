# Production Deployment & Git Workflow Guide

This document explains how the feature branch `feat/google-translation` was merged into `main` and provides complete instructions for deploying both the Express Backend and Next.js Frontend to production.

---

## 1. Branch Merging Instructions (How `feat/google-translation` was merged to `main`)

If you ever need to merge feature branches into `main` in the future, follow these exact terminal steps:

### Step 1: Switch to `main` branch
```bash
git checkout main
```

### Step 2: Ensure `main` is up to date with remote
```bash
git pull origin main
```

### Step 3: Merge the feature branch
Use `--no-ff` (no fast-forward) to preserve the merge commit context:
```bash
git merge feat/google-translation --no-ff -m "Merge branch 'feat/google-translation' into main"
```

### Step 4: Push `main` to GitHub
```bash
git push origin main
```

---

## 2. Production Deployment Guide

### A. Deploying Backend to **Render**

1. Log into your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Select your GitHub repository (`Najath-Muhammad/Dazz`).
4. Configure the service with the following values:
   - **Name**: `dazz-backend`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add Environment Variables under **Advanced**:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGODB_URI` = *your_mongodb_atlas_uri*
   - `JWT_SECRET` = *your_jwt_secret_key*
   - `CLOUDINARY_CLOUD_NAME` = *your_cloud_name*
   - `CLOUDINARY_API_KEY` = *your_api_key*
   - `CLOUDINARY_API_SECRET` = *your_api_secret*
6. Click **Create Web Service**.
7. Copy your backend URL once live (e.g. `https://dazz-backend.onrender.com`).

---

### B. Deploying Frontend to **Vercel**

1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository (`Najath-Muhammad/Dazz`).
4. In the project setup form:
   - Select **Framework Preset**: `Next.js`
   - Set **Root Directory** to `frontend`
5. Expand **Environment Variables** and add:
   - `NEXT_PUBLIC_API_URL` = `https://dazz-backend.onrender.com/api` (Replace with your actual Render backend URL + `/api`)
6. Click **Deploy**.

---

## 3. Post-Deployment Verification

1. Test Backend Health: `https://dazz-backend.onrender.com/health` -> should return `{"status":"ok","message":"Backend is running"}`.
2. Default Admin Credentials created on first run:
   - **Email**: `admin@dazztradlink.com`
   - **Password**: `password123`
3. Test Frontend: Open your Vercel URL, navigate to `/admin/login`, and sign in to verify full database connectivity.
