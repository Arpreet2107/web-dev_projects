"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { useReducedMotion } from "react-use";
import { detectLowEndDevice } from "@/lib/utils";

function Heart3D({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.5, 0.2, 8, 20]} />
      <meshStandardMaterial color="#FFB6E1" emissive="#FFB6E1" emissiveIntensity={0.5} />
    </mesh>
  );
}

export function ThreeDHearts() {
  const prefersReducedMotion = useReducedMotion();
  const isLowEnd = detectLowEndDevice();

  if (prefersReducedMotion || isLowEnd) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {[...Array(5)].map((_, i) => (
          <Heart3D
            key={i}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 5,
            ]}
          />
        ))}
      </Canvas>
    </div>
  );
}

