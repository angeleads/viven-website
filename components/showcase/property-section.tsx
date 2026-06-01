"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bed, Bath, Maximize, Euro } from "lucide-react";
import { Property } from "@/types/property";

export default function PropertySection() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const res = await fetch("/api/properties");
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error("Error al obtener las propiedades de la API:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Propiedades destacadas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Descubre nuestra selección de propiedades exclusivas en las
              mejores ubicaciones de España directamente actualizadas.
            </p>
          </div>
          <Link
            href="/venta"
            className="mt-6 md:mt-0 inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            Ver todas las propiedades
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        {loading ? (
          // Spinner de carga simple y limpio
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No se han encontrado propiedades disponibles en este momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 6).map(
              (
                property, // 👈 Corta el array para mostrar máximo 6
              ) => (
                <PropertyCard key={property.id} property={property} />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group flex flex-col h-full">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-10 relative overflow-hidden h-64 w-full">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized={property.image.startsWith("http")} // Evita errores de dominios externos no configurados en next.config.js
          />
        </div>
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full capitalize">
          {property.type}
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {property.title}
            </h3>
            <p className="text-lg font-bold text-blue-600 whitespace-nowrap flex items-center">
              <Euro size={16} className="inline mr-0.5" />
              {property.price.toLocaleString("es-ES")}
            </p>
          </div>

          <p className="text-gray-500 text-sm mb-4 uppercase tracking-wider font-semibold">
            {property.location}
          </p>
        </div>

        <div className="flex justify-between text-gray-700 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Bed size={18} className="mr-1 text-gray-500" />
            <span>{property.beds} hab.</span>
          </div>
          <div className="flex items-center">
            <Bath size={18} className="mr-1 text-gray-500" />
            <span>{property.baths} bañ.</span>
          </div>
          <div className="flex items-center">
            <Maximize size={18} className="mr-1 text-gray-500" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Link
          href={`/propiedades/${property.id}`}
          className="block w-full text-center bg-gray-100 hover:bg-black hover:text-white text-gray-800 font-medium py-2.5 rounded-xl transition-colors duration-300"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
