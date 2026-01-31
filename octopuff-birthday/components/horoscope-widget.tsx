"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HoroscopeData {
  sign: string;
  date: string;
  mood: string;
  luckyColor: string;
  vibe: string;
  message: string;
}

const FALLBACK_HOROSCOPE: HoroscopeData = {
  sign: "Sagittarius",
  date: new Date().toLocaleDateString(),
  mood: "Adventurous & Romantic",
  luckyColor: "Purple",
  vibe: "Today is filled with love and adventure. Your free spirit shines bright, and someone special is thinking of you!",
  message: "The stars align perfectly for you today, Octopuff. Your birthday brings new beginnings and endless possibilities. Keep shining! ✨",
};

export function HoroscopeWidget() {
  const [horoscope, setHoroscope] = useState<HoroscopeData>(FALLBACK_HOROSCOPE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_HOROSCOPE_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_HOROSCOPE_API_KEY;

        if (apiUrl && apiKey) {
          const response = await fetch(`${apiUrl}?sign=sagittarius&key=${apiKey}`);
          if (response.ok) {
            const data = await response.json();
            setHoroscope(data);
          }
        }
      } catch (error) {
        console.warn("Horoscope API unavailable, using fallback");
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-romantic-pink/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-2xl mx-auto glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-romantic mb-2">
              Your Daily Horoscope 🔮
            </h2>
            <p className="text-muted-foreground">Sagittarius • {horoscope.date}</p>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Mood</p>
                  <p className="text-xl font-handwritten">{horoscope.mood}</p>
                </div>
                <div className="glass rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Lucky Color</p>
                  <p className="text-xl font-handwritten">{horoscope.luckyColor}</p>
                </div>
              </div>

              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Today's Vibe</p>
                <p className="text-lg">{horoscope.vibe}</p>
              </div>

              <div className="glass rounded-lg p-6 bg-gradient-to-r from-romantic-pink/20 to-romantic-purple/20">
                <p className="text-xl font-handwritten text-center">{horoscope.message}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

