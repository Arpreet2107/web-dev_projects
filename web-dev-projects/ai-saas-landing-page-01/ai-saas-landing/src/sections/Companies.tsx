'use client'

import Image from 'next/image';
import AcmeCorpLogo from "@/src/assets/images/acme-corp-logo.svg";
import EchoValleyLogo from "@/src/assets/images/echo-valley-logo.svg";
import QuantumLogo from "@/src/assets/images/quantum-logo.svg";
import PulseLogo from "@/src/assets/images/pulse-logo.svg";
import OutsideLogo from "@/src/assets/images/outside-logo.svg";
import CelestialLogo from "@/src/assets/images/celestial-logo.svg";
import { SectionBorder } from "@/src/components/SectionBorder";
import { SectionContent } from '@/src/components/SectionContent';
import { motion } from 'framer-motion';

// Companies Data
export const companies = [
  { name: "Acme Corp", logo: AcmeCorpLogo },
  { name: "Echo Valley", logo: EchoValleyLogo },
  { name: "Quantum", logo: QuantumLogo },
  { name: "Pulse", logo: PulseLogo },
  { name: "Outside", logo: OutsideLogo },
  { name: "Celestial", logo: CelestialLogo },
];

export const Companies = () => {
  return (
    <section>
      <div className="container">
        <SectionBorder>
          <SectionContent className="!pt-0">
            <h2 className="text-center text-xs font-bold uppercase tracking-widest text-gray-500">
              Empowering creators at leading companies
            </h2>

            <div className="flex mt-20 overflow-x-hidden -mx-4 lg:-mx-8">
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 10,
                }}
                className="flex flex-none gap-18 md:gap-36 px-9 md:px-18"
              >
                {[...companies, ...companies].map(({ logo, name }, arrIndex) => (
                  <div key={arrIndex} className="flex-shrink-0">
                    <Image src={logo} alt={`${name} Logo`} className="h-8 w-auto" />
                  </div>
                ))}
              </motion.div>
            </div>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Companies;
