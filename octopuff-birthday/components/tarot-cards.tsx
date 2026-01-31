"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";

const CARDS = [
  {
    id: 1,
    title: "Our Promise",
    content: "I promise to love you unconditionally, support your dreams, and be by your side through every adventure life brings us.",
    icon: "💍",
  },
  {
    id: 2,
    title: "Future Trip",
    content: "We'll explore the mountains of Himachal, watch sunsets in Goa, and create memories in every corner of India together.",
    icon: "✈️",
  },
  {
    id: 3,
    title: "Adventure Awaits",
    content: "As a Sagittarius, your adventurous spirit will lead us to amazing places. I can't wait to explore the world with you!",
    icon: "🌟",
  },
  {
    id: 4,
    title: "Flirty Message",
    content: "You're the fire that lights up my world, and I'm the arrow that will always find its way back to you, my beautiful Sagittarius.",
    icon: "💘",
  },
];

export function TarotCards() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-romantic-purple/10 to-transparent">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-romantic text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Tap to Reveal Your Future With Me 🔮
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          (Sagittarius Special Edition)
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Tilt
                className="h-full"
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
              >
                <motion.div
                  className="relative h-96 cursor-pointer"
                  onClick={() => setFlippedCard(flippedCard === card.id ? null : card.id)}
                  whileHover={{ scale: 1.02 }}
                >
                  <AnimatePresence mode="wait">
                    {flippedCard === card.id ? (
                      <motion.div
                        key="back"
                        initial={{ rotateY: 90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: -90 }}
                        className="absolute inset-0 glass rounded-2xl p-8 flex flex-col items-center justify-center text-center"
                      >
                        <div className="text-6xl mb-4">{card.icon}</div>
                        <h3 className="text-2xl font-romantic mb-4">{card.title}</h3>
                        <p className="text-lg">{card.content}</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="front"
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 90 }}
                        className="absolute inset-0 glass-dark rounded-2xl flex items-center justify-center"
                      >
                        <div className="text-6xl">{card.icon}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

