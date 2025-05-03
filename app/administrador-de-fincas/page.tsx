import Hero from "@/components/administrador-de-fincas/hero";
import AppSection from "@/components/showcase/app-section";
import ServicesSection from "@/components/administrador-de-fincas/services-section";
import InvestmentSection from "@/components/administrador-de-fincas/investment-section";
import CoverageSection from "@/components/administrador-de-fincas/coverage-section";
import CommunityManagementSection from "@/components/administrador-de-fincas/community-management-section";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AppSection />
      <ServicesSection />
      <CommunityManagementSection />
      <InvestmentSection />
      <CoverageSection />
      <Footer />
    </main>
  );
}
