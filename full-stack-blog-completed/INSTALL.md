# 📦 Installation Instructions for Windows

## Step 1: Check Node.js Installation

Open PowerShell in your project folder and run:

```powershell
node --version
npm --version
```

**You need Node.js 18+ and npm 9+**

If not installed:
1. Download from [nodejs.org](https://nodejs.org/)
2. Install the LTS version
3. Restart your terminal

## Step 2: Install Dependencies

Run this command in PowerShell:

```powershell
npm install
```

Wait for installation to complete (may take a few minutes).

## Step 3: Create Environment File

### Option A: Using PowerShell
```powershell
Copy-Item .env.example .env.local
```

### Option B: Manually
1. Open `.env.example` file
2. Copy all content
3. Create new file named `.env.local`
4. Paste content
5. Edit the values (especially countdown date and password)

## Step 4: Edit .env.local

Open `.env.local` and set these values:

```env
# REQUIRED: Birthday date (Dec 10, 2024, midnight IST)
NEXT_PUBLIC_COUNTDOWN_DATE=2024-12-10T00:00:00

# REQUIRED: Password for secret surprise page
NEXT_PUBLIC_SECRET_PASSWORD=octopuff2024
```

## Step 5: Create Asset Folders

The folders are already created, but verify they exist:
- `public/music/` - Add music tracks here
- `public/sounds/` - Add sound effects here
- `public/photos/` - Add photos here (optional)

## Step 6: Run Development Server

```powershell
npm run dev
```

Open your browser and go to: **http://localhost:3000**

## Step 7: Build for Production (Optional)

```powershell
npm run build
npm start
```

## 🎯 Quick Commands Reference

```powershell
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint

# Format code
npm run format
```

## 📁 Where to Add Files

1. **Music**: `public/music/`
   - romantic-piano.mp3
   - lo-fi-cute.mp3
   - bollywood-love.mp3

2. **Sounds**: `public/sounds/`
   - heart-tap.mp3
   - modal-open.mp3
   - gift-open.mp3
   - sticker-pop.mp3

3. **Photos**: Update URLs in components or add to `public/photos/`

## ⚠️ Common Issues on Windows

### Issue: npm command not found
**Solution**: Install Node.js from nodejs.org and restart terminal

### Issue: Permission denied
**Solution**: Run PowerShell as Administrator

### Issue: Port 3000 already in use
**Solution**: 
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: Module not found
**Solution**: 
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

## 🎉 You're Ready!

After running `npm install` and `npm run dev`, your website should be live at:
**http://localhost:3000**

Happy Birthday to Avani! 💕

