"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

export function Fireflies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const performance = useDevicePerformance();

  useEffect(() => {
    if (reducedMotion || performance === "low" || !containerRef.current) return;

    const container = containerRef.current;
    const fireflyCount = performance === "high" ? 30 : 15;

    // Create fireflies
    const fireflies: HTMLDivElement[] = [];
    for (let i = 0; i < fireflyCount; i++) {
      const firefly = document.createElement("div");
      firefly.className = "firefly";
      firefly.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #fef3c7;
        border-radius: 50%;
        box-shadow: 0 0 10px #fef3c7, 0 0 20px #fef3c7;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.8 + 0.2};
        animation: firefly-float ${5 + Math.random() * 10}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(firefly);
      fireflies.push(firefly);
    }

    // Add animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes firefly-float {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: 0.5;
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
          opacity: 1;
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
          opacity: 0.7;
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
          opacity: 0.9;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      fireflies.forEach((f) => f.remove());
      style.remove();
    };
  }, [reducedMotion, performance]);

  if (reducedMotion || performance === "low") return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

