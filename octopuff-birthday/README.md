# 💕 Octopuff Birthday Website

A fully responsive, ultra-premium romantic birthday website for Avani (Octopuff) built with Next.js, featuring cinematic animations, 3D elements, music, and magical interactions.

## ✨ Features

### 🎬 Cinematic Intro
- Swirling stars animation
- Auto-drawing heart outline
- Glowing particles rising
- Letter-by-letter text reveal
- Pulsing "Tap to Enter" button

### ⏰ Real-Time Countdown
- Countdown to December 10 (Asia/Kolkata timezone)
- Displays in hero, navbar, and floating widget
- Millisecond precision
- Auto-triggers fireworks and confetti on zero

### 🎨 Premium Animations
- GSAP scroll animations and timelines
- Parallax layers and floating elements
- Framer Motion transitions
- Three.js 3D floating hearts
- Mouse trail with glitter hearts
- Heartbeat tap effects with haptic feedback
- Continuous, scroll-triggered, and click-triggered animations

### 🎵 Music System
- 3 mood-based tracks (romantic piano, cute lo-fi, Bollywood love)
- Auto Music Mood Switcher based on scroll section
- Play/pause, volume, and mute controls
- Auto-start with user gesture fallback

### 🖼️ Photo Features
- Animated photo slider with 4 modes:
  - 3D Cube
  - Coverflow
  - Card Stack
  - Smooth Crossfade
- Polaroid memory wall with tilt and bounce animations
- 8-10 romantic stock couple photos

### 💫 Interactive Sections
- **Wishing Wall**: Randomly glowing love messages
- **Write Your Wish**: Locally stored wishes displayed in Memories
- **Tarot Cards**: Tap to reveal future predictions (Sagittarius themed)
- **Horoscope Widget**: Daily vibe, lucky color, and sweet messages
- **10 Reasons Why I Love You**: Scroll magic with unique animations
- **3D Hug Button**: Giant teddy arms with warm tint overlay
- **Surprise Modal**: Lottie animation, confetti, photo collage, TTS voice letter, downloadable PDF
- **Gift Opener**: Present shakes → opens → sparkles → PDF floats up

### 🌙 Theme Modes
- **Light Mode**: Pink + purple pastel gradient with glassmorphism
- **Night Mode**: Fireflies mode with floating fireflies, sparkles, and purple sky

### 🔐 Secret Surprise Page
- Password-protected (ENV variable)
- Long love letter
- Future plans and promises
- Virtual ring/gift placeholder
- Fireworks and soft music

### 🎯 Additional Features
- Floating compliments generator
- Mouse-parallax 3D hearts
- Heart-shaped loader intro
- Sound effects for interactions
- Haptic vibration for mobile
- Accessibility (ARIA labels, keyboard nav)
- Reduced motion support
- Performance optimizations for low-end devices
- PWA-ready structure

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd octopuff-birthday
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# Countdown Configuration
NEXT_PUBLIC_COUNTDOWN_DATE=2024-12-10T00:00:00
NEXT_PUBLIC_COUNTDOWN_TIMEZONE=Asia/Kolkata

# Secret Surprise Page Password
NEXT_PUBLIC_SECRET_PASSWORD=octopuff2024

# TTS Provider Configuration (Optional)
NEXT_PUBLIC_TTS_PROVIDER=fallback
NEXT_PUBLIC_ELEVENLABS_API_KEY=
NEXT_PUBLIC_GOOGLE_TTS_API_KEY=
NEXT_PUBLIC_AZURE_TTS_KEY=
NEXT_PUBLIC_AZURE_TTS_REGION=

# Horoscope API (Optional)
NEXT_PUBLIC_HOROSCOPE_API_URL=
NEXT_PUBLIC_HOROSCOPE_API_KEY=
```

4. Add your assets:

   **Music Files** (`/public/music/`):
   - `romantic-piano.mp3`
   - `cute-lofi.mp3`
   - `bollywood-love.mp3`

   **Sound Effects** (`/public/sounds/`):
   - `heart-pop.mp3`
   - `modal-open.mp3`
   - `gift-shake.mp3`
   - `gift-open.mp3`
   - `voice-letter.mp3`

   **Lottie Animations** (`/public/lottie/`):
   - `bear-heart.json` (optional - currently using emoji fallback)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization Guide

### Replacing Music Files

1. Replace the files in `/public/music/`:
   - `romantic-piano.mp3` - Romantic background music
   - `cute-lofi.mp3` - Cute lo-fi track
   - `bollywood-love.mp3` - Bollywood love song

2. Update the file paths in `components/music-provider.tsx` if needed.

### Replacing Photos

1. **Photo Slider**: Update the `PHOTOS` array in `components/photo-slider.tsx`
2. **Polaroid Wall**: Update the `POLAROIDS` array in `components/polaroid-wall.tsx`
3. **Surprise Modal**: Update the image URLs in `components/surprise-modal.tsx`

### Replacing Stickers

Stickers are currently using emoji and SVG. To add custom stickers:
1. Add PNG/SVG files to `/public/stickers/`
2. Update components to reference the new files

### Updating Love Letter Content

1. **Surprise Modal**: Edit `LOVE_LETTER` constant in `components/surprise-modal.tsx`
2. **Secret Page**: Edit the content in `components/secret-surprise-content.tsx`
3. **PDF Generation**: The PDF uses the same content - update as needed

### Changing Countdown Date

Update in `.env.local`:
```env
NEXT_PUBLIC_COUNTDOWN_DATE=2024-12-10T00:00:00
NEXT_PUBLIC_COUNTDOWN_TIMEZONE=Asia/Kolkata
```

### Updating Personal Messages

- **Reasons Section**: Edit `REASONS` array in `components/reasons-section.tsx`
- **Compliments**: Edit `COMPLIMENTS` array in `components/floating-compliments.tsx`
- **Wishing Wall**: Edit `DEFAULT_WISHES` in `components/wishing-wall.tsx`
- **Tarot Cards**: Edit `CARDS` array in `components/tarot-cards.tsx`

## 🚢 Deployment to Vercel

1. Push your code to GitHub

2. Import your repository in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Add Environment Variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`

4. Deploy:
   - Vercel will automatically deploy on push
   - Or click "Deploy" manually

5. Your site will be live at `https://your-project.vercel.app`

## 🧪 Testing Checklist

### Desktop Testing
- [ ] Intro animation plays smoothly
- [ ] Countdown updates in real-time
- [ ] All sections scroll and animate correctly
- [ ] Music plays and switches moods
- [ ] All interactive elements work (buttons, modals, cards)
- [ ] Theme toggle works
- [ ] PDF generation works
- [ ] Secret page password protection works

### Mobile Testing
- [ ] Responsive layout on various screen sizes
- [ ] Touch interactions work
- [ ] Haptic feedback works (where supported)
- [ ] Music autoplay fallback works
- [ ] Animations are smooth
- [ ] Reduced motion is respected

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility
- [ ] Keyboard navigation works
- [ ] ARIA labels are present
- [ ] Screen reader compatibility
- [ ] Color contrast meets WCAG standards
- [ ] Reduced motion preference is respected

## 🐛 Known Limitations

1. **Autoplay Policy**: Browsers block autoplay. Music will start on first user interaction.
2. **Haptic Feedback**: Only works on supported mobile devices.
3. **TTS API**: Requires API keys for production use. Fallback to pre-recorded audio is recommended.
4. **Performance**: Three.js animations are reduced on low-end devices automatically.

## 📦 Build & Production

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D**: Three.js, React Three Fiber
- **Audio**: Howler.js
- **UI Components**: shadcn/ui, Radix UI
- **Other**: canvas-confetti, react-slick, html2canvas, jsPDF

## 📄 License

Private project - All rights reserved.

## 💕 Credits

Built with love for Avani (Octopuff) 💕

---

**Note**: This is a personal project. Replace all placeholder content, images, and music with your own before deploying.

