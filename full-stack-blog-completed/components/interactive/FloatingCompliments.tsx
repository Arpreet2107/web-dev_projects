"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const COMPLIMENTS = [
  "You're beautiful ❤️",
  "My Octopuff forever 💕",
  "You light up my world ✨",
  "I love your smile 😊",
  "You're amazing 🌟",
  "Perfect just the way you are 💖",
  "My heart belongs to you 💝",
  "You're my everything 🦋",
];

export function FloatingCompliments() {
  const [compliments, setCompliments] = useState<Array<{ id: number; text: string; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const idCounterRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current && Math.random() > 0.7) {
        const randomCompliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const id = idCounterRef.current++;

        setCompliments((prev) => [...prev, { id, text: randomCompliment, x, y }]);

        // Remove after animation
        setTimeout(() => {
          setCompliments((prev) => prev.filter((c) => c.id !== id));
        }, 5000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {compliments.map((compliment) => (
          <motion.div
            key={compliment.id}
            className="absolute glass rounded-full px-4 py-2 text-white text-sm font-handwritten whitespace-nowrap"
            style={{
              left: `${compliment.x}%`,
              top: `${compliment.y}%`,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: -100, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 5,
              ease: "easeOut",
            }}
          >
            {compliment.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

