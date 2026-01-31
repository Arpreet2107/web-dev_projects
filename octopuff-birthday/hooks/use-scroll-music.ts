"use client";

import { useEffect } from "react";
import { useMusic } from "@/components/music-provider";

export function useScrollMusic() {
  const { setMood } = useMusic();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollPosition / windowHeight);

      // Change music based on scroll section
      if (section === 0) {
        setMood("romantic");
      } else if (section >= 1 && section <= 3) {
        setMood("lofi");
      } else {
        setMood("bollywood");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setMood]);
}

