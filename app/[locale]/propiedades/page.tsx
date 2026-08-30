"use client";

import { useEffect, useState, useMemo } from "react";
import { useLocale } from "next-intl";
import Hero from "@/components/venta/hero";
import PropertyGrid from "@/components/venta/property-grid";
import PropertiesMapExplorer from "@/components/venta/properties-map-explorer";
import Pagination from "@/components/venta/pagination";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Property } from "@/types/property";
import {
  FilterState,
  INITIAL_FILTERS,
  getFilterOptions,
  filterProperties,
} from "@/lib/property-filters";

export default function PropiedadesPage() {
  const locale = useLocale();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estado de los Filtros
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  useEffect(() => {
    let isMounted = true;

    async function getProperties() {
      try {
        setLoading(true);
        const res = await fetch(`/api/properties?idioma=${encodeURIComponent(locale)}`);

        if (!res.ok) {
          throw new Error(`Server returned code: ${res.status}`);
        }

        const data = await res.json();

        if (isMounted) {
          setProperties(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err: any) {
        console.error("Error client-fetching properties:", err);
        if (isMounted) {
          setError("No se pudieron cargar las propiedades. Inténtalo de nuevo más tarde.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    getProperties();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  // 1. Extrae dinámicamente las ciudades, zonas y tipos de las propiedades cargadas
  const { cities, zones, propertyTypes } = useMemo(() => {
    return getFilterOptions(properties);
  }, [properties]);

  // 2. Filtra la lista de propiedades en tiempo real en función de la selección
  const filteredProperties = useMemo(() => {
    return filterProperties(properties, filters);
  }, [properties, filters]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <Hero
        filters={filters}
        setFilters={setFilters}
        availableCities={cities}
        availableZones={zones}
        availableTypes={propertyTypes}
        onReset={handleResetFilters}
      />

      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 animate-pulse text-sm">
              Conectando con el catálogo de prioridades...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600 font-medium">{error}</div>
        ) : (
          <>
            <PropertyGrid properties={filteredProperties} />
            <PropertiesMapExplorer properties={properties} />
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
