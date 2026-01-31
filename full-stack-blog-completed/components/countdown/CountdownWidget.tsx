"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

export function CountdownWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { time, isExpired } = useCountdown();

  if (isExpired) return null;

  return (
    <motion.div
      className="fixed top-20 right-4 z-40 no-print"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass rounded-2xl p-4 mb-2 space-y-2 min-w-[200px]"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">Countdown</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Minimize countdown"
              >
                ×
              </button>
            </div>
            <div className="space-y-1 text-white">
              <div className="flex justify-between text-xs">
                <span>Days</span>
                <span className="font-bold text-lg">{time.days}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Hours</span>
                <span className="font-bold text-lg">{time.hours}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Minutes</span>
                <span className="font-bold text-lg">{time.minutes}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Seconds</span>
                <span className="font-bold text-lg">{time.seconds}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>ms</span>
                <span className="font-bold">{time.milliseconds}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsExpanded(true)}
            className="glass rounded-full p-3 shadow-lg hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Expand countdown"
          >
            <div className="text-white text-xs font-bold text-center">
              <div>{time.days}d</div>
              <div className="text-[10px]">{time.hours}:{time.minutes}</div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

