import CompanyHero from "@/components/empresa/company-hero";
import MissionSection from "@/components/empresa/mission-section";
import StaffSection from "@/components/empresa/staff-section";
import BusinessLines from "@/components/empresa/business-lines";
import VivenPlusSection from "@/components/empresa/viven-plus-section";
import StatsSection from "@/components/empresa/stats-section";
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
      <MissionSection />
      <StaffSection />
      <BusinessLines />
      <VivenPlusSection />
      <StatsSection />
      <TeamSection />
      <ValuesSection />
      <CallToAction />
      <Footer />
    </main>
  );
}
