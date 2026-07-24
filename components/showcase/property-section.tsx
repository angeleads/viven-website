"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bed, Bath, Maximize, Euro, Phone, Info } from "lucide-react";
import type { Property } from "@/types/property";

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
              mejores ubicaciones directamente actualizadas desde el CRM.
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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No se han encontrado propiedades disponibles en este momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 6).map((property) => (
              <FeaturedPropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedPropertyCard({ property }: { property: Property }) {
  const [isHovered, setIsHovered] = useState(false);

  const mainImage = property.images?.[0] || property.image || "/placeholder.svg?height=400&width=600";
  const formattedPrice =
    typeof property.price === "number"
      ? property.price.toLocaleString("es-ES")
      : property.price || "Consulte";

  const agentName = property.agent?.name || "Cesar Sanjurjo";
  const agentPhoto = property.agent?.photo || "/placeholder.svg?height=200&width=200";
  const agentPhone = property.agent?.phone || "+34 667 881 370";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between h-full">
      <div>
        {/* Sección de Imagen con Hover Effect del Agente */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="aspect-w-16 aspect-h-10 relative overflow-hidden h-64 w-full">
            <Image
              src={mainImage}
              alt={property.title || "Inmueble"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              unoptimized={mainImage.startsWith("http")}
            />
          </div>

          {property.operationType && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider z-10">
              {property.operationType}
            </div>
          )}

          <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
            {formattedPrice} €
          </div>

          {/* Overlay del Agente en Hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-blue-900/95 to-blue-800/95 flex flex-col items-center justify-center p-6 transition-opacity duration-300 z-20 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white bg-gray-100">
                <Image
                  src={agentPhoto}
                  alt={agentName}
                  fill
                  className="object-cover"
                  unoptimized={agentPhoto.startsWith("http")}
                />
              </div>
              <h4 className="text-white font-bold text-base mb-1">{agentName}</h4>
              <p className="text-white/80 text-xs mb-3">Agente inmobiliario</p>

              <a
                href={`tel:${agentPhone.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-medium py-1.5 px-3 rounded-xl transition-colors text-sm"
              >
                <Phone size={14} />
                {agentPhone}
              </a>
            </div>
          </div>

          {/* Botón táctil para móviles */}
          <button
            className="md:hidden absolute bottom-4 right-4 bg-white/90 text-blue-600 p-2 rounded-full shadow-md z-10"
            onClick={() => setIsHovered(!isHovered)}
            type="button"
          >
            <Info size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
              {property.title || "Propiedad sin título"}
            </h3>
            <p className="text-lg font-bold text-blue-600 whitespace-nowrap flex items-center">
              <Euro size={16} className="inline mr-0.5" />
              {formattedPrice}
            </p>
          </div>

          <p className="text-gray-500 text-sm mb-4 line-clamp-1">
            {property.location || "Ubicación no especificada"}
          </p>

          <div className="flex justify-between text-gray-700 pt-4 border-t border-gray-100 text-sm">
            <div className="flex items-center">
              <Bed size={18} className="mr-1 text-gray-500" />
              <span>{property.beds ?? 0} hab.</span>
            </div>
            <div className="flex items-center">
              <Bath size={18} className="mr-1 text-gray-500" />
              <span>{property.baths ?? 0} bañ.</span>
            </div>
            <div className="flex items-center">
              <Maximize size={18} className="mr-1 text-gray-500" />
              <span>{property.area ?? 0} m²</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 mt-auto">
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