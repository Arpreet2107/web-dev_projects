"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCountdown } from "@/hooks/useCountdown";
import confetti from "canvas-confetti";
import { useMusicStore } from "@/store/musicStore";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onCountdownReached: () => void;
}

export function HeroSection({ onCountdownReached }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { time, isExpired, hasReachedZero } = useCountdown(onCountdownReached);
  const { playTrack } = useMusicStore();

  useEffect(() => {
    if (hasReachedZero) {
      // Trigger fireworks
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50;
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.6 + 0.2,
          },
          colors: ["#ec4899", "#a855f7", "#ffffff", "#f472b6"],
        });
      }, 100);

      // Switch music to celebration
      playTrack(2);
    }
  }, [hasReachedZero, playTrack]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 dark:from-purple-950 dark:via-pink-950 dark:to-purple-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Title */}
        <motion.h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-romantic mb-6 gradient-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Happy Birthday Avani! ✨
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-2xl md:text-3xl font-handwritten text-pink-600 dark:text-pink-300 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          My dearest Octopuff
        </motion.p>

        {/* Countdown */}
        {!isExpired ? (
          <motion.div
            className="glass rounded-3xl p-8 md:p-12 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
              Time until your special day:
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-white">
                  {time.days}
                </div>
                <div className="text-sm md:text-base text-white/80">Days</div>
              </div>
              <div className="text-4xl md:text-6xl text-white">:</div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-white">
                  {time.hours}
                </div>
                <div className="text-sm md:text-base text-white/80">Hours</div>
              </div>
              <div className="text-4xl md:text-6xl text-white">:</div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-white">
                  {time.minutes}
                </div>
                <div className="text-sm md:text-base text-white/80">Minutes</div>
              </div>
              <div className="text-4xl md:text-6xl text-white">:</div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-white">
                  {time.seconds}
                </div>
                <div className="text-sm md:text-base text-white/80">Seconds</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="glass rounded-3xl p-8 md:p-12 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-romantic text-white mb-4">
              🎉 It&apos;s Your Special Day! 🎉
            </h2>
            <p className="text-xl md:text-2xl text-white/90">
              Wishing you the most magical birthday ever, Avani! ❤️
            </p>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-white/70 text-sm">Scroll to explore ↓</div>
        </motion.div>
      </div>
    </section>
  );
}

