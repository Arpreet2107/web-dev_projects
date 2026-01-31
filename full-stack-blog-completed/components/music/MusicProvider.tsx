"use client";

import { useEffect, useState } from "react";
import { useMusicStore } from "@/store/musicStore";

const TRACKS = [
  {
    id: "romantic-piano",
    name: "Romantic Piano",
    url: "/music/romantic-piano.mp3",
    mood: "romantic" as const,
  },
  {
    id: "lo-fi-cute",
    name: "Cute Lo-Fi",
    url: "/music/lo-fi-cute.mp3",
    mood: "lo-fi" as const,
  },
  {
    id: "bollywood-love",
    name: "Bollywood Love",
    url: "/music/bollywood-love.mp3",
    mood: "bollywood" as const,
  },
];

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const { setTracks, play } = useMusicStore();

  useEffect(() => {
    setTracks(TRACKS);
  }, [setTracks]);

  useEffect(() => {
    if (hasInteracted) {
      // Auto-play on first interaction
      play();
    }
  }, [hasInteracted, play]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  return <>{children}</>;
}

