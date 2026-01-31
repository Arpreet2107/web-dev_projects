"use client";

import React, { useState, useEffect } from "react";
import { Planet } from "@/src/components/Planet";
import { Orbit } from "@/src/components/Orbit";
import underLineImage from "@/src/assets/images/underline.svg?url";
import { SectionBorder } from "@/src/components/SectionBorder";
import { SectionContent } from "@/src/components/SectionContent";
import Button from "@/src/components/Button";
import { useSpring, useTransform, useMotionValue, motion } from "framer-motion";

// ✅ Define useMousePosition properly
export const useMousePosition = () => {
  const [innerWidth, setInnerWidth] = useState(1);
  const [innerHeight, setInnerHeight] = useState(1);
  const clientX = useMotionValue(0);
  const clientY = useMotionValue(0);
  const xProgress = useTransform(clientX, [0, innerWidth], [0, 1]);
  const yProgress = useTransform(clientY, [0, innerHeight], [0, 1]);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);

    const resizeHandler = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      clientX.set(e.clientX);
      clientY.set(e.clientY);
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    return () => window.removeEventListener("mousemove", mouseMoveHandler);
  }, []);

  return { xProgress, yProgress };
};

// ✅ Use useMousePosition inside CallToAction component
export const CallToAction = () => {
  const { xProgress, yProgress } = useMousePosition();
  const springX = useSpring(xProgress);
  const springY = useSpring(yProgress);

  const translateLargeX = useTransform(springX, [0, 1], ["-25%", "25%"]);
  const translateLargeY = useTransform(springY, [0, 1], ["-25%", "25%"]);

  const translateMediumX = useTransform(springX, [0, 1], ["-50%", "50%"]);
  const translateMediumY = useTransform(springY, [0, 1], ["-50%", "50%"]);

  const translateSmallX = useTransform(springX, [0, 1], ["-200%", "200%"]);
  const translateSmallY = useTransform(springY, [0, 1], ["-200%", "200%"]);

  return (
    <section>
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent className="relative isolate">
            {/* ✅ Fixed mask-image syntax */}
            <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_farthest-corner,var(--color-fuchsia-900)_50%, var(--color-indigo-900)_75%, transparent)] mask-image:radial-gradient(circle_farthest-side, black, transparent);" />
            <div className="absolute -z-10 inset-0">
              <Orbit className="size-[200px] absolute-center" />
              <Orbit className="size-[350px] absolute-center" />
              <Orbit className="size-[500px] absolute-center" />
              <Orbit className="size-[650px] absolute-center" />
              <Orbit className="size-[800px] absolute-center" />
              
              {/* ✅ Animated Planets */}
              <div className="absolute-center -z-10">
                <motion.div style={{ x: translateLargeX, y: translateLargeY }}>
                  <Planet size="lg" color="violet" className="translate-y-[200px] -translate-x-[200px] rotate-45" />
                </motion.div>
              </div>

              <div className="absolute-center -z-10">
                <motion.div style={{ x: translateLargeX, y: translateLargeY }}>
                  <Planet size="lg" color="violet" className="translate-x-[200px] -translate-y-[20px] -rotate-135" />
                </motion.div>
              </div>

              <div className="absolute-center -z-10">
                <motion.div style={{ x: translateMediumX, y: translateMediumY }}>
                  <Planet size="md" color="teal" className="-translate-x-[500px] -rotate-90" />
                </motion.div>
              </div>

              <div className="absolute-center -z-10">
                <motion.div style={{ x: translateMediumX, y: translateMediumY }}>
                  <Planet size="md" color="teal" className="translate-x-[500px] -translate-y-[10px] -rotate-135" />
                </motion.div>
              </div>

              <div className="absolute-center -z-10">
                <motion.div style={{ x: translateSmallX, y: translateSmallY }}>
                  <Planet size="sm" color="fuchsia" className="-translate-x-[400px] -translate-y-[250px] rotate-135" />
                </motion.div>
              </div>

              <div className="absolute-center -z-10">
                <motion.div style={{ x: translateSmallX, y: translateSmallY }}>
                  <Planet size="sm" color="fuchsia" className="translate-x-[400px] translate-y-[150px] -rotate-45" />
                </motion.div>
              </div>

              <div className="absolute-center -z-10">
                <motion.div style={{ x: translateMediumX, y: translateMediumY }}>
                  <Planet size="md" color="teal" className="-rotate-135" />
                </motion.div>
              </div>
            </div>

            <h2 className="text-gray-200 font-semibold text-3xl md:text-4xl lg:text-5xl max-w-3xl mx-auto text-center leading-tight">
              Join the AI Revolution with{" "}
              <span className="relative isolate">
                <span>Spehereal</span>
                <span
                  className="absolute top-full left-0 w-full -translate-y-1/2 h-4 bg-[linear-gradient(to_right,var(--color-amber-300),var(--color-teal-300), var(--color-violet-400), var(--color-fuchsia-400))]"
                  style={{
                    maskImage: `url(${underLineImage.src})`,
                    maskSize: "contain",
                    maskPosition: "top",
                    maskRepeat: "no-repeat",
                  }}
                />
              </span>
            </h2>

            <p className="text-center text-xl mt-8 max-w-2xl mx-auto">
              Experience the transformative power of AI with Sphereal. Boost your productivity and streamline your workflow with our innovative AI chat platform.
            </p>

            <div className="flex justify-center mt-10">
              <Button variant="secondary">Get Started</Button>
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};
