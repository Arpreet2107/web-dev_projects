"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useMusicStore } from "@/store/musicStore";
import { SurpriseModal } from "@/components/modal/SurpriseModal";

const SECRET_PASSWORD = process.env.NEXT_PUBLIC_SECRET_PASSWORD || "octopuff2024";

export default function SecretSurprisePage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { playTrack } = useMusicStore();

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem("secretAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      // Play romantic music
      playTrack(0);
    }
  }, [playTrack]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.toLowerCase().trim() === SECRET_PASSWORD.toLowerCase()) {
      setIsAuthenticated(true);
      sessionStorage.setItem("secretAuthenticated", "true");
      
      // Celebrate!
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#ec4899", "#a855f7", "#ffffff"],
      });

      // Play romantic music
      playTrack(0);
    } else {
      setError("Incorrect password. Try again!");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 md:p-12 max-w-md w-full"
        >
          <h1 className="text-4xl font-romantic text-center text-white mb-6 gradient-text">
            Secret Surprise 💝
          </h1>
          <p className="text-white/80 text-center mb-8 font-soft">
            Enter the secret password to unlock a special message for you, Avani.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500"
              autoFocus
              aria-label="Password input"
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-300 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-lg py-3 px-6 font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Unlock Secret ✨
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800 px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-romantic text-white mb-4 gradient-text">
            For You, Avani 💕
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-soft">
            A private space filled with love and promises
          </p>
        </motion.div>

        {/* Long Love Letter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-12 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-romantic text-white mb-6">
            My Dearest Avani,
          </h2>
          <div className="prose prose-invert max-w-none font-handwritten text-white text-lg md:text-xl leading-relaxed space-y-4">
            <p>
              If you&apos;re reading this, it means you found your way here, and that makes me
              incredibly happy. I wanted to create this special space just for you - a place
              where I can express all the feelings I have for you without any boundaries.
            </p>
            <p>
              You are the most amazing person I&apos;ve ever met. Every day with you feels like
              a gift, and I want you to know how much you mean to me. Your smile lights up my
              entire world, your laugh is music to my ears, and your presence makes everything
              better.
            </p>
            <p>
              I promise to always be there for you, to support you in everything you do, to
              make you laugh when you&apos;re sad, and to celebrate every moment of joy with you.
              I promise to love you not just today, but every single day for the rest of my life.
            </p>
            <p>
              We have so many adventures ahead of us, so many memories to create, and so much
              love to share. I can&apos;t wait to see what the future holds for us together.
            </p>
            <p className="text-2xl md:text-3xl font-romantic text-center mt-8">
              Forever yours, ❤️
            </p>
          </div>
        </motion.div>

        {/* Promises */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8 md:p-12 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-romantic text-white mb-6 text-center">
            My Promises to You 💍
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "To always make you feel loved and cherished",
              "To support your dreams and ambitions",
              "To be your best friend and partner in crime",
              "To make you laugh every single day",
              "To grow old with you, hand in hand",
              "To create beautiful memories together",
              "To be there through thick and thin",
              "To love you more each day",
            ].map((promise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/10 rounded-xl p-4 text-white font-handwritten text-lg"
              >
                ✨ {promise}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Future Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-romantic text-white mb-6 text-center">
            Our Future Together 🌟
          </h2>
          <div className="space-y-4 font-handwritten text-white text-lg md:text-xl leading-relaxed">
            <p>
              • Travel to beautiful places - watching sunsets in Santorini, exploring Japanese
              gardens, and dancing under the stars in Bali.
            </p>
            <p>
              • Build a home together filled with love, laughter, and endless cuddles.
            </p>
            <p>
              • Create our own traditions and celebrate every little moment of joy.
            </p>
            <p>
              • Grow together, learn together, and become the best versions of ourselves.
            </p>
            <p>
              • Face life&apos;s challenges hand in hand, knowing we have each other.
            </p>
          </div>
        </motion.div>

        {/* Video placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-romantic text-white mb-6 text-center">
            A Video Message For You 🎥
          </h2>
          <div className="aspect-video bg-white/10 rounded-xl flex items-center justify-center">
            <p className="text-white/60 font-soft">
              [Place your video message here - Replace this with an actual video embed or file]
            </p>
          </div>
        </motion.div>

        {/* Virtual Ring/Gift */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass rounded-3xl p-8 md:p-12 mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-romantic text-white mb-6">
            A Special Gift 💎
          </h2>
          <div className="text-6xl mb-4">💍</div>
          <p className="text-white font-handwritten text-lg md:text-xl">
            This represents my commitment and love for you. One day, I hope to give you
            something real, something that matches the depth of my feelings.
          </p>
        </motion.div>

        {/* Fireworks trigger */}
        <motion.button
          onClick={() => {
            const duration = 5000;
            const animationEnd = Date.now() + duration;
            const interval = setInterval(() => {
              const timeLeft = animationEnd - Date.now();
              if (timeLeft <= 0) {
                clearInterval(interval);
                return;
              }
              confetti({
                particleCount: 100,
                spread: 100,
                origin: { x: Math.random(), y: Math.random() },
                colors: ["#ec4899", "#a855f7", "#ffffff"],
              });
            }, 100);
          }}
          className="w-full glass rounded-full py-4 px-8 text-white text-xl font-romantic hover:bg-white/20 transition-colors mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎆 Launch Fireworks 🎆
        </motion.button>

        {/* Back button */}
        <motion.button
          onClick={() => router.push("/")}
          className="w-full bg-white/10 hover:bg-white/20 rounded-full py-4 px-8 text-white font-semibold transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ← Back to Main Site
        </motion.button>
      </div>

      {/* Surprise modal can be triggered here */}
    </div>
  );
}

