# 🚀 Quick Start Guide

Follow these steps to get your birthday website up and running!

## Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all required packages (Next.js, React, animations, etc.).

## Step 2: Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   copy .env.example .env.local
   ```
   (On Mac/Linux: `cp .env.example .env.local`)

2. Open `.env.local` and set:
   ```env
   # REQUIRED: Birthday date (Dec 10, 2024, midnight IST)
   NEXT_PUBLIC_COUNTDOWN_DATE=2024-12-10T00:00:00

   # REQUIRED: Password for secret surprise page
   NEXT_PUBLIC_SECRET_PASSWORD=octopuff2024

   # OPTIONAL: TTS API (for voice letter)
   # NEXT_PUBLIC_TTS_PROVIDER=elevenlabs
   # NEXT_PUBLIC_TTS_API_KEY=your_key_here
   ```

## Step 3: Add Required Assets

### Music Tracks (Required)
Add these files to `public/music/` folder:
- `romantic-piano.mp3` - Romantic piano music
- `lo-fi-cute.mp3` - Cute lo-fi beats  
- `bollywood-love.mp3` - Bollywood romantic song

**Where to find free music:**
- YouTube Audio Library (royalty-free)
- Pixabay Music (free)
- Bensound (free with attribution)

### Sound Effects (Optional but Recommended)
Add these files to `public/sounds/` folder:
- `heart-tap.mp3` - Soft tap sound
- `modal-open.mp3` - Gentle pop/woosh
- `gift-open.mp3` - Magical sparkle sound
- `sticker-pop.mp3` - Cute pop sound

**Where to find free sounds:**
- Freesound.org
- Zapsplat.com (free with account)
- Create simple sounds or use silence as placeholder

### Photos (Update URLs)
The website uses stock photos from Unsplash. To use your own photos:

1. **Option A**: Upload photos to `public/photos/` and update URLs in:
   - `components/photos/PhotoSlider.tsx` (line 13-20)
   - `components/photos/PolaroidWall.tsx` (line 11-16)

2. **Option B**: Keep Unsplash URLs (already configured)

## Step 4: Customize Content

### Update Love Letter
Edit `components/modal/SurpriseModal.tsx` - find `getLoveLetterText()` function (around line 140)

### Update Birthday Date
In `.env.local`, change:
```
NEXT_PUBLIC_COUNTDOWN_DATE=2024-12-10T00:00:00
```
Format: `YYYY-MM-DDTHH:MM:SS` (24-hour format)

### Update Personal Details
Search and replace in all files:
- "Avani" → Her actual name
- "Octopuff" → Her nickname
- "Sagittarius" → Her zodiac sign (if different)

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Build for Production

```bash
npm run build
npm start
```

## Step 7: Deploy to Vercel (Optional)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variables (same as `.env.local`)
6. Click "Deploy"
7. Done! Your site is live 🌟

## ⚠️ Important Notes

### If Music Doesn't Play:
- Music starts on first user interaction (by design)
- Make sure music files exist in `public/music/`
- Check browser console for errors

### If You See Errors:
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Testing Checklist:
- [ ] Intro animation plays
- [ ] Countdown shows correct time
- [ ] Theme toggle works (light/dark)
- [ ] Music plays on interaction
- [ ] All sections scroll smoothly
- [ ] Photos display correctly
- [ ] Secret password works
- [ ] Mobile responsive

## 📁 Project Structure

```
birthday-website-avani/
├── app/              # Pages and routes
├── components/       # React components
├── hooks/           # Custom hooks
├── lib/             # Utilities
├── store/           # State management
├── public/          # Static assets
│   ├── music/       # ⬅️ Add music here
│   ├── sounds/      # ⬅️ Add sounds here
│   ├── photos/      # ⬅️ Add photos here
│   └── stickers/    # ⬅️ Add stickers here
├── .env.local       # ⬅️ Configure this file
└── package.json     # Dependencies
```

## 🎯 What to Do First

1. ✅ Run `npm install`
2. ✅ Create `.env.local` from `.env.example`
3. ✅ Add at least one music track to test
4. ✅ Run `npm run dev`
5. ✅ Test the website locally
6. ✅ Add remaining assets
7. ✅ Customize content
8. ✅ Deploy when ready

## 💡 Tips

- Start with just one music track to test
- Use placeholder photos if needed
- Test on mobile device
- Check browser console for errors
- Customize gradually (start simple)

## 🆘 Need Help?

Check these files:
- `README.md` - Full documentation
- `SETUP.md` - Detailed setup guide
- `PROJECT_SUMMARY.md` - Feature overview

## 🎉 You're Ready!

Once you've completed these steps, your romantic birthday website will be ready to share!

Happy Birthday to Avani! 💕

