"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHaptic } from "@/hooks/use-haptic";
import { useSound } from "@/hooks/use-sound";

export function HugButton() {
  const [isHugging, setIsHugging] = useState(false);
  const { heavy } = useHaptic();
  const { play: playSound } = useSound("/sounds/heart-pop.mp3", { volume: 0.5 });

  const handleHug = () => {
    setIsHugging(true);
    heavy();
    playSound();

    setTimeout(() => {
      setIsHugging(false);
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-romantic-pink/10">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-romantic mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Need a Hug? 🤗
        </motion.h2>

        <motion.button
          onClick={handleHug}
          className="relative px-12 py-6 bg-gradient-to-r from-romantic-pink to-romantic-purple rounded-full text-white text-2xl font-romantic glow-romantic"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isHugging}
        >
          {isHugging ? "Hugging..." : "Give Me a Hug 💕"}
        </motion.button>

        <AnimatePresence>
          {isHugging && (
            <>
              <motion.div
                className="fixed inset-0 bg-romantic-pink/20 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-9xl mb-4"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    🧸
                  </motion.div>
                  <motion.p
                    className="text-3xl md:text-5xl font-handwritten text-romantic-rose"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    I&apos;m hugging you in my heart right now, Octopuff. 💕
                  </motion.p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

