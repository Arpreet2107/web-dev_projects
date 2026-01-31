"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const STOCK_PHOTOS = [
  { id: 1, url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800", caption: "Together Forever" },
  { id: 2, url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", caption: "My Heart Belongs to You" },
  { id: 3, url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800", caption: "Love in Every Moment" },
  { id: 4, url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", caption: "You Are My Sunshine" },
  { id: 5, url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800", caption: "Pure Happiness" },
  { id: 6, url: "https://images.unsplash.com/photo-1518621012428-6a01147d48f7?w=800", caption: "Forever Yours" },
  { id: 7, url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800", caption: "My Everything" },
  { id: 8, url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", caption: "Endless Love" },
];

type SliderMode = "cube" | "coverflow" | "card-stack" | "crossfade";

export function PhotoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<SliderMode>("crossfade");
  const [autoPlay, setAutoPlay] = useState(true);
  const performance = useDevicePerformance();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % STOCK_PHOTOS.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [autoPlay]);

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
            start: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [performance]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % STOCK_PHOTOS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + STOCK_PHOTOS.length) % STOCK_PHOTOS.length);
  };

  const renderSlide = () => {
    const photo = STOCK_PHOTOS[currentIndex];

    switch (mode) {
      case "cube":
        return (
          <motion.div
            key={currentIndex}
            className="w-full h-[500px] relative perspective-1000"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-full h-full preserve-3d" style={{ transform: "rotateY(0deg)" }}>
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        );

      case "coverflow":
        return (
          <div className="flex items-center justify-center gap-4 perspective-1000 overflow-x-auto py-8">
            {STOCK_PHOTOS.map((p, idx) => {
              const distance = Math.abs(idx - currentIndex);
              const isActive = idx === currentIndex;
              const offset = (idx - currentIndex) * 100;

              return (
                <motion.div
                  key={p.id}
                  className="relative flex-shrink-0"
                  style={{
                    width: isActive ? "400px" : "200px",
                    opacity: isActive ? 1 : 0.5,
                    zIndex: isActive ? 10 : 5 - distance,
                    transform: `translateX(${offset}px) rotateY(${(idx - currentIndex) * 30}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <img
                    src={p.url}
                    alt={p.caption}
                    className="w-full h-[400px] object-cover rounded-xl shadow-lg cursor-pointer"
                  />
                </motion.div>
              );
            })}
          </div>
        );

      case "card-stack":
        return (
          <div className="relative w-full h-[500px] flex items-center justify-center">
            {STOCK_PHOTOS.slice(currentIndex, currentIndex + 3).map((p, idx) => (
              <motion.div
                key={p.id}
                className="absolute w-[350px]"
                initial={{ y: idx * 20, scale: 1 - idx * 0.1, opacity: 1 - idx * 0.3 }}
                animate={{
                  y: idx * 20,
                  scale: 1 - idx * 0.1,
                  opacity: 1 - idx * 0.3,
                  zIndex: 10 - idx,
                }}
                style={{
                  rotate: idx === 0 ? 0 : (idx % 2 === 0 ? 5 : -5),
                }}
                transition={{ duration: 0.5 }}
                onClick={() => idx === 0 && nextSlide()}
              >
                <img
                  src={p.url}
                  alt={p.caption}
                  className="w-full h-[450px] object-cover rounded-xl shadow-2xl cursor-pointer"
                />
              </motion.div>
            ))}
          </div>
        );

      default: // crossfade
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative w-full h-[500px]"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-2xl">
                <p className="text-white text-2xl font-romantic">{photo.caption}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-purple-950 dark:via-pink-950 dark:to-purple-900 opacity-50" />

      <div className="relative z-10 max-w-6xl w-full">
        <motion.h2
          className="text-5xl md:text-6xl font-romantic text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Beautiful Memories
        </motion.h2>

        {/* Mode selector */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {(["crossfade", "cube", "coverflow", "card-stack"] as SliderMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                mode === m
                  ? "bg-pink-500 text-white"
                  : "glass text-white hover:bg-white/20"
              }`}
            >
              {m.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative">
          {renderSlide()}

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 glass rounded-full p-3 text-white hover:bg-white/20 transition-colors z-20"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 glass rounded-full p-3 text-white hover:bg-white/20 transition-colors z-20"
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {STOCK_PHOTOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex ? "bg-pink-500 w-8" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Auto-play toggle */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            {autoPlay ? "⏸ Pause" : "▶ Play"}
          </button>
        </div>
      </div>
    </section>
  );
}

