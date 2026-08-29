import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/comunidades/hero";
import Percentages from "@/components/comunidades/percentages";
import Services from "@/components/comunidades/services";
import Contact from "@/components/comunidades/contact";
import App from "@/components/comunidades/app";
import ContactForm from "@/components/contact/contact-form";

export default function ComunidadesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Percentages />
      <Services />
      <Contact />
      <App />
      <ContactForm />
      <Footer />
    </main>
  );
}
