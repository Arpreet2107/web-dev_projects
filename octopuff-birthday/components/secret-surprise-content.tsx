"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useMusic } from "./music-provider";
import Link from "next/link";

export function SecretSurpriseContent() {
  const { setMood, play } = useMusic();

  useEffect(() => {
    setMood("romantic");
    play();

    // Fireworks
    const duration = 10000;
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
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 200);

    return () => clearInterval(interval);
  }, [setMood, play]);

  return (
    <div className="min-h-screen bg-gradient-night text-white p-8">
      <div className="container mx-auto max-w-4xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-romantic mb-4">
            Secret Surprise 💎
          </h1>
          <p className="text-xl text-muted-foreground">
            A private space just for you, Avani
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 space-y-4"
        >
          <h2 className="text-3xl font-romantic mb-4">My Love Letter to You</h2>
          <div className="font-handwritten text-lg space-y-4 whitespace-pre-line">
            <p>
              My dearest Avani, my Octopuff,
            </p>
            <p>
              This is our secret space, a place where I can tell you everything that&apos;s in my heart without holding back.
            </p>
            <p>
              You are the most incredible person I&apos;ve ever met. Your smile, your laugh, your way of seeing the world - everything about you captivates me completely.
            </p>
            <p>
              I promise to love you through every season, to support your dreams, to be your partner in every adventure, and to make you smile every single day.
            </p>
            <p>
              Forever yours,
              <br />
              Your Secret Admirer 💕
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-3xl font-romantic mb-4">Our Future Plans</h2>
          <ul className="space-y-3 font-handwritten text-lg">
            <li>✨ Travel to the mountains together</li>
            <li>✨ Watch sunsets on the beach</li>
            <li>✨ Try new restaurants and cuisines</li>
            <li>✨ Create a million more memories</li>
            <li>✨ Build our dreams together</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <div className="text-6xl mb-4">💍</div>
          <p className="text-xl font-handwritten">
            A symbol of my commitment to you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-romantic-rose rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

