"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

gsap.registerPlugin(ScrollTrigger);

// Fallback data for Sagittarius
const FALLBACK_HOROSCOPE = {
  sign: "Sagittarius",
  dateRange: "November 22 - December 21",
  today: {
    vibe: "Adventurous & Optimistic",
    luckyColor: "Purple",
    mood: "Playful & Romantic",
    message: "Today is perfect for new beginnings and spreading your infectious joy. Your adventurous spirit will lead you to amazing experiences. The stars align to bring love and happiness your way! 💜",
  },
  general: {
    element: "Fire",
    rulingPlanet: "Jupiter",
    traits: ["Optimistic", "Adventurous", "Independent", "Honest", "Philosophical"],
  },
};

export function HoroscopeSection() {
  const [horoscope, setHoroscope] = useState(FALLBACK_HOROSCOPE);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const performance = useDevicePerformance();

  useEffect(() => {
    // Try to fetch horoscope from API if available
    const fetchHoroscope = async () => {
      const apiKey = process.env.NEXT_PUBLIC_HOROSCOPE_API_KEY;
      const apiUrl = process.env.NEXT_PUBLIC_HOROSCOPE_API_URL;

      if (apiKey && apiUrl) {
        try {
          const response = await fetch(`${apiUrl}?sign=sagittarius&date=today`, {
            headers: {
              "X-API-Key": apiKey,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setHoroscope({
              ...FALLBACK_HOROSCOPE,
              today: {
                vibe: data.vibe || FALLBACK_HOROSCOPE.today.vibe,
                luckyColor: data.luckyColor || FALLBACK_HOROSCOPE.today.luckyColor,
                mood: data.mood || FALLBACK_HOROSCOPE.today.mood,
                message: data.message || FALLBACK_HOROSCOPE.today.message,
              },
            });
          }
        } catch (error) {
          console.log("Using fallback horoscope data");
        }
      }
      
      setLoading(false);
    };

    fetchHoroscope();
  }, []);

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

  if (loading) {
    return (
      <section className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="heart-loader" />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-purple-950 dark:via-pink-950 dark:to-purple-900 opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-romantic text-center mb-4 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Your Daily Horoscope
        </motion.h2>

        <motion.div
          className="text-center mb-8 text-lg md:text-xl text-gray-700 dark:text-gray-300 font-soft"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="font-bold text-purple-600 dark:text-purple-400">
            {horoscope.sign}
          </span>
          <span className="mx-2">•</span>
          <span>{horoscope.dateRange}</span>
        </motion.div>

        {/* Horoscope Card */}
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-6">
            {/* Today's Vibe */}
            <div>
              <h3 className="text-2xl font-romantic text-white mb-2">✨ Today&apos;s Vibe ✨</h3>
              <p className="text-xl text-pink-300 font-semibold">
                {horoscope.today.vibe}
              </p>
            </div>

            {/* Lucky Color */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/80 font-soft">Lucky Color:</span>
              <div
                className={`w-16 h-16 rounded-full border-4 border-white/30 ${
                  horoscope.today.luckyColor.toLowerCase() === "purple"
                    ? "bg-purple-500"
                    : "bg-pink-500"
                }`}
              />
              <span className="text-white font-semibold">
                {horoscope.today.luckyColor}
              </span>
            </div>

            {/* Mood */}
            <div>
              <h4 className="text-lg text-white/80 font-soft mb-2">Mood:</h4>
              <p className="text-xl text-purple-300 font-semibold">
                {horoscope.today.mood}
              </p>
            </div>

            {/* Message */}
            <div className="bg-white/10 rounded-2xl p-6 mt-8">
              <p className="text-white font-handwritten text-base md:text-lg leading-relaxed">
                {horoscope.today.message}
              </p>
            </div>

            {/* Traits */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {horoscope.general.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 bg-white/20 rounded-full text-white text-sm font-soft"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

