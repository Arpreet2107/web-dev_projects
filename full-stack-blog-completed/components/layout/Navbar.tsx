"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiHeart } from "react-icons/fi";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onCountdownReached: () => void;
}

export function Navbar({ onCountdownReached }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { time, isExpired } = useCountdown(onCountdownReached);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiHeart className="text-pink-500 text-2xl" />
            <span className="font-romantic text-xl md:text-2xl text-white">
              Avani ❤️
            </span>
          </motion.div>

          {/* Countdown - compact */}
          {!isExpired && (
            <div className="hidden md:flex items-center gap-2 text-white text-sm">
              <span className="font-semibold">{time.days}d</span>
              <span>:</span>
              <span className="font-semibold">{time.hours}h</span>
              <span>:</span>
              <span className="font-semibold">{time.minutes}m</span>
            </div>
          )}

          {/* Theme toggle */}
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="glass rounded-full p-2 text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

