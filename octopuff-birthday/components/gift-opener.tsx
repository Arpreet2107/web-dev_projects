"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useSound } from "@/hooks/use-sound";
import { generatePDF } from "@/lib/pdf-generator";

export function GiftOpener() {
  const [isShaking, setIsShaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const { play: playShake } = useSound("/sounds/gift-shake.mp3", { volume: 0.3 });
  const { play: playOpen } = useSound("/sounds/gift-open.mp3", { volume: 0.5 });

  const handleClick = () => {
    if (!isShaking && !isOpen) {
      setIsShaking(true);
      playShake();

      setTimeout(() => {
        setIsShaking(false);
        setIsOpen(true);
        playOpen();
        confetti({
          particleCount: 150,
          spread: 60,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          setShowPDF(true);
        }, 1000);
      }, 2000);
    }
  };

  const handleDownloadPDF = async () => {
    await generatePDF("Your special gift message here!", "Gift for Avani");
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-romantic-purple/10">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-romantic mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Open Your Gift 🎁
        </motion.h2>

        <motion.div
          className="relative inline-block cursor-pointer"
          onClick={handleClick}
          animate={isShaking ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5, repeat: isShaking ? 3 : 0 }}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed"
                initial={{ scale: 1 }}
                exit={{ scale: 0.8, rotate: -10 }}
                className="text-9xl"
              >
                🎁
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="space-y-4"
              >
                <div className="text-6xl mb-4">✨</div>
                <p className="text-2xl font-handwritten">Your gift is ready!</p>
                {showPDF && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadPDF();
                    }}
                    className="mt-4 px-6 py-3 bg-romantic-rose text-white rounded-lg"
                  >
                    Download PDF 💌
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

