"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Music, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "next-themes";
import { useMusic } from "./music-provider";
import { useCountdown } from "@/hooks/use-countdown";
import { Button } from "./ui/button";

interface NavbarProps {
  isNightMode: boolean;
  setIsNightMode: (value: boolean) => void;
}

export function Navbar({ isNightMode, setIsNightMode }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { isPlaying, play, pause, muted, toggleMute, volume, setVolume } = useMusic();
  const [showMusicControls, setShowMusicControls] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const targetDate = process.env.NEXT_PUBLIC_COUNTDOWN_DATE || "2024-12-10T00:00:00";
  const timezone = process.env.NEXT_PUBLIC_COUNTDOWN_TIMEZONE || "Asia/Kolkata";
  const countdown = useCountdown(targetDate, timezone);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = isNightMode ? "light" : "dark";
    setTheme(newTheme);
    setIsNightMode(!isNightMode);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-dark py-2" : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div
          className="text-2xl font-romantic text-romantic-rose"
          whileHover={{ scale: 1.05 }}
        >
          💕 Octopuff
        </motion.div>

        <div className="flex items-center gap-4">
          {/* Countdown */}
          {!countdown.isPast && (
            <motion.div
              className="hidden md:flex items-center gap-2 text-sm glass px-4 py-2 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-romantic-pink">
                {countdown.days}d {countdown.hours}h {countdown.minutes}m
              </span>
            </motion.div>
          )}

          {/* Music Controls */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMusicControls(!showMusicControls)}
              aria-label="Music controls"
            >
              <Music className="h-5 w-5" />
            </Button>

            {showMusicControls && (
              <motion.div
                className="absolute right-0 top-12 glass rounded-lg p-4 space-y-2 min-w-[200px]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => (isPlaying ? pause() : play())}
                  >
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleMute}>
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </motion.div>
            )}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isNightMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

