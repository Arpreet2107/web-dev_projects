"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/use-countdown";
import confetti from "canvas-confetti";
import { useMusic } from "./music-provider";

interface HeroProps {
  isNightMode: boolean;
}

export function Hero({ isNightMode }: HeroProps) {
  const targetDate = process.env.NEXT_PUBLIC_COUNTDOWN_DATE || "2024-12-10T00:00:00";
  const timezone = process.env.NEXT_PUBLIC_COUNTDOWN_TIMEZONE || "Asia/Kolkata";
  const countdown = useCountdown(targetDate, timezone, () => {
    // Countdown reached zero
    handleCountdownComplete();
  });
  const { setMood } = useMusic();
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleCountdownComplete = () => {
    if (hasTriggered) return;
    setHasTriggered(true);

    // Fireworks
    const duration = 5000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFB6E1", "#D8BFD8", "#FF69B4"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFB6E1", "#D8BFD8", "#FF69B4"],
      });
    }, 200);

    // Confetti blast
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 100);

    // Change music mood
    setMood("bollywood");
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isNightMode
          ? "bg-gradient-night text-white"
          : "bg-gradient-romantic text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 text-center z-10">
        <motion.h1
          className="text-6xl md:text-9xl font-romantic mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          className="text-4xl md:text-7xl font-handwritten text-romantic-rose mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Avani (Octopuff) 💕
        </motion.h2>

        {!countdown.isPast ? (
          <motion.div
            className="glass rounded-2xl p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xl md:text-2xl mb-4">Time until your special day:</p>
            <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
              <CountdownBox label="Days" value={countdown.days} />
              <CountdownBox label="Hours" value={countdown.hours} />
              <CountdownBox label="Minutes" value={countdown.minutes} />
              <CountdownBox label="Seconds" value={countdown.seconds} />
              <CountdownBox label="ms" value={Math.floor(countdown.milliseconds / 10)} small />
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="text-4xl md:text-6xl font-romantic"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            🎉 It&apos;s Your Day! 🎉
          </motion.div>
        )}

        <motion.p
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Scroll down to discover all the magic I&apos;ve prepared for you ✨
        </motion.p>
      </div>
    </section>
  );
}

function CountdownBox({
  label,
  value,
  small = false,
}: {
  label: string;
  value: number;
  small?: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div
        className={`glass rounded-xl p-4 md:p-6 mb-2 ${
          small ? "text-2xl md:text-3xl" : "text-4xl md:text-6xl"
        } font-bold text-romantic-rose min-w-[80px] md:min-w-[120px]`}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-sm md:text-base text-muted-foreground">{label}</span>
    </motion.div>
  );
}

