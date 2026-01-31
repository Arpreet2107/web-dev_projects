"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMPLIMENTS = [
  "You're beautiful",
  "My Octopuff forever",
  "You light up my world",
  "I love you",
  "You're amazing",
  "My heart belongs to you",
  "You're perfect",
  "Forever and always",
];

export function FloatingCompliments() {
  const [currentCompliment, setCurrentCompliment] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCompliment((prev) => (prev + 1) % COMPLIMENTS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-40 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCompliment}
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          className="glass rounded-lg px-4 py-2"
        >
          <p className="text-sm font-handwritten text-romantic-rose">
            {COMPLIMENTS[currentCompliment]} 💕
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

