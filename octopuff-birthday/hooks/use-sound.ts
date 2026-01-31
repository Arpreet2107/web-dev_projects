import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

export function useSound(src: string, options?: { volume?: number; loop?: boolean }) {
  const [sound, setSound] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const howl = new Howl({
      src: [src],
      volume: options?.volume ?? 1,
      loop: options?.loop ?? false,
      onload: () => setIsLoaded(true),
      onplay: () => setIsPlaying(true),
      onend: () => setIsPlaying(false),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });

    setSound(howl);

    return () => {
      howl.unload();
    };
  }, [src, options?.volume, options?.loop]);

  const play = () => {
    if (sound && isLoaded) {
      sound.play();
    }
  };

  const pause = () => {
    if (sound) {
      sound.pause();
    }
  };

  const stop = () => {
    if (sound) {
      sound.stop();
    }
  };

  const setVolume = (volume: number) => {
    if (sound) {
      sound.volume(volume);
    }
  };

  return { play, pause, stop, setVolume, isPlaying, isLoaded };
}

