import ContactHero from "@/components/contact/contact-hero";
import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";
import ContactMap from "@/components/contact/contact-map";
import ContactCTA from "@/components/contact/contact-cta";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactoPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
      <ContactCTA />
      <Footer />
    </main>
  );
}
