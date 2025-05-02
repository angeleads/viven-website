import Hero from "@/components/venta/hero"
import PropertyGrid from "@/components/venta/property-grid"
import Pagination from "@/components/venta/pagination"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function VentaPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PropertyGrid />
      <Pagination currentPage={1} totalPages={5} />
      <Footer />
    </main>
  )
}
