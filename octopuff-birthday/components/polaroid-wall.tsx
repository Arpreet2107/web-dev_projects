"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const POLAROIDS = [
  { id: 1, url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400", caption: "First Date", date: "2023" },
  { id: 2, url: "https://images.unsplash.com/photo-1518568814500-bf0f8e125f46?w=400", caption: "Beach Day", date: "2023" },
  { id: 3, url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400", caption: "Sunset", date: "2024" },
  { id: 4, url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400", caption: "Adventure", date: "2024" },
  { id: 5, url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400", caption: "Celebration", date: "2024" },
  { id: 6, url: "https://images.unsplash.com/photo-1518568814500-bf0f8e125f46?w=400", caption: "Together", date: "2024" },
];

export function PolaroidWall() {
  return (
    <section className="py-20 bg-gradient-to-b from-romantic-pink/10 to-transparent">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-romantic text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Polaroid Memories 📸
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {POLAROIDS.map((polaroid, index) => (
            <motion.div
              key={polaroid.id}
              initial={{ opacity: 0, y: 50, rotate: -5 + Math.random() * 10 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 + Math.random() * 4 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
            >
              <Tilt
                className="polaroid"
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                transitionSpeed={1500}
              >
                <div className="bg-white p-4 shadow-2xl rounded-sm">
                  <img
                    src={polaroid.url}
                    alt={polaroid.caption}
                    className="w-full h-64 object-cover mb-2"
                  />
                  <div className="font-handwritten text-gray-800">
                    <p className="text-lg">{polaroid.caption}</p>
                    <p className="text-sm text-gray-500">{polaroid.date}</p>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

