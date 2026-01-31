"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

export function MouseTrail() {
  const trailRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const performance = useDevicePerformance();
  const trailElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (reducedMotion || performance === "low" || !trailRef.current) return;

    const container = trailRef.current;
    let mouseX = 0;
    let mouseY = 0;
    const trailLength = performance === "high" ? 10 : 5;

    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
      const element = document.createElement("div");
      element.className = "mouse-trail-element";
      element.style.cssText = `
        position: fixed;
        width: ${12 - i}px;
        height: ${12 - i}px;
        background: ${i % 2 === 0 ? "#ec4899" : "#a855f7"};
        border-radius: 50%;
        pointer-events: none;
        opacity: ${1 - i * 0.1};
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease-out;
        z-index: 9999;
      `;
      container.appendChild(element);
      trailElementsRef.current.push(element);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateTrail = () => {
      trailElementsRef.current.forEach((element, index) => {
        const delay = index * 0.1;
        setTimeout(() => {
          element.style.left = `${mouseX}px`;
          element.style.top = `${mouseY}px`;
        }, delay);
      });
      requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animateTrail();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trailElementsRef.current.forEach((el) => el.remove());
      trailElementsRef.current = [];
    };
  }, [reducedMotion, performance]);

  if (reducedMotion || performance === "low") return null;

  return (
    <div
      ref={trailRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}

