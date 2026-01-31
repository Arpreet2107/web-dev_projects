import {Header} from "@/src/sections/Header"
import {Hero} from "@/src/sections/Hero"
import {Companies} from "@/src/sections/Companies"
import {Features} from "@/src/sections/Features";
import {Pricing} from "@/src/sections/Pricing"
import {Testimonials} from '@/src/sections/Testimonials';
import {CallToAction} from '@/src/sections/CallToAction';
import {Footer} from '@/src/sections/Footer';
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Companies />
      <Features />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
