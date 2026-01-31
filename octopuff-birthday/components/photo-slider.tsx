"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PHOTOS = [
  { id: 1, url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", caption: "Together Forever" },
  { id: 2, url: "https://images.unsplash.com/photo-1518568814500-bf0f8e125f46?w=800", caption: "Love in the Air" },
  { id: 3, url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800", caption: "Our Journey" },
  { id: 4, url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800", caption: "Sweet Moments" },
  { id: 5, url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", caption: "Happiness" },
  { id: 6, url: "https://images.unsplash.com/photo-1518568814500-bf0f8e125f46?w=800", caption: "Adventure Awaits" },
  { id: 7, url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800", caption: "Dreams Come True" },
  { id: 8, url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800", caption: "Endless Love" },
];

type SliderMode = "cube" | "coverflow" | "card-stack" | "crossfade";

export function PhotoSlider() {
  const [mode, setMode] = useState<SliderMode>("crossfade");
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: mode === "card-stack" ? 3 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_: number, next: number) => setCurrentIndex(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-romantic-pink/10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-romantic text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Beautiful Memories 💕
        </motion.h2>

        <div className="flex justify-center gap-2 mb-6">
          {(["crossfade", "cube", "coverflow", "card-stack"] as SliderMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-lg capitalize ${
                mode === m
                  ? "bg-romantic-rose text-white"
                  : "bg-white/20 text-foreground"
              }`}
            >
              {m.replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Slider {...settings} className="photo-slider">
                {PHOTOS.map((photo) => (
                  <div key={photo.id} className="px-2">
                    <motion.div
                      className="relative rounded-2xl overflow-hidden glass"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-[500px] object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                        <p className="text-white text-xl font-handwritten">{photo.caption}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

