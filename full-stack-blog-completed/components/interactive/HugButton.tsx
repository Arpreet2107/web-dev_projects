"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import { vibrate } from "@/lib/utils";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { playSound } from "@/lib/soundEffects";

gsap.registerPlugin(ScrollTrigger);

export function HugButton() {
  const [isHugging, setIsHugging] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const leftArmRef = useRef<HTMLDivElement>(null);
  const rightArmRef = useRef<HTMLDivElement>(null);
  const performance = useDevicePerformance();

  useEffect(() => {
    if (sectionRef.current && performance !== "low") {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [performance]);

  const handleHug = () => {
    setIsHugging(true);
    setHugCount((prev) => prev + 1);
    vibrate([100, 50, 100]);
    playSound("heartTap");

    // Animate arms closing
    if (leftArmRef.current && rightArmRef.current && performance !== "low") {
      gsap.to(leftArmRef.current, {
        rotate: -30,
        x: 50,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(rightArmRef.current, {
        rotate: 30,
        x: -50,
        duration: 0.8,
        ease: "power2.out",
      });

      // Reset after animation
      setTimeout(() => {
        gsap.to([leftArmRef.current, rightArmRef.current], {
          rotate: 0,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        });
        setTimeout(() => setIsHugging(false), 800);
      }, 2000);
    } else {
      setTimeout(() => setIsHugging(false), 2000);
    }

    // Confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#a855f7", "#ffffff"],
    });
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 dark:from-purple-950 dark:via-pink-950 dark:to-purple-900 opacity-50" />

      {/* Warm tint overlay when hugging */}
      <AnimatePresence>
        {isHugging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-pink-400/20 to-orange-400/20 z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-romantic mb-8 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Send a Virtual Hug
        </motion.h2>

        <div className="relative h-[400px] flex items-center justify-center">
          {/* Teddy bear body */}
          <div className="relative z-20">
            <div className="w-48 h-48 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full shadow-2xl flex items-center justify-center">
              <div className="text-6xl">🧸</div>
            </div>
          </div>

          {/* Left arm */}
          <div
            ref={leftArmRef}
            className="absolute left-0 z-10 origin-right"
            style={{ transform: "rotate(-45deg)" }}
          >
            <div className="w-32 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-l-full shadow-xl" />
          </div>

          {/* Right arm */}
          <div
            ref={rightArmRef}
            className="absolute right-0 z-10 origin-left"
            style={{ transform: "rotate(45deg)" }}
          >
            <div className="w-32 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-r-full shadow-xl" />
          </div>
        </div>

        {/* Hug button */}
        <motion.button
          onClick={handleHug}
          className="glass rounded-full px-8 py-4 text-white text-xl md:text-2xl font-romantic mt-8 glow-pink"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isHugging}
          aria-label="Send a hug"
        >
          {isHugging ? "Hugging... 💕" : "Give Me a Hug!"}
        </motion.button>

        {/* Message */}
        <AnimatePresence>
          {isHugging && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 glass rounded-2xl p-6"
            >
              <p className="text-white text-xl md:text-2xl font-handwritten">
                I&apos;m hugging you in my heart right now, Octopuff. ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hug counter */}
        {hugCount > 0 && (
          <motion.div
            className="mt-4 text-white/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Hugs sent: {hugCount} 💕
          </motion.div>
        )}
      </div>
    </section>
  );
}

