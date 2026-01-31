"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

export function ThreeHearts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const performance = useDevicePerformance();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (reducedMotion || performance === "low" || !containerRef.current) return;

    // Dynamically import Three.js only when needed
    import("three").then((THREE) => {
      if (!containerRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);

      // Create floating hearts
      const hearts: THREE.Mesh[] = [];
      const heartCount = performance === "high" ? 10 : 5;

      // Simple heart shape using extrude
      const heartShape = new THREE.Shape();
      heartShape.moveTo(0, 0);
      heartShape.bezierCurveTo(0, 0, -0.5, -0.5, -0.5, -1);
      heartShape.bezierCurveTo(-0.5, -1.5, 0, -1.5, 0, -1);
      heartShape.bezierCurveTo(0, -1.5, 0.5, -1.5, 0.5, -1);
      heartShape.bezierCurveTo(0.5, -0.5, 0, 0, 0, 0);

      const extrudeSettings = {
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
      };

      for (let i = 0; i < heartCount; i++) {
        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        const material = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0xec4899 : 0xa855f7,
          emissive: i % 2 === 0 ? 0xec4899 : 0xa855f7,
          emissiveIntensity: 0.5,
        });
        const heart = new THREE.Mesh(geometry, material);

        heart.position.x = (Math.random() - 0.5) * 10;
        heart.position.y = (Math.random() - 0.5) * 10;
        heart.position.z = (Math.random() - 0.5) * 5;
        heart.scale.setScalar(0.3 + Math.random() * 0.2);
        heart.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        hearts.push(heart);
        scene.add(heart);
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Mouse interaction
      const mouse = new THREE.Vector2();
      const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("mousemove", handleMouseMove);

      // Animation
      let animationId: number;
      const animate = () => {
        animationId = requestAnimationFrame(animate);

        hearts.forEach((heart, i) => {
          heart.rotation.x += 0.01;
          heart.rotation.y += 0.01;
          heart.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;

          // Parallax effect with mouse
          heart.position.x += (mouse.x * 0.5 - heart.position.x * 0.1) * 0.1;
          heart.position.y += (-mouse.y * 0.5 - heart.position.y * 0.1) * 0.1;
        });

        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        if (animationId) cancelAnimationFrame(animationId);
        renderer.dispose();
        if (containerRef.current && renderer.domElement.parentNode) {
          containerRef.current.removeChild(renderer.domElement);
        }
        hearts.forEach((heart) => {
          heart.geometry.dispose();
          (heart.material as THREE.Material).dispose();
        });
      };
    }).catch((error) => {
      console.error("Failed to load Three.js:", error);
    });
  }, [reducedMotion, performance, mounted]);

  if (reducedMotion || performance === "low" || !mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}

