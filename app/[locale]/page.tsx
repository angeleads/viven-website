import Navbar from "@/components/navbar";
import HomePropertiesBlock from "@/components/showcase/home-properties-block";
import ServicesSection from "@/components/showcase/services-section";
import RemaxStatsSection from "@/components/showcase/remax-stats-section";
import PartnersSection from "@/components/showcase/partners-section";
import ContactSection from "@/components/showcase/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HomePropertiesBlock />
      <RemaxStatsSection />
      <ServicesSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
