"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REASONS = [
  "Your smile lights up my entire world",
  "You make every day an adventure",
  "Your kindness touches everyone around you",
  "You're the most beautiful person inside and out",
  "Your laughter is my favorite sound",
  "You inspire me to be a better person",
  "Your passion for life is contagious",
  "You understand me like no one else",
  "You make ordinary moments magical",
  "You're my best friend and my greatest love",
];

export function ReasonsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView || !sectionRef.current) return;

    const reasons = sectionRef.current.querySelectorAll(".reason-item");
    reasons.forEach((reason, index) => {
      gsap.fromTo(
        reason,
        {
          opacity: 0,
          x: -100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: reason,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-romantic-purple/10 to-transparent">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-romantic text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          10 Reasons Why I Love You 💕
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {REASONS.map((reason, index) => (
            <motion.div
              key={index}
              className="reason-item glass rounded-lg p-6 text-xl font-handwritten"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-romantic-rose mr-4">{index + 1}.</span>
              {reason}
            </motion.div>
          ))}

          <motion.div
            className="reason-item glass rounded-lg p-8 text-3xl font-romantic text-center mt-8 glow-romantic"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, type: "spring", stiffness: 200 }}
          >
            And most of all... because you&apos;re you, Avani. 💖
          </motion.div>
        </div>
      </div>
    </section>
  );
}

