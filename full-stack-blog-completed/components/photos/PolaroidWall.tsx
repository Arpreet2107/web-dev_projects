"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

gsap.registerPlugin(ScrollTrigger);

const POLAROID_PHOTOS = [
  { id: 1, url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400", caption: "Our first moment together 💕", date: "Forever" },
  { id: 2, url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400", caption: "Smiling at you always makes my day 😊", date: "Always" },
  { id: 3, url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400", caption: "You make everything brighter ✨", date: "Everyday" },
  { id: 4, url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400", caption: "My heart belongs to you 💖", date: "Forever" },
  { id: 5, url: "https://images.unsplash.com/photo-1518621012428-6a01147d48f7?w=400", caption: "Love you more than words can say ❤️", date: "Always" },
  { id: 6, url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400", caption: "You're my everything 🌟", date: "Everyday" },
];

export function PolaroidWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const performance = useDevicePerformance();

  useEffect(() => {
    if (sectionRef.current && performance !== "low") {
      const polaroids = sectionRef.current.querySelectorAll(".polaroid-item");
      
      polaroids.forEach((polaroid, index) => {
        gsap.fromTo(
          polaroid,
          { opacity: 0, y: 100, rotate: -10 },
          {
            opacity: 1,
            y: 0,
            rotate: Math.random() * 10 - 5,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, [performance]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 dark:from-purple-950 dark:via-pink-950 dark:to-purple-900 opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-romantic text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Memory Wall
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {POLAROID_PHOTOS.map((photo, index) => (
            <Tilt
              key={photo.id}
              className="polaroid-item"
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              transitionSpeed={1000}
              scale={1.05}
              glare={true}
              glareMaxOpacity={0.2}
            >
              <motion.div
                className="bg-white p-4 shadow-2xl rounded-sm transform"
                style={{
                  rotate: Math.random() * 10 - 5,
                }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden mb-2">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-handwritten text-gray-800 text-sm mb-1">
                  {photo.caption}
                </div>
                <div className="font-handwritten text-gray-500 text-xs">
                  {photo.date}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

