"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Howl } from "howler";

type MusicMood = "romantic" | "lofi" | "bollywood";

interface MusicContextType {
  currentMood: MusicMood;
  setMood: (mood: MusicMood) => void;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  muted: boolean;
  toggleMute: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const MUSIC_TRACKS: Record<MusicMood, string> = {
  romantic: "/music/romantic-piano.mp3",
  lofi: "/music/cute-lofi.mp3",
  bollywood: "/music/bollywood-love.mp3",
};

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentMood, setCurrentMood] = useState<MusicMood>("romantic");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.unload();
    }

    const sound = new Howl({
      src: [MUSIC_TRACKS[currentMood]],
      volume: muted ? 0 : volume,
      loop: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => setIsPlaying(false),
      onloaderror: () => {
        console.warn(`Failed to load music track: ${MUSIC_TRACKS[currentMood]}`);
      },
    });

    soundRef.current = sound;

    if (hasInteracted && isPlaying) {
      sound.play();
    }

    return () => {
      sound.unload();
    };
  }, [currentMood, hasInteracted]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(muted ? 0 : volume);
    }
  }, [volume, muted]);

  const play = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const pause = () => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const setMood = (mood: MusicMood) => {
    const wasPlaying = isPlaying;
    pause();
    setCurrentMood(mood);
    if (wasPlaying) {
      setTimeout(() => play(), 100);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentMood,
        setMood,
        isPlaying,
        play,
        pause,
        volume,
        setVolume,
        muted,
        toggleMute,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
}

