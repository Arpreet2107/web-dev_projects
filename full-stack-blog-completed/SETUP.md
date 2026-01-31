# 🎉 Setup Guide for Birthday Website

This guide will help you set up and customize the romantic birthday website for Avani (Octopuff).

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- A code editor (VS Code recommended)
- Basic knowledge of React/Next.js (optional but helpful)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Framer Motion
- GSAP
- Three.js
- And many more...

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set:

```env
# REQUIRED: Your birthday date (Dec 10, 2024, midnight IST)
NEXT_PUBLIC_COUNTDOWN_DATE=2024-12-10T00:00:00

# REQUIRED: Password for secret surprise page
NEXT_PUBLIC_SECRET_PASSWORD=octopuff2024

# OPTIONAL: TTS API (for voice letter feature)
NEXT_PUBLIC_TTS_PROVIDER=elevenlabs
NEXT_PUBLIC_TTS_API_KEY=your_key_here

# OPTIONAL: Horoscope API
NEXT_PUBLIC_HOROSCOPE_API_URL=https://api.example.com/horoscope
NEXT_PUBLIC_HOROSCOPE_API_KEY=your_key_here
```

### 3. Add Assets

#### Music Tracks (Required)
Add these files to `public/music/`:
- `romantic-piano.mp3` - Romantic piano music
- `lo-fi-cute.mp3` - Cute lo-fi beats
- `bollywood-love.mp3` - Bollywood romantic song

**Where to find music:**
- Royalty-free: Pixabay, Freesound, Bensound
- YouTube Audio Library (royalty-free)
- Create your own or use favorite songs (ensure you have rights)

#### Sound Effects (Optional but Recommended)
Add these files to `public/sounds/`:
- `heart-tap.mp3` - Soft tap sound
- `modal-open.mp3` - Gentle pop/woosh
- `gift-open.mp3` - Magical sparkle sound
- `sticker-pop.mp3` - Cute pop sound

**Where to find sounds:**
- Freesound.org
- Zapsplat.com (free with account)
- Create simple sounds or use placeholder silence

#### Photos (Required)
Update photo URLs in:
- `components/photos/PhotoSlider.tsx` - Line 13-20
- `components/photos/PolaroidWall.tsx` - Line 11-16

**Options:**
- Use Unsplash photos (free, high quality)
- Upload personal photos to `/public/photos/`
- Use stock photos from Pexels/Pixabay

#### Lottie Animations (Optional)
Add Lottie JSON files to `public/lottie/`:
- Cute bear animation
- Heart animation
- Sparkles animation

**Where to find:**
- LottieFiles.com (free animations)
- Create your own with After Effects + Bodymovin

### 4. Customize Content

#### Update Love Letter
Edit these files:
- `components/modal/SurpriseModal.tsx` - `getLoveLetterText()` function (line ~140)
- `app/secret-surprise/page.tsx` - Long love letter section

#### Update Birthday Date
Change in `.env.local`:
```env
NEXT_PUBLIC_COUNTDOWN_DATE=2024-12-10T00:00:00
```
Format: `YYYY-MM-DDTHH:MM:SS` (24-hour format)

#### Update Personal Details
Search and replace:
- "Avani" → Her actual name
- "Octopuff" → Her nickname
- "Sagittarius" → Her zodiac sign (if different)

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization Guide

### Changing Colors/Themes

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Pink shades
  },
  secondary: {
    // Purple shades
  },
}
```

### Adding New Sections

1. Create component in `components/your-section/`
2. Import in `app/page.tsx`
3. Add to page layout

### Modifying Animations

- **GSAP animations**: Look for `gsap.` in component files
- **Framer Motion**: Look for `<motion.` elements
- **Reduce motion**: Automatically handled via `useReducedMotion` hook

### Custom Fonts

Edit `app/layout.tsx`:
```typescript
import { YourFont } from "next/font/google";
```

Then update `tailwind.config.ts` with font family.

## 🔧 Troubleshooting

### Issue: Music not playing
**Solution**: 
- Check browser autoplay policies
- Verify music files exist in `public/music/`
- Music starts on first user interaction (by design)

### Issue: Animations are choppy
**Solution**:
- Check device performance (low-end devices auto-reduce animations)
- Close other browser tabs
- Try different browser

### Issue: Countdown not accurate
**Solution**:
- Verify timezone is Asia/Kolkata in `hooks/useCountdown.ts`
- Check date format in `.env.local`
- Ensure date is in future (not past)

### Issue: TTS not working
**Solution**:
- Check API keys in `.env.local`
- Verify API quota/limits
- Fallback: use placeholder audio file at `/public/audio/voice-letter-placeholder.mp3`

### Issue: PDF generation fails
**Solution**:
- Ensure `jspdf` package is installed
- Check serverless function timeout (max 30s on Vercel)
- Try generating PDF on smaller text

### Issue: Build errors
**Solution**:
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

## 📱 Testing Checklist

Before deployment, test:

- [ ] Intro animation plays correctly
- [ ] Countdown updates in real-time
- [ ] Theme toggle works (light/dark)
- [ ] Music plays on interaction
- [ ] All sections scroll smoothly
- [ ] Photo slider works in all modes
- [ ] Polaroid wall displays correctly
- [ ] Wishing wall saves wishes
- [ ] Tarot cards flip on click
- [ ] Horoscope displays correctly
- [ ] 10 reasons animate on scroll
- [ ] Hug button animates properly
- [ ] Gift opener shakes and opens
- [ ] Surprise modal appears
- [ ] Voice letter plays (if TTS configured)
- [ ] PDF downloads correctly
- [ ] Secret surprise page password works
- [ ] Mobile responsive on phone
- [ ] Tablets look good
- [ ] Desktop experience is smooth
- [ ] No console errors
- [ ] Accessibility (keyboard navigation)
- [ ] Reduced motion works

## 🚢 Deployment Steps

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variables (same as `.env.local`)
6. Click "Deploy"
7. Done! Your site is live

### Deploy to Other Platforms

**Netlify:**
- Connect GitHub repo
- Build command: `npm run build`
- Publish directory: `.next`
- Add environment variables

**Self-hosted:**
- Run `npm run build`
- Use `npm start` or PM2
- Configure reverse proxy (nginx)
- Set up SSL certificate

## 💡 Tips

1. **Test on real devices**: Mobile experience is different from desktop
2. **Optimize images**: Use WebP format, compress before upload
3. **Check performance**: Use Lighthouse in Chrome DevTools
4. **Monitor errors**: Check browser console and server logs
5. **Backup content**: Save your love letter text separately
6. **Preview before sharing**: Test everything thoroughly
7. **Add analytics** (optional): Google Analytics, Plausible, etc.

## 📞 Need Help?

- Check README.md for detailed documentation
- Review component files for inline comments
- Test in incognito mode to avoid cache issues
- Check browser console for error messages

## 🎉 Final Notes

This website is created with lots of love and attention to detail. Take your time customizing it, make it personal, and most importantly - enjoy the process!

Remember: The best gift is the thought and effort you put into it. ❤️
