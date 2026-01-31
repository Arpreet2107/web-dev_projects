"use client";

import { useEffect, useRef, useState } from "react";
import { useMouse } from "react-use";

export function MouseTrail() {
  const trailRef = useRef<HTMLDivElement>(null);
  const { elX, elY } = useMouse(trailRef);
  const [lastHeartTime, setLastHeartTime] = useState(0);

  useEffect(() => {
    if (!trailRef.current) return;

    const handleMouseMove = () => {
      const now = Date.now();
      if (now - lastHeartTime < 300) return; // Throttle to every 300ms

      setLastHeartTime(now);

      const heart = document.createElement("div");
      heart.innerHTML = "💕";
      heart.className = "fixed pointer-events-none text-2xl z-50";
      heart.style.left = `${elX}px`;
      heart.style.top = `${elY}px`;
      heart.style.transform = "translate(-50%, -50%)";
      heart.style.animation = "float 1s ease-out forwards";
      heart.style.opacity = "0.7";
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1000);
    };

    const element = trailRef.current;
    element.addEventListener("mousemove", handleMouseMove);
    return () => element.removeEventListener("mousemove", handleMouseMove);
  }, [elX, elY, lastHeartTime]);

  return <div ref={trailRef} className="fixed inset-0 pointer-events-none" aria-hidden="true" />;
}

