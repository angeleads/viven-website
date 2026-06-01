"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/venta/hero";
import PropertyGrid from "@/components/venta/property-grid";
import Pagination from "@/components/venta/pagination";
import Footer from "@/components/footer";
import { Property } from "@/types/property";

export default function VentaPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadAllProperties() {
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error("Error cargando propiedades en sección venta:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAllProperties();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        /* Le pasamos las propiedades reales directamente al componente Grid */
        <PropertyGrid properties={properties} />
      )}

      {/* Paginación opcional: por ahora muestra 1 de 1 ya que cargamos las 28 de golpe */}
      {!loading && properties.length > 0 && (
        <Pagination currentPage={1} totalPages={1} />
      )}
      
      <Footer />
    </main>
  );
}