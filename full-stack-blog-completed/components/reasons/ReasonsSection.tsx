"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  "Your smile lights up my entire world",
  "Your laugh is the most beautiful sound I've ever heard",
  "You're incredibly kind and caring towards everyone",
  "Your intelligence and curiosity inspire me every day",
  "You have the most beautiful heart - pure and genuine",
  "Your sense of humor always makes me happy",
  "You're strong, independent, and absolutely amazing",
  "You make even ordinary moments feel magical",
  "Your passion for life is contagious",
  "You accept me for who I am, flaws and all",
];

export function ReasonsSection() {
  const [visibleReasons, setVisibleReasons] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const performance = useDevicePerformance();

  useEffect(() => {
    if (sectionRef.current && performance !== "low") {
      // Animate reasons one by one on scroll
      REASONS.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          onEnter: () => {
            setVisibleReasons((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          },
        });
      });
    } else {
      // Show all reasons if reduced motion or low performance
      setVisibleReasons(REASONS.map((_, i) => i));
    }
  }, [performance]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 dark:from-purple-950 dark:via-pink-950 dark:to-purple-900 opacity-50" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-romantic text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          10 Reasons Why I Love You
        </motion.h2>

        <div className="space-y-6">
          {REASONS.map((reason, index) => (
            <motion.div
              key={index}
              className="reason-item"
              initial={{ opacity: 0, x: -100 }}
              animate={{
                opacity: visibleReasons.includes(index) ? 1 : 0,
                x: visibleReasons.includes(index) ? 0 : -100,
              }}
              transition={{
                duration: 0.8,
                delay: visibleReasons.includes(index) ? index * 0.2 : 0,
                ease: "back.out",
              }}
            >
              <div className="glass rounded-2xl p-6 md:p-8 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                <p className="text-white text-lg md:text-xl font-handwritten flex-1 pt-2">
                  {reason}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final reveal */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="glass rounded-3xl p-8 md:p-12">
            <p className="text-3xl md:text-4xl font-romantic text-white mb-4">
              But most of all...
            </p>
            <p className="text-4xl md:text-5xl font-romantic gradient-text">
              Because you&apos;re you, Avani. ❤️
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

