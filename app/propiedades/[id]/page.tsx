"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Bath,
  Maximize,
  Euro,
  MapPin,
  ChevronLeft,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  ShieldCheck,
  User,
  Building,
  Check,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { Property } from "@/types/property";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          throw new Error("No se pudo encontrar la información de la propiedad");
        }
        const data: Property = await res.json();
        setProperty(data);
        setActiveImage(data.image || data.images?.[0] || "/placeholder.svg?height=600&width=800");
      } catch (err: any) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Oops! Propiedad no encontrada
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          {error || "La propiedad solicitada no existe o el feed no está disponible."}
        </p>
        <Link
          href="/venta"
          className="inline-flex items-center text-white bg-blue-600 px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft size={18} className="mr-1" /> Volver al listado
        </Link>
      </div>
    );
  }

  const formattedDescription = property.description
    ? property.description.replaceAll("~~", "\n\n")
    : "Sin descripción disponible.";

  // Agente
  const agent = property.agent;
  const agentName = agent?.name || property.agency || "RE/MAX Viven";
  const agentPhone = agent?.phone || "";
  const agentEmail = agent?.email || "";
  const agentPhoto = agent?.photo || "";

  // Datos para la tabla detallada de características
  const specDetails = [
    { label: "Referencia", value: property.reference },
    { label: "Tipo Operación", value: property.operationType },
    { label: "Tipo de Propiedad", value: property.propertyType || "Inmueble" },
    { label: "Zona / Ciudad", value: property.location },
    { label: "Superficie Útil", value: property.usefulArea ? `${property.usefulArea} m²` : "-" },
    { label: "Superficie Construida", value: property.builtArea ? `${property.builtArea} m²` : `${property.area} m²` },
    { label: "Conservación", value: property.conservation || "No especificado" },
    { label: "Habitaciones", value: property.beds },
    { label: "Baños", value: property.baths },
    { label: "Distancia al mar", value: property.distMar || "-" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <Navbar />

      <div className="container mx-auto px-4 max-w-7xl">
        <Link
          href="/venta"
          className="inline-flex items-center text-gray-600 hover:text-black font-medium mt-8 mb-8 transition-colors group"
        >
          <ChevronLeft
            size={20}
            className="mr-1 group-hover:-translate-x-1 transition-transform"
          />
          Volver al listado de propiedades
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              {property.operationType} · Ref: {property.reference}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              {property.title}
            </h1>
            <p className="text-lg text-gray-600 flex items-center">
              <MapPin size={18} className="text-blue-600 mr-2 shrink-0" />
              {property.locationDetail ? `${property.locationDetail}, ` : ""}
              {property.location}
            </p>
          </div>

          <div className="text-left md:text-right bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[220px]">
            <p className="text-sm text-gray-500 font-medium">Precio de operación</p>
            <p className="text-3xl font-black text-blue-600 flex items-center md:justify-end mt-0.5">
              <Euro size={28} className="mr-1" />
              {typeof property.price === "number"
                ? property.price.toLocaleString("es-ES")
                : property.price}
            </p>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Galería de imágenes */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 h-[300px] md:h-[480px]">
                <Image
                  src={activeImage}
                  alt={property.title}
                  fill
                  priority
                  className="object-cover"
                  unoptimized={activeImage.startsWith("http")}
                />
              </div>

              {property.images && property.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 transition-all border-2 ${
                        activeImage === img
                          ? "border-blue-600 scale-95"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Miniatura ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized={img.startsWith("http")}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ficha técnica rápida */}
            <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="flex flex-col items-center py-2 border-r border-gray-100">
                <Bed size={24} className="text-blue-600 mb-2" />
                <span className="text-sm text-gray-500 font-medium">Dormitorios</span>
                <span className="text-lg font-bold text-gray-900 mt-0.5">{property.beds}</span>
              </div>
              <div className="flex flex-col items-center py-2 border-r border-gray-100">
                <Bath size={24} className="text-blue-600 mb-2" />
                <span className="text-sm text-gray-500 font-medium">Baños</span>
                <span className="text-lg font-bold text-gray-900 mt-0.5">{property.baths}</span>
              </div>
              <div className="flex flex-col items-center py-2">
                <Maximize size={24} className="text-blue-600 mb-2" />
                <span className="text-sm text-gray-500 font-medium">Superficie</span>
                <span className="text-lg font-bold text-gray-900 mt-0.5">{property.area} m²</span>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                <FileText size={20} className="text-blue-600 mr-2" />
                Descripción de la propiedad
              </h3>
              <div className="text-gray-600 leading-relaxed space-y-4 whitespace-pre-line text-justify">
                {formattedDescription}
              </div>
            </div>

            {/* Ficha completa de Datos y Especificaciones (Como en CRM Inmovilla) */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Building size={20} className="text-blue-600 mr-2" />
                Características y Cualidades
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {specDetails.map((detail, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-gray-50/80" : "bg-white"}
                      >
                        <td className="py-3 px-4 font-semibold text-gray-700 text-sm w-1/2 border-b border-gray-100">
                          {detail.label}
                        </td>
                        <td className="py-3 px-4 text-gray-900 text-sm border-b border-gray-100">
                          {detail.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lista de Equipamiento y Comodidades (Checklist) */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                  <ShieldCheck size={20} className="text-blue-600 mr-2" />
                  Equipamiento y Servicios
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 shrink-0">
                        <Check size={12} className="text-white stroke-[3]" />
                      </div>
                      <span className="text-sm font-medium capitalize">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tarjeta Agente */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User size={18} className="text-blue-600 mr-2" />
                Contacto del Agente
              </h4>

              <div className="p-4 bg-blue-50/50 rounded-xl mb-6 border border-blue-100/50 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shrink-0 bg-blue-100 flex items-center justify-center">
                  {agentPhoto ? (
                    <Image
                      src={agentPhoto}
                      alt={agentName}
                      fill
                      className="object-cover"
                      unoptimized={agentPhoto.startsWith("http")}
                    />
                  ) : (
                    <User size={28} className="text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-base font-extrabold text-blue-900 leading-snug">
                    {agentName}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    {property.agency || "RE/MAX Viven"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {agentPhone && (
                  <a
                    href={`tel:${agentPhone.replace(/\s+/g, "")}`}
                    className="flex items-center w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors border border-gray-100"
                  >
                    <Phone size={18} className="text-blue-600 mr-3 shrink-0" />
                    <span className="text-sm">{agentPhone}</span>
                  </a>
                )}
                {agentEmail && (
                  <a
                    href={`mailto:${agentEmail}`}
                    className="flex items-center w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors border border-gray-100 break-all"
                  >
                    <Mail size={18} className="text-blue-600 mr-3 shrink-0" />
                    <span className="text-sm">{agentEmail}</span>
                  </a>
                )}
              </div>

              <hr className="border-gray-100 my-4" />

              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <p className="text-sm font-bold text-gray-800 mb-2">Solicitar información</p>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-gray-900"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-gray-900"
                />
                <textarea
                  rows={3}
                  defaultValue={`Hola, estoy interesado en el inmueble con Referencia ${property.reference}. Me gustaría recibir más detalles.`}
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-gray-900 resize-none"
                />
                <button
                  type="submit"
                  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}