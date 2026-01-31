# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_COUNTDOWN_DATE=2024-12-10T00:00:00
NEXT_PUBLIC_COUNTDOWN_TIMEZONE=Asia/Kolkata
NEXT_PUBLIC_SECRET_PASSWORD=octopuff2024
```

### Step 3: Add Assets (Optional for Testing)
The site will work without these, but add them for full experience:

**Music** (`/public/music/`):
- `romantic-piano.mp3`
- `cute-lofi.mp3`
- `bollywood-love.mp3`

**Sounds** (`/public/sounds/`):
- `heart-pop.mp3`
- `modal-open.mp3`
- `gift-shake.mp3`
- `gift-open.mp3`
- `voice-letter.mp3`

### Step 4: Run Development Server
```bash
npm run dev
```

### Step 5: Open Browser
Navigate to `http://localhost:3000`

## 🎯 Key Features to Test

1. **Intro Animation**: Wait for the cinematic intro to complete
2. **Countdown**: Check the real-time countdown in hero and floating widget
3. **Music**: Click play in navbar to start music
4. **Photo Slider**: Try different modes (crossfade, cube, coverflow, card-stack)
5. **Interactive Elements**: 
   - Tap tarot cards to flip
   - Click hug button
   - Open surprise modal
   - Open gift
6. **Theme Toggle**: Switch between light and night mode
7. **Secret Page**: Visit `/secret` and enter password

## 📝 Customization Checklist

- [ ] Replace photos in `components/photo-slider.tsx` and `components/polaroid-wall.tsx`
- [ ] Update love letters in `components/surprise-modal.tsx` and `components/secret-surprise-content.tsx`
- [ ] Customize reasons in `components/reasons-section.tsx`
- [ ] Update compliments in `components/floating-compliments.tsx`
- [ ] Add your music files to `/public/music/`
- [ ] Add sound effects to `/public/sounds/`
- [ ] Update countdown date in `.env.local`
- [ ] Change secret password in `.env.local`

## 🐛 Troubleshooting

**Music not playing?**
- Browsers block autoplay. Click the play button in navbar after first interaction.

**Animations choppy?**
- Check browser console for errors
- Try disabling other browser extensions
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

**Build errors?**
- Run `npm install` again
- Clear `.next` folder and rebuild
- Check Node.js version (18+ required)

## 🎨 Design Customization

All colors and themes are defined in:
- `tailwind.config.ts` - Color palette and animations
- `app/globals.css` - Global styles and gradients
- Individual component files for specific styling

## 📦 Production Build

```bash
npm run build
npm start
```

For Vercel deployment, just push to GitHub and connect to Vercel!

