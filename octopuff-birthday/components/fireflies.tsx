"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "react-use";

export function Fireflies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const fireflies: HTMLDivElement[] = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      const firefly = document.createElement("div");
      firefly.className = "absolute w-1 h-1 bg-yellow-300 rounded-full glow-pink";
      firefly.style.left = `${Math.random() * 100}%`;
      firefly.style.top = `${Math.random() * 100}%`;
      firefly.style.opacity = `${Math.random()}`;
      firefly.style.animation = `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`;
      firefly.style.animationDelay = `${Math.random() * 2}s`;

      const moveFirefly = () => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        firefly.style.transition = `all ${5 + Math.random() * 5}s ease-in-out`;
        firefly.style.left = `${(x / window.innerWidth) * 100}%`;
        firefly.style.top = `${(y / window.innerHeight) * 100}%`;
      };

      setInterval(moveFirefly, 5000 + Math.random() * 5000);
      containerRef.current.appendChild(firefly);
      fireflies.push(firefly);
    }

    return () => {
      fireflies.forEach((f) => f.remove());
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

