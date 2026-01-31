"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "react-use";

interface FloatingParticlesProps {
  isNightMode: boolean;
}

export function FloatingParticles({ isNightMode }: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const particles: HTMLDivElement[] = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = `absolute rounded-full ${
        isNightMode ? "bg-purple-400/30" : "bg-romantic-pink/30"
      }`;
      particle.style.width = `${Math.random() * 4 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${6 + Math.random() * 4}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [isNightMode, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

