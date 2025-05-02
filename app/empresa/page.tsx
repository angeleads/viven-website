import CompanyHero from "@/components/empresa/company-hero";
import BusinessLines from "@/components/empresa/business-lines";
import TeamSection from "@/components/empresa/team-section";
import ValuesSection from "@/components/empresa/values-section";
import CallToAction from "@/components/empresa/call-to-action";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function EmpresaPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CompanyHero />
      <BusinessLines />
      <TeamSection />
      <ValuesSection />
      <CallToAction />
      <Footer />
    </main>
  );
}
