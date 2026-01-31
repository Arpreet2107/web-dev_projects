"use client";

import { useEffect, useState } from "react";
import { IntroAnimation } from "@/components/intro/IntroAnimation";
import { HeroSection } from "@/components/hero/HeroSection";
import { PhotoSlider } from "@/components/photos/PhotoSlider";
import { PolaroidWall } from "@/components/photos/PolaroidWall";
import { WishingWall } from "@/components/wishes/WishingWall";
import { TarotCards } from "@/components/tarot/TarotCards";
import { HoroscopeSection } from "@/components/horoscope/HoroscopeSection";
import { ReasonsSection } from "@/components/reasons/ReasonsSection";
import { HugButton } from "@/components/interactive/HugButton";
import { SurpriseModal } from "@/components/modal/SurpriseModal";
import { GiftOpener } from "@/components/interactive/GiftOpener";
import { FloatingCompliments } from "@/components/interactive/FloatingCompliments";
import { ThreeHearts } from "@/components/threejs/ThreeHearts";
import { FloatingParticles } from "@/components/particles/FloatingParticles";
import { Fireflies } from "@/components/particles/Fireflies";
import { MouseTrail } from "@/components/interactive/MouseTrail";
import { Navbar } from "@/components/layout/Navbar";
import { CountdownWidget } from "@/components/countdown/CountdownWidget";
import { MusicControls } from "@/components/music/MusicControls";
import { useTheme } from "next-themes";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [countdownReached, setCountdownReached] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (hasSeenIntro === "true") {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    localStorage.setItem("hasSeenIntro", "true");
  };

  const handleCountdownReached = () => {
    setCountdownReached(true);
  };

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Background effects */}
      <FloatingParticles />
      {theme === "dark" && <Fireflies />}
      <ThreeHearts />
      <MouseTrail />

      {/* Layout components */}
      <Navbar onCountdownReached={handleCountdownReached} />
      <CountdownWidget />

      {/* Main sections */}
      <HeroSection onCountdownReached={handleCountdownReached} />
      <PhotoSlider />
      <PolaroidWall />
      <WishingWall />
      <TarotCards />
      <HoroscopeSection />
      <ReasonsSection />
      <HugButton />
      <GiftOpener />

      {/* Interactive elements */}
      <FloatingCompliments />

      {/* Music controls */}
      <MusicControls />

      {/* Surprise modal - can be triggered */}
      {countdownReached && <SurpriseModal />}
    </main>
  );
}

