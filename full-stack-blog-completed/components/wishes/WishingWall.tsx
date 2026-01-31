"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiHeart, FiPlus } from "react-icons/fi";
import confetti from "canvas-confetti";
import { vibrate } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_WISHES = [
  "Happy Birthday Avani! 🎉",
  "Wishing you endless happiness! ✨",
  "May all your dreams come true! 🌟",
  "You're the most amazing person! 💕",
  "Sending you lots of love! ❤️",
  "Hope your day is magical! 🎂",
  "You deserve all the happiness! 💖",
  "Wishing you the best day ever! 🎈",
];

export function WishingWall() {
  const [wishes, setWishes] = useState<string[]>(DEFAULT_WISHES);
  const [newWish, setNewWish] = useState("");
  const [showInput, setShowInput] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Load saved wishes from localStorage
    const savedWishes = localStorage.getItem("birthdayWishes");
    if (savedWishes) {
      try {
        const parsed = JSON.parse(savedWishes);
        setWishes([...DEFAULT_WISHES, ...parsed]);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      const wishItems = sectionRef.current.querySelectorAll(".wish-item");
      
      wishItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "back.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate random glowing
      const glowInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * wishItems.length);
        const randomItem = wishItems[randomIndex] as HTMLElement;
        if (randomItem) {
          gsap.to(randomItem, {
            boxShadow: "0 0 20px rgba(236, 72, 153, 0.8)",
            duration: 1,
            yoyo: true,
            repeat: 1,
          });
        }
      }, 2000);

      return () => clearInterval(glowInterval);
    }
  }, [wishes]);

  const handleAddWish = () => {
    if (newWish.trim()) {
      const updatedWishes = [...wishes, newWish.trim()];
      setWishes(updatedWishes);
      
      // Save to localStorage (excluding defaults)
      const customWishes = updatedWishes.filter(w => !DEFAULT_WISHES.includes(w));
      localStorage.setItem("birthdayWishes", JSON.stringify(customWishes));
      
      setNewWish("");
      setShowInput(false);
      
      // Celebrate!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#a855f7"],
      });
      vibrate(100);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-purple-950 dark:via-pink-950 dark:to-purple-900 opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-romantic text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Wishing Wall
        </motion.h2>

        <motion.p
          className="text-center text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 font-soft"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Leave your wishes for Avani here, and they&apos;ll glow with magic! ✨
        </motion.p>

        {/* Add wish button */}
        <div className="flex justify-center mb-12">
          <motion.button
            onClick={() => setShowInput(!showInput)}
            className="glass rounded-full px-6 py-3 text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add your wish"
          >
            <FiPlus size={20} />
            Write Your Wish
          </motion.button>
        </div>

        {/* Input form */}
        <AnimatePresence>
          {showInput && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-12 glass rounded-2xl p-6"
            >
              <textarea
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                placeholder="Write your birthday wish here..."
                className="w-full bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none min-h-[100px]"
                rows={4}
                aria-label="Wish input"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleAddWish}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-2 px-4 transition-colors font-semibold"
                >
                  Add Wish
                </button>
                <button
                  onClick={() => {
                    setShowInput(false);
                    setNewWish("");
                  }}
                  className="px-4 py-2 text-white/70 hover:text-white transition-colors rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishes.map((wish, index) => (
              <motion.div
                key={`${wish}-${index}`}
                className="wish-item glass rounded-2xl p-6 text-white font-handwritten text-lg relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiHeart className="absolute top-4 right-4 text-pink-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                <p>{wish}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

