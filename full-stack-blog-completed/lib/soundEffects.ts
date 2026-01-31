import { Howl } from "howler";

// Sound effects configuration
const SOUNDS = {
  heartTap: {
    src: ["/sounds/heart-tap.mp3"],
    volume: 0.3,
  },
  modalOpen: {
    src: ["/sounds/modal-open.mp3"],
    volume: 0.4,
  },
  giftOpen: {
    src: ["/sounds/gift-open.mp3"],
    volume: 0.5,
  },
  stickerPop: {
    src: ["/sounds/sticker-pop.mp3"],
    volume: 0.3,
  },
};

const soundInstances: Record<string, Howl> = {};

export function playSound(soundName: keyof typeof SOUNDS) {
  // Check if sound already loaded
  if (!soundInstances[soundName]) {
    const config = SOUNDS[soundName];
    soundInstances[soundName] = new Howl({
      src: config.src,
      volume: config.volume,
      html5: true,
    });
  }

  // Play sound (with fallback if file doesn't exist)
  try {
    soundInstances[soundName].play();
  } catch (error) {
    // Silently fail if sound file doesn't exist
    console.log(`Sound ${soundName} not available`);
  }
}

export function preloadSounds() {
  Object.keys(SOUNDS).forEach((key) => {
    const config = SOUNDS[key as keyof typeof SOUNDS];
    soundInstances[key] = new Howl({
      src: config.src,
      volume: config.volume,
      html5: true,
      preload: true,
    });
  });
}

