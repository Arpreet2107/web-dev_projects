'use client'

import { Orbit } from '@/src/components/Orbit'
import Loader from '@/src/assets/images/loader-animated.svg'
import underlineImage from "@/src/assets/images/underline.svg"
import { Button } from '@/src/components/Button'
import robotImg from '@/src/assets/images/robot.jpg'
import Image from 'next/image'
import { Planet } from '@/src/components/Planet'
import { SectionBorder } from '@/src/components/SectionBorder'
import { SectionContent } from '@/src/components/SectionContent'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export const useMousePosition = () => {
  const [innerWidth, setInnerWidth] = useState(1);
  const [innerHeight, setInnerHeight] = useState(1);
  const clientX = useMotionValue(0);
  const clientY = useMotionValue(0);
  const xProgress = useTransform(clientX, [0, innerWidth], [0, 1]);
  const yProgress = useTransform(clientY, [0, innerHeight], [0, 1]);

  useEffect(() => {
    const updateSize = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      clientX.set(e.clientX);
      clientY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { xProgress, yProgress };
};

export const Hero = () => {
  const { xProgress, yProgress } = useMousePosition();
  const sectionRef = useRef(null);

  const springX = useSpring(xProgress);
  const springY = useSpring(yProgress);

  const translateLargeX = useTransform(springX, [0, 1], ["-25%", "25%"]);
  const translateLargeY = useTransform(springY, [0, 1], ["-25%", "25%"]);

  const translateMediumX = useTransform(springX, [0, 1], ["-50%", "50%"]);
  const translateMediumY = useTransform(springY, [0, 1], ["-50%", "50%"]);

  const translateSmallX = useTransform(springX, [0, 1], ["-200%", "200%"]);
  const translateSmallY = useTransform(springY, [0, 1], ["-200%", "200%"]);

  const transformedY = useTransform(springY, [0, 1], ["-10%", "10%"]); // Re-added and utilized below

  return (
    <section ref={sectionRef}>
      <div className='container'>
        <SectionBorder>
          <SectionContent className='relative isolate'>
            <div className='absolute -z-10 inset-0 bg-[radial-gradient(circle_farthest-corner, var(--color-fuchsia-900) 50%, var(--color-indigo-900) 75%, transparent)]'></div>
            <div className='absolute inset-0 -z-10'>
              {[350, 600, 850, 1100, 1350].map((size, index) => (
                <div key={index} className='absolute-center'>
                  <Orbit className={`w-[${size}px] h-[${size}px]`} />
                </div>
              ))}
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-100 text-center leading-tight'>
              Unlock the Future of AI conversations with
              <span className="relative">
                <span> Sphereal </span>
                <span className="absolute w-full left-0 top-full -translate-y-1/2 h-4 bg-gradient-to-r from-amber-300 via-teal-300 via-violet-400 to-fuchsia-400"
                  style={{
                    maskImage: `url(${underlineImage.src})`,
                    maskSize: "contain",
                    maskPosition: 'center',
                    maskRepeat: 'no-repeat',
                  }}>
                </span>
              </span>
            </h1>

            <p className='text-center text-lg md:text-xl mt-8 max-w-3xl mx-auto'>
              Harness the power of AI with Sphereal. Elevate your productivity and streamline your workflow with our cutting-edge AI chat platform.
            </p>

            <div className='flex justify-center'>
              <Button variant='secondary' className='mt-10'>Start Chatting</Button>
            </div>

            <div className='relative isolate max-w-5xl mx-auto '>
              <div className='absolute left-1/2 top-0'>
                <motion.div style={{ x: translateLargeX, y: translateLargeY }}>
                  <Planet size='lg' color='violet' className='-translate-x-[316px] -translate-y-[76px] rotate-135' />
                </motion.div>
                <motion.div style={{ x: translateLargeX, y: translateLargeY }}>
                  <Planet size='lg' color='violet' className='-translate-y-[188px] translate-x-[334px] -rotate-135' />
                </motion.div>
                <motion.div style={{ x: translateSmallX, y: translateSmallY }}>
                  <Planet size='sm' color='fuchsia' className='-translate-y-[372px] -translate-x-[508px] rotate-135' />
                </motion.div>
                <motion.div style={{ x: translateMediumX, y: translateMediumY }}>
                  <Planet size='md' color='teal' className='-translate-y-[342px] translate-x-[488px] -rotate-135' />
                </motion.div>
              </div>

              <motion.div style={{ y: transformedY }} className="relative mt-20 rounded-2xl border-2 overflow-hidden border-gradient">
                <Image src={robotImg} alt='Robot Image' />
                <div className="absolute bottom-2 md:bottom-4 lg:bottom-10 left-1/2 -translate-x-1/2 w-full px-4">
                  <div className='bg-gray-950/80 flex items-center gap-4 px-4 py-2 rounded-xl'>
                    <Image src={Loader} alt="Loading" className='w-6 h-6 text-violet-400' />
                    <div className='font-semibold text-xl text-gray-100'>AI is generating <span className='animate-cursor-blink'>|</span></div>
                  </div>
                </div>
              </motion.div>

            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};
