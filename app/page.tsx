import Hero from "@/components/showcase/hero";
import Navbar from "@/components/navbar";
import PropertySection from "@/components/showcase/property-section";
import ServicesSection from "@/components/showcase/services-section";
import AppSection from "@/components/showcase/app-section";
import AboutSection from "@/components/showcase/about-section";
import PartnersSection from "@/components/showcase/partners-section";
import ContactSection from "@/components/showcase/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PropertySection />
      <AppSection />
      <ServicesSection />
      <AboutSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
