"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import confetti from "canvas-confetti";
import Typewriter from "react-typewriter-effect";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showTapButton, setShowTapButton] = useState(false);
  const [heartDrawn, setHeartDrawn] = useState(false);
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setTimeout(() => {
        setShowTapButton(true);
        setHeartDrawn(true);
      }, 1000);
      return;
    }

    // Create swirling stars
    if (starsRef.current) {
      const stars = starsRef.current;
      for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.className = "absolute w-1 h-1 bg-white rounded-full";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random()}`;
        stars.appendChild(star);

        gsap.to(star, {
          rotation: 360,
          duration: 5 + Math.random() * 5,
          repeat: -1,
          ease: "none",
        });

        gsap.to(star, {
          x: `+=${(Math.random() - 0.5) * 200}`,
          y: `+=${(Math.random() - 0.5) * 200}`,
          duration: 3 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }

    // Draw heart outline
    if (heartRef.current) {
      const path = heartRef.current.querySelector("path");
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          onComplete: () => setHeartDrawn(true),
        });
      }
    }

    // Create glowing particles rising
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.className = "absolute w-2 h-2 bg-pink-400 rounded-full glow-pink";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = "-10px";
        document.body.appendChild(particle);

        gsap.to(particle, {
          y: window.innerHeight + 100,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          ease: "power1.out",
          onComplete: () => particle.remove(),
        });

        particles.push(particle);
      }, i * 100);
    }

    // Show tap button after animations
    setTimeout(() => {
      setShowTapButton(true);
    }, 4000);

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [reducedMotion]);

  const handleTap = () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#a855f7", "#ffffff"],
    });

    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-pink-900 via-purple-900 to-pink-800 flex items-center justify-center overflow-hidden"
        onClick={showTapButton ? handleTap : undefined}
        style={{ cursor: showTapButton ? "pointer" : "default" }}
      >
        {/* Swirling Stars Background */}
        <div ref={starsRef} className="absolute inset-0" />

        {/* Glowing Particles */}
        <div className="absolute inset-0" />

        {/* Heart Outline */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "back.out" }}
          className="relative"
        >
          <svg
            ref={heartRef}
            width="300"
            height="270"
            viewBox="0 0 300 270"
            className="drop-shadow-2xl"
          >
            <path
              d="M150,240 C50,160 20,100 20,70 C20,40 40,20 70,20 C100,20 130,40 150,70 C170,40 200,20 230,20 C260,20 280,40 280,70 C280,100 250,160 150,240 Z"
              fill="none"
              stroke="#ec4899"
              strokeWidth="4"
              className={heartDrawn ? "glow-pink" : ""}
            />
          </svg>

          {heartDrawn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Typewriter
                text="Avani"
                typeSpeed={100}
                cursorColor="#ec4899"
                textStyle={{
                  fontFamily: "var(--font-romantic)",
                  fontSize: "48px",
                  color: "#ec4899",
                  fontWeight: "bold",
                }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Tap to Enter Button */}
        <AnimatePresence>
          {showTapButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2"
            >
              <motion.button
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="glass px-8 py-4 rounded-full text-white font-semibold text-lg glow-pink"
                onClick={handleTap}
                aria-label="Tap to enter"
              >
                Tap to Enter ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

