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

export function GiftOpener() {
  const [isOpen, setIsOpen] = useState(false);
  const [shaking, setShaking] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const giftRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
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

  const handleOpen = () => {
    if (isOpen) return;

    // Shake animation
    setShaking(true);
    vibrate([100, 50, 100, 50, 100]);
    playSound("giftOpen");

    if (giftRef.current && performance !== "low") {
      gsap.to(giftRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setShaking(false);
          // Open lid
          if (lidRef.current) {
            gsap.to(lidRef.current, {
              rotateX: -120,
              y: -100,
              duration: 0.8,
              ease: "back.in",
            });
          }

          // Sparkles
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.5 },
              colors: ["#ec4899", "#a855f7", "#ffffff", "#f472b6"],
            });
            setIsOpen(true);
          }, 400);
        },
      });
    } else {
      setIsOpen(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#ec4899", "#a855f7", "#ffffff"],
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 dark:from-purple-950 dark:via-pink-950 dark:to-purple-900 opacity-50" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-romantic mb-12 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Open Your Gift
        </motion.h2>

        {/* Gift box */}
        <div className="relative h-[400px] flex items-center justify-center perspective-1000">
          <div
            ref={giftRef}
            className="relative w-64 h-64 cursor-pointer"
            onClick={handleOpen}
          >
            {/* Gift box base */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-2xl ${
                shaking ? "animate-pulse" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Ribbon */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-white/30" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-white/30" />
            </div>

            {/* Gift box lid */}
            <div
              ref={lidRef}
              className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg shadow-2xl origin-bottom"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateY(-10px)",
              }}
            >
              {/* Ribbon on lid */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-white/30" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-white/30" />
              {/* Bow */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>

        {/* Message before opening */}
        {!isOpen && (
          <motion.p
            className="text-white text-lg md:text-xl font-soft mt-8 glass rounded-full px-6 py-3 inline-block"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click the gift box to open! 🎁
          </motion.p>
        )}

        {/* Content after opening */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 glass rounded-3xl p-8 md:p-12"
            >
              <div className="text-6xl mb-6">🎉✨💕</div>
              <h3 className="text-3xl md:text-4xl font-romantic text-white mb-4">
                A Special Message For You
              </h3>
              <p className="text-white text-lg md:text-xl font-handwritten leading-relaxed mb-6">
                This gift represents all my love for you, Avani. You&apos;re the most precious
                gift I&apos;ve ever received in my life. Thank you for being you, and for making
                every day brighter just by existing. ❤️
              </p>
              <motion.a
                href="/love-letter.pdf"
                download
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-4 text-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📄 Download Love Letter (PDF)
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

