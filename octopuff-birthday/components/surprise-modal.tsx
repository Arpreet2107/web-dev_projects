"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import confetti from "canvas-confetti";
import { useSound } from "@/hooks/use-sound";
import { generatePDF } from "@/lib/pdf-generator";

const LOVE_LETTER = `My Dearest Avani (Octopuff),

On this special day, I want to tell you how much you mean to me. You are the light in my life, the joy in my heart, and the reason I smile every day.

Your beautiful spirit, your kind heart, and your amazing personality make you the most wonderful person I know. Every moment with you is a treasure, and I'm so grateful to have you in my life.

Happy Birthday, my love. May this year bring you endless happiness, adventures, and all the love you deserve.

Forever yours,
Your Secret Admirer 💕`;

export function SurpriseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const { play: playModalSound } = useSound("/sounds/modal-open.mp3", { volume: 0.3 });
  const { play: playVoice } = useSound("/sounds/voice-letter.mp3", { volume: 0.7 });

  const handleOpen = () => {
    setIsOpen(true);
    playModalSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handlePlayVoice = () => {
    setIsPlayingVoice(true);
    playVoice();
    setTimeout(() => setIsPlayingVoice(false), 30000); // Assuming 30s audio
  };

  const handleDownloadPDF = async () => {
    await generatePDF(LOVE_LETTER, "Love Letter for Avani");
  };

  return (
    <section className="py-20 bg-gradient-to-b from-romantic-purple/10 to-transparent">
      <div className="container mx-auto px-4 text-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="romantic"
                size="lg"
                onClick={handleOpen}
                className="text-2xl px-8 py-6"
              >
                Open Your Surprise 🎁
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-dark">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center text-6xl">
                  🧸💕
                </div>
                <h2 className="text-4xl font-romantic mb-4">Surprise! 💕</h2>
              </div>

              <div className="glass rounded-lg p-6">
                <p className="text-lg font-handwritten whitespace-pre-line">
                  {LOVE_LETTER}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="romantic"
                  onClick={handlePlayVoice}
                  disabled={isPlayingVoice}
                >
                  {isPlayingVoice ? "Playing..." : "Play My Voice Letter 🎤"}
                </Button>
                <Button variant="outline" onClick={handleDownloadPDF}>
                  Download PDF 💌
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&sig=${i}`}
                    alt={`Memory ${i}`}
                    className="rounded-lg w-full h-32 object-cover"
                  />
                ))}
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

