"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import confetti from "canvas-confetti";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showTapButton, setShowTapButton] = useState(false);
  const [heartDrawn, setHeartDrawn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create swirling stars
    if (starsRef.current) {
      for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.className = "absolute w-1 h-1 bg-white rounded-full";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random()}`;
        starsRef.current.appendChild(star);

        gsap.to(star, {
          rotation: 360,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          ease: "none",
        });

        gsap.to(star, {
          x: `+=${(Math.random() - 0.5) * 200}`,
          y: `+=${(Math.random() - 0.5) * 200}`,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }

    // Draw heart outline
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const canvas = canvasRef.current;
        canvas.width = 300;
        canvas.height = 300;
        ctx.strokeStyle = "#FFB6E1";
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#FFB6E1";

        const drawHeart = (progress: number) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();

          const t = progress;
          const x = 150;
          const y = 150;
          const scale = 80;

          for (let i = 0; i <= t * 100; i++) {
            const angle = (i / 100) * Math.PI * 2;
            let px, py;

            if (angle < Math.PI) {
              px = x + scale * (16 * Math.pow(Math.sin(angle), 3));
              py = y - scale * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
            } else {
              px = x - scale * (16 * Math.pow(Math.sin(angle), 3));
              py = y - scale * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
            }

            if (i === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }

          ctx.stroke();
        }

        gsap.to({ progress: 0 }, {
          progress: 1,
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            drawHeart(this.targets()[0].progress);
          },
          onComplete: () => {
            setHeartDrawn(true);
            setTimeout(() => setShowTapButton(true), 500);
          },
        });
      }
    }

    // Glowing particles rising
    const particles = document.querySelectorAll(".particle");
    particles.forEach((particle, i) => {
      gsap.fromTo(
        particle,
        {
          y: 100,
          opacity: 0,
          scale: 0,
        },
        {
          y: -100,
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          duration: 2 + Math.random(),
          delay: i * 0.1,
          repeat: -1,
          ease: "power1.out",
        }
      );
    });
  }, []);

  const handleTap = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-romantic flex items-center justify-center overflow-hidden">
      <div ref={starsRef} className="absolute inset-0" />
      
      {/* Glowing particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 bg-romantic-pink rounded-full glow-pink"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 20}%`,
          }}
        />
      ))}

      <motion.div
        className="flex flex-col items-center justify-center space-y-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <canvas
          ref={canvasRef}
          className="w-[300px] h-[300px]"
          aria-label="Heart drawing animation"
        />

        <motion.h1
          className="text-6xl md:text-8xl font-romantic text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <TypewriterText text="Happy Birthday" />
        </motion.h1>

        <motion.h2
          className="text-4xl md:text-6xl font-handwritten text-romantic-rose text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <TypewriterText text="Octopuff" delay={2500} />
        </motion.h2>

        <AnimatePresence>
          {showTapButton && (
            <motion.button
              onClick={handleTap}
              className="px-8 py-4 bg-white/20 backdrop-blur-md rounded-full text-white text-xl font-semibold border-2 border-white/30 hover:bg-white/30 transition-all glow-romantic"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Tap to Enter ✨
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 100 + delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return <span>{displayedText}</span>;
}

