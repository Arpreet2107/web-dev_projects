# 💕 Birthday Website for Avani (Octopuff)

A magical, ultra-premium romantic birthday website built with Next.js, featuring cinematic animations, interactive elements, and a beautiful pink-purple gradient aesthetic.

## ✨ Features

### Core Features
- **Disney-level Cinematic Intro** - Swirling stars, auto-drawing heart, glowing particles, letter-by-letter text reveal
- **Real-time Countdown** - Precise countdown to birthday (December 10, Asia/Kolkata timezone) with milliseconds
- **Dual Theme Support** - Light mode with pink-purple gradients & Night mode with fireflies and purple sky
- **Music System** - 3 mood-based tracks (romantic piano, lo-fi, Bollywood) with auto-switcher
- **Interactive Photo Gallery** - Multiple slider modes (cube, coverflow, card-stack, crossfade)
- **Polaroid Memory Wall** - Tilted polaroids with handwritten captions
- **Wishing Wall** - User-generated wishes stored locally
- **Tarot Cards** - Flip-to-reveal cards with promises, future trips, adventures
- **Horoscope Section** - Daily horoscope for Sagittarius with API support
- **10 Reasons Section** - Scroll-triggered animations revealing reasons
- **3D Hug Button** - Interactive teddy bear hug with animations
- **Gift Opener** - Shake animation leading to confetti and PDF download
- **Surprise Modal** - Lottie animations, TTS voice letter, PDF download
- **Secret Surprise Page** - Password-protected private love letter space

### Technical Features
- **Three.js 3D Hearts** - Floating 3D hearts with mouse parallax
- **Particle Systems** - Floating particles and fireflies (night mode)
- **Mouse Trail** - Glitter heart trail following cursor
- **Sound Effects** - Heart taps, modal opens, gift opens, sticker pops
- **Responsive Design** - Fully responsive for mobile and desktop
- **Accessibility** - ARIA labels, keyboard navigation, reduced motion support
- **Performance Optimization** - Device performance detection, reduced animations for low-end devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd birthday-website-avani
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:
- `NEXT_PUBLIC_COUNTDOWN_DATE` - Target birthday date (default: 2024-12-10T00:00:00)
- `NEXT_PUBLIC_SECRET_PASSWORD` - Password for secret surprise page
- TTS API keys (optional) - For voice letter feature
- Horoscope API keys (optional) - For daily horoscope

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Main homepage
│   ├── secret-surprise/   # Password-protected page
│   ├── api/               # API routes (TTS, PDF)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── intro/            # Intro animation
│   ├── hero/             # Hero section with countdown
│   ├── photos/           # Photo slider & polaroid wall
│   ├── wishes/           # Wishing wall
│   ├── tarot/            # Tarot cards
│   ├── horoscope/        # Horoscope section
│   ├── reasons/          # 10 reasons section
│   ├── interactive/      # Hug button, gift opener, etc.
│   ├── modal/            # Surprise modal
│   ├── music/            # Music controls & provider
│   ├── countdown/        # Countdown widget
│   ├── layout/           # Navbar, etc.
│   ├── particles/        # Particles & fireflies
│   └── threejs/          # Three.js 3D hearts
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & helpers
├── store/                # Zustand state management
└── public/               # Static assets
    ├── music/           # Music tracks (add your own)
    ├── sounds/          # Sound effects
    ├── stickers/        # Sticker images
    └── lottie/          # Lottie animation JSON files
```

## 🎨 Customization Guide

### Replacing Music Tracks

1. Add your music files to `public/music/`:
   - `romantic-piano.mp3` - Romantic piano track
   - `lo-fi-cute.mp3` - Cute lo-fi track
   - `bollywood-love.mp3` - Bollywood love song

2. Update track metadata in `components/music/MusicProvider.tsx` if needed.

### Replacing Photos

1. Update photo URLs in:
   - `components/photos/PhotoSlider.tsx` - `STOCK_PHOTOS` array
   - `components/photos/PolaroidWall.tsx` - `POLAROID_PHOTOS` array

2. For personal photos, upload to `/public/photos/` and reference as `/photos/your-photo.jpg`.

### Customizing Lottie Animations

1. Create or download Lottie animations from [LottieFiles](https://lottiefiles.com/).
2. Save JSON files to `public/lottie/`.
3. Import and use in components (e.g., `components/modal/SurpriseModal.tsx`).

### Updating Love Letter Text

Edit the love letter text in:
- `components/modal/SurpriseModal.tsx` - `getLoveLetterText()` function
- `app/secret-surprise/page.tsx` - Long love letter section

### Changing Birthday Date

Update `NEXT_PUBLIC_COUNTDOWN_DATE` in `.env.local`:
```
NEXT_PUBLIC_COUNTDOWN_DATE=2024-12-10T00:00:00
```

### Configuring TTS (Text-to-Speech)

1. Choose a provider (ElevenLabs, Google Cloud, or Azure).
2. Add API key to `.env.local`:
   ```
   NEXT_PUBLIC_TTS_PROVIDER=elevenlabs
   NEXT_PUBLIC_TTS_API_KEY=your_api_key_here
   ```

3. For Azure, also add:
   ```
   AZURE_REGION=eastus
   ```

### Adding Sound Effects

1. Add sound files to `public/sounds/`:
   - `heart-tap.mp3`
   - `modal-open.mp3`
   - `gift-open.mp3`
   - `sticker-pop.mp3`

2. Files are automatically loaded (or gracefully fail if missing).

### Customizing Stickers

1. Add sticker images to `public/stickers/` (PNG/SVG).
2. Reference in components using `/stickers/your-sticker.png`.

## 🚢 Deployment to Vercel

1. Push your code to GitHub/GitLab/Bitbucket.

2. Import project in [Vercel](https://vercel.com):
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. Add environment variables:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`

4. Deploy:
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Build Checklist

Before deploying, ensure:
- [ ] All environment variables are set
- [ ] Music tracks are uploaded to `public/music/`
- [ ] Photos are replaced with your own
- [ ] Lottie animations are configured
- [ ] Love letter text is customized
- [ ] Birthday date is correct
- [ ] Secret password is set
- [ ] TTS API keys are configured (if using)
- [ ] Test on mobile and desktop
- [ ] Check accessibility (keyboard navigation, screen readers)
- [ ] Verify all animations work smoothly

## 🔧 Troubleshooting

### Music not playing
- Check browser autoplay policies (requires user interaction)
- Verify music files exist in `public/music/`
- Check browser console for errors

### Animations are choppy
- Check device performance (low-end devices use reduced animations)
- Disable other browser extensions
- Try a different browser

### Countdown not working
- Verify timezone (Asia/Kolkata) in `hooks/useCountdown.ts`
- Check date format in `.env.local`

### TTS not working
- Verify API keys are set correctly
- Check API quota/limits
- Fallback: use placeholder audio file

### PDF generation fails
- Ensure `jspdf` is installed
- Check serverless function timeout (max 30s on Vercel)

## 📱 Browser Support

- Chrome/Edge (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅
- Mobile browsers ✅

### Known Limitations

- **Autoplay**: Most browsers block autoplay. Music starts on first user interaction.
- **Haptics**: Only supported on mobile devices with vibration API.
- **Three.js**: May not work on very old browsers (fallback provided).

## 🎯 Performance

- **Lighthouse Score**: Aim for 90+ on all metrics
- **Performance Mode**: Automatically reduces animations on low-end devices
- **Image Optimization**: Use Next.js Image component for photos
- **Code Splitting**: Automatic with Next.js dynamic imports

## 🔐 Privacy

- No analytics by default (privacy-first approach)
- All wishes stored locally (localStorage)
- No tracking or third-party scripts
- TTS/PDF generation happens server-side

## 📄 License

This project is created with ❤️ for Avani. Feel free to customize and use for your own special someone!

## 🙏 Credits

- **Fonts**: Google Fonts (Dancing Script, Kalam, Comfortaa)
- **Icons**: React Icons, Lucide Icons
- **Animations**: Framer Motion, GSAP, Lottie
- **3D**: Three.js
- **Audio**: Howler.js
- **UI**: Tailwind CSS, shadcn/ui

---

Made with love for Avani (Octopuff) 💕
