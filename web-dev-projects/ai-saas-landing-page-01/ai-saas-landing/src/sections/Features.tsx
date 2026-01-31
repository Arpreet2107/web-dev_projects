"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Image from "next/image"; 

import { SectionContent } from "@/src/components/SectionContent";
import { SectionBorder } from "@/src/components/SectionBorder";
import { Button } from "@/src/components/Button";
import { Orbit } from "@/src/components/Orbit";
import { Logo } from "@/src/components/Logo";

// ✅ Use Next.js public image paths
export const logos = [
  { src: "/images/slack-logo.png", alt: "Slack Logo", rotate: 0 },
  { src: "/images/docker-logo.png", alt: "Docker Logo", rotate: 45 },
  { src: "/images/figma-logo.png", alt: "Figma Logo", rotate: 90 },
  { src: "/images/github-logo.png", alt: "GitHub Logo", rotate: 135 },
  { src: "/images/vs-code-logo.png", alt: "VS Code Logo", rotate: 180 },
  { src: "/images/notion-logo.png", alt: "Notion Logo", rotate: 225 },
  { src: "/images/jira-logo.png", alt: "Jira Logo", rotate: 270 },
  { src: "/images/gcp-logo.png", alt: "GCP Logo", rotate: 315 },
];

export const features = [
  "Effortless integration",
  "Intelligent automation",
  "Robust security",
];

export const Features = () => {
  return (
    <section id="features">
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent className="md:px-20 lg:px-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Left Section */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-200 leading-tight">
                  Your AI-powered collaboration companion
                </h2>
                <ul className="mt-12 flex flex-col gap-8">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faCircleCheck} className="size-6 text-violet-400" />
                      <span className="text-xl font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-16">Try it now!</Button>
              </div>

              {/* Right Section */}
              <div className="flex justify-center">
                <div className="size-[270px] md:size-[450px] relative flex-shrink-0">
                  {/* Orbit Effects */}
                  <div className="absolute inset-0">
                    <Orbit className="size-full" />
                  </div>
                  <div className="absolute-center">
                    <Orbit className="size-[180px] md:size-[300px]" />
                  </div>
                  <div className="absolute-center">
                    <Logo className="size-4" />
                  </div>

                  {/* Animated Logos */}
                  {logos.map(({ src, alt, rotate }) => (
                    <motion.div
                      className="absolute inset-0"
                      key={alt}
                      initial={{ rotate }}
                      animate={{ rotate: rotate + 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    >
                      <motion.div
                        className="inline-flex size-10 md:size-14 items-center justify-center border border-[var(--color-border)] rounded-lg absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950"
                        initial={{ x: "-50%", y: "-50%", rotate: -rotate }}
                        animate={{ rotate: -rotate - 360 }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      >
                        <Image src={src} alt={alt} width={36} height={36} className="size-6 md:size-9" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Features;
