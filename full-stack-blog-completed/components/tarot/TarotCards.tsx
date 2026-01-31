"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";
import { vibrate } from "@/lib/utils";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { playSound } from "@/lib/soundEffects";

gsap.registerPlugin(ScrollTrigger);

const TAROT_CARDS = [
  {
    id: "promise",
    title: "Our Promise",
    icon: "💍",
    content: "I promise to love and cherish you every single day. To be your partner, your friend, and your biggest supporter through all of life's adventures.",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "trip",
    title: "Future Trip",
    icon: "✈️",
    content: "I dream of taking you to magical places - from watching the sunset in Santorini to stargazing in the mountains. Our adventures together are just beginning.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "adventure",
    title: "Adventure Prediction",
    icon: "🌟",
    content: "As a Sagittarius, you love adventure! Together, we'll explore hidden gems, try new cuisines, dance under the stars, and create stories worth telling for a lifetime.",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "flirty",
    title: "A Message For You",
    icon: "💋",
    content: "Hey Octopuff, your smile is my favorite view, your laugh is my favorite sound, and your presence is my favorite place to be. You're absolutely perfect just the way you are.",
    color: "from-red-500 to-pink-500",
  },
];

export function TarotCards() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
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

  const handleCardClick = (cardId: string) => {
    if (flippedCard === cardId) {
      setFlippedCard(null);
    } else {
      setFlippedCard(cardId);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#a855f7"],
      });
      vibrate(50);
      playSound("stickerPop");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-purple-950 dark:via-pink-950 dark:to-purple-900 opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-romantic text-center mb-4 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Tap to Reveal Your Future With Me
        </motion.h2>

        <motion.p
          className="text-center text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 font-soft"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ✨ The stars have a message for you, beautiful Sagittarius ✨
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TAROT_CARDS.map((card, index) => (
            <Tilt
              key={card.id}
              className="h-[400px]"
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              transitionSpeed={1000}
              scale={1.02}
            >
              <motion.div
                className="relative w-full h-full cursor-pointer"
                style={{ perspective: "1000px" }}
                onClick={() => handleCardClick(card.id)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl shadow-2xl"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotateY: flippedCard === card.id ? 180 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 rounded-3xl glass flex flex-col items-center justify-center p-6"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="text-6xl mb-4">{card.icon}</div>
                    <h3 className="text-2xl md:text-3xl font-romantic text-white text-center mb-4">
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-center font-soft text-sm md:text-base">
                      Tap to reveal your destiny ✨
                    </p>
                  </div>

                  {/* Back */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.color} flex flex-col items-center justify-center p-6 shadow-2xl`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="text-2xl font-romantic text-white text-center mb-4">
                      {card.title}
                    </h3>
                    <p className="text-white text-center font-handwritten text-base md:text-lg leading-relaxed">
                      {card.content}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

