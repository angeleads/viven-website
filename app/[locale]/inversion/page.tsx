import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import HeroSection from "@/components/inversion/hero-section";
import AboutSection from "@/components/inversion/about-section";
import ValuesSection from "@/components/inversion/value-section";
import ProductsSection from "@/components/inversion/products-section";
import StatsSection from "@/components/inversion/stats-section";
import HowItWorksSection from "@/components/inversion/how-it-works-section";
import ProcessSection from "@/components/inversion/process-section";
import TeamSection from "@/components/inversion/team-section";

export const metadata = {
  title: "Inversión Inmobiliaria | Viven Capital",
  description: "Invierte en activos inmobiliarios en las principales ciudades de España con rentabilidades del 10% al 26%.",
};

export default function InversionPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <ProductsSection />
      <StatsSection />
      <HowItWorksSection />
      <ProcessSection />
      <TeamSection />
      <Footer />
    </main>
  );
}