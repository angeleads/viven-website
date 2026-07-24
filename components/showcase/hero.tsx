"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Property } from "@/types/property";
import {
  ArrowRight,
  Building2,
  Award,
  MapPin,
  Sparkles,
  Bed,
  Bath,
  Maximize,
  Star,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";

interface HeroProps {
  featuredProperty?: Property | null;
  loading?: boolean;
}

// Propiedad por defecto si la API está vacía o fallase (Garantiza que SIEMPRE se muestre algo)
const DEFAULT_FEATURED: Property = {
  id: "featured-default",
  reference: "VIVEN-EXCLUSIV",
  title: "Ático Exclusivo con Terraza y Vistas al Mar",
  description: "Propiedad de alto standing en Vilanova i la Geltrú.",
  location: "Passeig Marítim, Vilanova i la Geltrú",
  locationDetail: "Passeig Marítim",
  price: 650000,
  image: "/pictures/venta-backround.png",
  images: ["/pictures/venta-backround.png"],
  beds: 4,
  baths: 3,
  area: 165,
  operationType: "Venta",
  date: new Date().toISOString(),
  features: ["Terraza", "Vistas al Mar", "Ascensor"],
  agency: "RE/MAX Viven",
  agencyPhone: "",
  agencyEmail: "",
  agent: { name: "RE/MAX Viven", phone: "", email: "", photo: "" },
};

// Función para calcular la propiedad con mayor precio
function getMostExpensive(list: Property[]): Property | null {
  if (!Array.isArray(list) || list.length === 0) return null;

  return list.reduce((max, item) => {
    const itemPrice =
      typeof item.price === "number"
        ? item.price
        : Number(item.price) || 0;

    const maxPrice =
      max && typeof max.price === "number"
        ? max.price
        : max
        ? Number(max.price) || 0
        : -1;

    return itemPrice > maxPrice ? item : max;
  }, list[0]);
}

// Formateador seguro de precio
function formatPrice(price?: number | string): string {
  if (price === undefined || price === null) return "Consulte precio";
  if (typeof price === "number") {
    return `${price.toLocaleString("es-ES")} €`;
  }
  const numeric = Number(price);
  if (!isNaN(numeric) && numeric > 0) {
    return `${numeric.toLocaleString("es-ES")} €`;
  }
  return String(price);
}

export default function Hero({
  featuredProperty: propProperty,
  loading: propLoading,
}: HeroProps) {
  const [fetchedProperty, setFetchedProperty] = useState<Property | null>(null);
  const [internalLoading, setInternalLoading] = useState<boolean>(false);

  // Si no se pasa featuredProperty por props, el Hero la busca por sí mismo en /api/properties
  useEffect(() => {
    if (!propProperty && propLoading === undefined) {
      setInternalLoading(true);
      fetch("/api/properties")
        .then((res) => {
          if (!res.ok) throw new Error("Error en respuesta API");
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const topProperty = getMostExpensive(data);
            if (topProperty) setFetchedProperty(topProperty);
          }
        })
        .catch((err) => {
          console.error("Error al obtener la propiedad más cara para el Hero:", err);
        })
        .finally(() => {
          setInternalLoading(false);
        });
    }
  }, [propProperty, propLoading]);

  // Selección final de la propiedad a renderizar
  const activeProperty = propProperty || fetchedProperty || DEFAULT_FEATURED;
  const isLoading = propLoading !== undefined ? propLoading : internalLoading;

  // Extraer valores formateados
  const title = activeProperty.title || "Inmueble Exclusivo";
  const location = activeProperty.location || "Vilanova i la Geltrú";
  const beds = activeProperty.beds ?? 0;
  const baths = activeProperty.baths ?? 0;
  const area = activeProperty.area ?? 0;
  const formattedPrice = formatPrice(activeProperty.price);

  const imageUrl =
    activeProperty.image ||
    activeProperty.images?.[0] ||
    "/pictures/venta-backround.png";

  const propertyLink = activeProperty.id && activeProperty.id !== "featured-default"
    ? `/propiedades/${activeProperty.id}`
    : "/venta";

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-20 lg:py-28">
      {/* Fondo con capas de gradiente y contraste */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: "url('/pictures/showcase-hero-background.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-blue-950/80 z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Resplandores ambientales */}
      <div className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-blue-600/25 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-red-600/15 rounded-full blur-3xl pointer-events-none z-10" />

      {/* Grid Principal */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* COLUMNA IZQUIERDA (7 columnas) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-medium shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Agencia Inmobiliaria de Referencia en Vilanova i la Geltrú</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Encuentra la propiedad de tus sueños con{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                Viven Inmobiliaria
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              Te guiamos en cada paso con un servicio exclusivo y personalizado en el Garraf. Encuentra tu nuevo hogar o vende tu inmueble al mejor precio del mercado.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/venta"
                className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base px-8 py-4 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Explorar Inmuebles
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-base px-8 py-4 rounded-xl border border-white/25 backdrop-blur-md hover:-translate-y-0.5 transition-all duration-300"
              >
                Vender mi Propiedad
              </Link>
            </div>

            {/* Métricas */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30">
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">+500</p>
                  <p className="text-xs text-slate-300">Inmuebles</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">El Garraf</p>
                  <p className="text-xs text-slate-300">Especialistas</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30">
                  <Award className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">100%</p>
                  <p className="text-xs text-slate-300">Asesorado</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Tarjeta de Inmueble Más Caro de la API (5 columnas) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {isLoading ? (
              /* Skeleton mientras carga la API */
              <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-2xl animate-pulse space-y-4">
                <div className="h-60 w-full bg-white/20 rounded-2xl" />
                <div className="h-4 w-1/3 bg-white/20 rounded" />
                <div className="h-6 w-3/4 bg-white/20 rounded" />
                <div className="h-4 w-1/2 bg-white/20 rounded" />
                <div className="h-10 w-full bg-white/20 rounded-xl mt-4" />
              </div>
            ) : (
              /* Tarjeta de Inmueble */
              <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-2xl space-y-4">
                
                {/* Fotografía principal y Precio */}
                <div className="relative h-60 w-full rounded-2xl overflow-hidden group bg-slate-900">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/pictures/venta-backround.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  <span className="absolute top-3 left-3 bg-amber-500/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1">
                    <Sparkles size={12} />
                    Propiedad Exclusiva
                  </span>

                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/20 text-white font-extrabold text-lg shadow-lg">
                    {formattedPrice}
                  </div>
                </div>

                {/* Detalles de la Propiedad */}
                <div className="space-y-3 px-1 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-sky-300 uppercase tracking-wider">
                      {activeProperty.operationType || "Venta"} · Ref. {activeProperty.reference}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>Destacado</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white line-clamp-1">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-300 flex items-center gap-1 line-clamp-1">
                    <MapPin size={14} className="text-blue-400 shrink-0" />
                    {location}
                  </p>

                  {/* Características */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-slate-200 text-xs font-medium">
                    {beds > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Bed size={15} className="text-blue-400" />
                        <span>{beds} Hab.</span>
                      </div>
                    )}
                    {baths > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Bath size={15} className="text-blue-400" />
                        <span>{baths} Baños</span>
                      </div>
                    )}
                    {area > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Maximize size={15} className="text-blue-400" />
                        <span>{area} m²</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={propertyLink}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-600 text-white font-medium text-sm py-2.5 rounded-xl border border-white/20 transition-all shadow-md"
                  >
                    Ver Ficha Completa
                  </Link>
                </div>
              </div>
            )}

            {/* Insignias Flotantes */}
            <div className="hidden sm:flex absolute -top-6 -right-4 bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl items-center gap-3 z-30">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs pr-2">
                <p className="font-bold text-white">Proceso 100% Seguro</p>
                <p className="text-slate-400">Garantía RE/MAX Viven</p>
              </div>
            </div>

            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl items-center gap-3 z-30">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="text-xs pr-2">
                <p className="font-bold text-white">Atención Inmediata</p>
                <p className="text-slate-400">Agentes locales disponibles</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-20" />
    </section>
  );
}