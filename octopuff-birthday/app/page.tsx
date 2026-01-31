"use client";

import { useState, useEffect } from "react";
import { IntroAnimation } from "@/components/intro-animation";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { PhotoSlider } from "@/components/photo-slider";
import { PolaroidWall } from "@/components/polaroid-wall";
import { WishingWall } from "@/components/wishing-wall";
import { TarotCards } from "@/components/tarot-cards";
import { HoroscopeWidget } from "@/components/horoscope-widget";
import { ReasonsSection } from "@/components/reasons-section";
import { HugButton } from "@/components/hug-button";
import { SurpriseModal } from "@/components/surprise-modal";
import { FloatingCompliments } from "@/components/floating-compliments";
import { GiftOpener } from "@/components/gift-opener";
import { ThreeDHearts } from "@/components/three-d-hearts";
import { HeartLoader } from "@/components/heart-loader";
import { FloatingParticles } from "@/components/floating-particles";
import { Fireflies } from "@/components/fireflies";
import { MouseTrail } from "@/components/mouse-trail";
import { FloatingCountdown } from "@/components/floating-countdown";
import { useScrollMusic } from "@/hooks/use-scroll-music";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isNightMode, setIsNightMode] = useState(false);
  
  useScrollMusic();

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowIntro(false);
      setIsLoading(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIsLoading(false);
    sessionStorage.setItem("hasSeenIntro", "true");
  };

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  if (isLoading) {
    return <HeartLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <MouseTrail />
      <Navbar isNightMode={isNightMode} setIsNightMode={setIsNightMode} />
      <Hero isNightMode={isNightMode} />
      <FloatingParticles isNightMode={isNightMode} />
      {isNightMode && <Fireflies />}
      <ThreeDHearts />
      <FloatingCompliments />
      <FloatingCountdown />
      <PhotoSlider />
      <PolaroidWall />
      <WishingWall />
      <TarotCards />
      <HoroscopeWidget />
      <ReasonsSection />
      <HugButton />
      <GiftOpener />
      <SurpriseModal />
    </main>
  );
}

