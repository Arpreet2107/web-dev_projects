"use client";

import { useState } from "react";
import { useMusicStore } from "@/store/musicStore";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaMusic } from "react-icons/fa";
import { cn } from "@/lib/utils";

export function MusicControls() {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    isPlaying,
    isMuted,
    volume,
    currentTrack,
    play,
    pause,
    toggleMute,
    setVolume,
    nextTrack,
    previousTrack,
  } = useMusicStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 no-print">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass rounded-2xl p-4 mb-2 space-y-3 min-w-[250px]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Music</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close music controls"
              >
                ×
              </button>
            </div>

            {currentTrack && (
              <div className="text-xs text-white/80 truncate">
                {currentTrack.name}
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={previousTrack}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="Previous track"
              >
                ←
              </button>
              <button
                onClick={isPlaying ? pause : play}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={nextTrack}
                className="text-white/70 hover:text-white transition-colors p-1"
                aria-label="Next track"
              >
                →
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-white/70 hover:text-white transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 accent-pink-500"
                aria-label="Volume"
              />
              <span className="text-xs text-white/70 w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "glass rounded-full p-4 shadow-lg",
          isPlaying && "glow-pink"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle music controls"
      >
        <FaMusic className="text-white text-xl" />
      </motion.button>
    </div>
  );
}

