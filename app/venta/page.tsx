import Hero from "@/components/venta/hero"
import PropertyGrid from "@/components/venta/property-grid"
import Pagination from "@/components/venta/pagination"

export default function VentaPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PropertyGrid />
      <Pagination currentPage={1} totalPages={5} />
    </main>
  )
}
