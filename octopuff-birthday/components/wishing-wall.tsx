"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "./ui/button";

const DEFAULT_WISHES = [
  "You're beautiful",
  "My Octopuff forever",
  "Love you to the moon",
  "You make me happy",
  "My heart belongs to you",
  "Forever and always",
  "You're my sunshine",
  "My everything",
];

export function WishingWall() {
  const [wishes, setWishes] = useLocalStorage<string[]>("wishes", DEFAULT_WISHES);
  const [newWish, setNewWish] = useState("");
  const [glowingIndex, setGlowingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowingIndex(Math.floor(Math.random() * wishes.length));
    }, 2000);
    return () => clearInterval(interval);
  }, [wishes.length]);

  const handleAddWish = () => {
    if (newWish.trim()) {
      setWishes([...wishes, newWish.trim()]);
      setNewWish("");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-romantic-purple/10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-romantic text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Wishing Wall 💫
        </motion.h2>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newWish}
              onChange={(e) => setNewWish(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddWish()}
              placeholder="Write your wish..."
              className="flex-1 px-4 py-3 rounded-lg glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-romantic-rose"
            />
            <Button onClick={handleAddWish} variant="romantic">
              Add Wish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <AnimatePresence>
            {wishes.map((wish, index) => (
              <motion.div
                key={`${wish}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className={`glass rounded-lg p-4 text-center cursor-pointer transition-all ${
                  glowingIndex === index ? "glow-romantic scale-110" : ""
                }`}
                onClick={() => setGlowingIndex(index)}
              >
                <p className="font-handwritten text-lg">{wish}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

