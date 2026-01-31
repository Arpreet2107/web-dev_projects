"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import { FiX, FiPlay, FiDownload } from "react-icons/fi";
import { vibrate } from "@/lib/utils";
import { playSound } from "@/lib/soundEffects";

// Placeholder Lottie animation data (replace with actual bear/heart animation JSON)
const LOTTIE_ANIMATION = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  nm: "Heart Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Heart",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] }, { t: 60, s: [360] }] },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [100, 100] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.92, 0.36, 0.58, 1] },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
};

interface SurpriseModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function SurpriseModal({ isOpen: controlledIsOpen, onClose }: SurpriseModalProps) {
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.4 },
        colors: ["#ec4899", "#a855f7", "#ffffff", "#f472b6"],
      });
      vibrate([100, 50, 100]);
      playSound("modalOpen");
    }
  }, [isOpen]);

  const handlePlayVoice = async () => {
    setIsPlayingVoice(true);
    vibrate(100);

    try {
      // Try to use TTS API if configured
      const ttsProvider = process.env.NEXT_PUBLIC_TTS_PROVIDER;
      const apiKey = process.env.NEXT_PUBLIC_TTS_API_KEY;

      if (ttsProvider && apiKey) {
        // Call TTS API endpoint
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: getLoveLetterText(),
            voice: "romantic-male",
          }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.play();
            audioRef.current.onended = () => setIsPlayingVoice(false);
            audioRef.current.onerror = () => setIsPlayingVoice(false);
          }
          return;
        }
      }

      // Fallback: Use placeholder audio or generate client-side
      const placeholderAudio = "/audio/voice-letter-placeholder.mp3";
      if (audioRef.current) {
        audioRef.current.src = placeholderAudio;
        audioRef.current.play().catch(() => {
          // If audio fails, show message
          setIsPlayingVoice(false);
          alert("Audio playback not available. Please download the PDF instead.");
        });
        audioRef.current.onended = () => setIsPlayingVoice(false);
        audioRef.current.onerror = () => setIsPlayingVoice(false);
      }
    } catch (error) {
      console.error("Error playing voice:", error);
      setIsPlayingVoice(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      vibrate(50);
      
      // Generate PDF via API
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: getLoveLetterText(),
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "love-letter-for-avani.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Fallback: download placeholder PDF
        window.open("/love-letter-sample.pdf", "_blank");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      window.open("/love-letter-sample.pdf", "_blank");
    }
  };

  const getLoveLetterText = () => {
    return `My Dearest Avani (Octopuff),

As I sit down to write this, my heart is filled with so much love and gratitude for having you in my life. Today is your special day, and I wanted to create something magical just for you.

You are the most beautiful person I've ever met - not just on the outside, but especially on the inside. Your kindness, your smile, your laugh, your way of seeing the world - everything about you fills me with joy.

I hope this website brings a smile to your face, because that's all I want - to see you happy. You deserve all the happiness in the world, and I promise to do everything in my power to make sure you always have a reason to smile.

Happy Birthday, my love. Here's to many more beautiful moments together.

Forever yours,
Your Secret Admirer ❤️`;
  };

  if (!isOpen && !controlledIsOpen) return null;

  return (
    <AnimatePresence>
      {(isOpen || controlledIsOpen) && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsOpen(false);
              onClose?.();
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Surprise modal"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-3xl p-8 md:p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onClose?.();
                }}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>

              {/* Lottie Animation */}
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48">
                  <Lottie
                    animationData={LOTTIE_ANIMATION}
                    loop={true}
                    autoplay={true}
                  />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-romantic text-center text-white mb-6 gradient-text">
                Surprise! 💕
              </h2>

              {/* Message */}
              <div className="glass rounded-2xl p-6 mb-6">
                <p className="text-white font-handwritten text-lg md:text-xl leading-relaxed text-center">
                  Avani, I created something special just for you. I hope this brings a smile
                  to your beautiful face. Happy Birthday, Octopuff! ❤️
                </p>
              </div>

              {/* Photo collage */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${1522673607200 + i}?w=400`}
                      alt={`Memory ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handlePlayVoice}
                  disabled={isPlayingVoice}
                  className="flex-1 glass rounded-full px-6 py-4 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlay size={20} />
                  {isPlayingVoice ? "Playing..." : "Play My Voice Letter"}
                </motion.button>

                <motion.button
                  onClick={handleDownloadPDF}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 rounded-full px-6 py-4 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiDownload size={20} />
                  Download Love Letter (PDF)
                </motion.button>
              </div>

              {/* Audio element */}
              <audio ref={audioRef} preload="auto" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

