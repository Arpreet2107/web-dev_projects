"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/use-countdown";

export function FloatingCountdown() {
  const targetDate = process.env.NEXT_PUBLIC_COUNTDOWN_DATE || "2024-12-10T00:00:00";
  const timezone = process.env.NEXT_PUBLIC_COUNTDOWN_TIMEZONE || "Asia/Kolkata";
  const countdown = useCountdown(targetDate, timezone);

  if (countdown.isPast) return null;

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-40 glass rounded-lg px-4 py-2 shadow-lg"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <p className="text-xs text-muted-foreground mb-1">Time Remaining</p>
      <div className="flex items-center gap-2 text-sm font-mono">
        <span className="text-romantic-rose">
          {String(countdown.days).padStart(2, "0")}d
        </span>
        <span>:</span>
        <span className="text-romantic-pink">
          {String(countdown.hours).padStart(2, "0")}h
        </span>
        <span>:</span>
        <span className="text-romantic-purple">
          {String(countdown.minutes).padStart(2, "0")}m
        </span>
        <span>:</span>
        <span className="text-romantic-rose">
          {String(countdown.seconds).padStart(2, "0")}s
        </span>
        <span>:</span>
        <span className="text-xs text-muted-foreground">
          {String(Math.floor(countdown.milliseconds / 10)).padStart(2, "0")}ms
        </span>
      </div>
    </motion.div>
  );
}

