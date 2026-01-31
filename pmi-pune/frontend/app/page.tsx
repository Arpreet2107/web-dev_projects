import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import TrustIndicatorBar from "./components/TrustIndicatorBar";
import FeaturedCertificationShowcase from "./components/FeaturedCertificationShowcase";
import DynamicEventsPreview from "./components/DynamicEventsPreview";
import MemberBenefitsHub from "./components/MemberBenefitsHub";
import LocalImpactSpotlight from "./components/LocalImpactSpotlight";
import PartnerEcosystem from "./components/PartnerEcosystem";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TrustIndicatorBar />
        <FeaturedCertificationShowcase />
        <DynamicEventsPreview />
        <MemberBenefitsHub />
        <LocalImpactSpotlight />
        <PartnerEcosystem />
      </main>
      <Footer />
    </div>
  );
}
