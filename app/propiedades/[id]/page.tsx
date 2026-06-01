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
  Building,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Property } from "@/types/property";

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
          throw new Error(
            "No se pudo encontrar la información de la propiedad",
          );
        }
        const data = await res.json();
        setProperty(data);
        setActiveImage(data.image);
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
          {error ||
            "La propiedad solicitada no existe o el feed no está disponible."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-white bg-blue-600 px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft size={18} className="mr-1" /> Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <Navbar />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Botón de retorno */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-black font-medium mt-8 mb-8 transition-colors group"
        >
          <ChevronLeft
            size={20}
            className="mr-1 group-hover:-translate-x-1 transition-transform"
          />
          Volver al listado de propiedades
        </Link>

        {/* Encabezado Principal */}
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

          <div className="text-left md:text-right bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[200px]">
            <p className="text-sm text-gray-500 font-medium">Precio de venta</p>
            <p className="text-3xl font-black text-blue-600 flex items-center md:justify-end mt-0.5">
              <Euro size={28} className="mr-1" />
              {property.price.toLocaleString("es-ES")}
            </p>
          </div>
        </div>

        {/* Sección de Layout Principal: Galería e Información a la izquierda, Contacto a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda (2/3 de ancho) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galería de Imágenes Interactiva */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 h-[300px] md:h-[450px]">
                <Image
                  src={activeImage}
                  alt={property.title}
                  fill
                  priority
                  className="object-cover"
                  unoptimized={activeImage.startsWith("http")}
                />
              </div>

              {/* Carrusel de Miniaturas */}
              {property.images.length > 1 && (
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

            {/* Características Básicas (Fila de píldoras técnicas) */}
            <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="flex flex-col items-center py-2 border-r border-gray-100">
                <Bed size={24} className="text-blue-600 mb-2" />
                <span className="text-sm text-gray-500 font-medium">
                  Dormitorios
                </span>
                <span className="text-lg font-bold text-gray-900 mt-0.5">
                  {property.beds}
                </span>
              </div>
              <div className="flex flex-col items-center py-2 border-r border-gray-100">
                <Bath size={24} className="text-blue-600 mb-2" />
                <span className="text-sm text-gray-500 font-medium">Baños</span>
                <span className="text-lg font-bold text-gray-900 mt-0.5">
                  {property.baths}
                </span>
              </div>
              <div className="flex flex-col items-center py-2">
                <Maximize size={24} className="text-blue-600 mb-2" />
                <span className="text-sm text-gray-500 font-medium">
                  Superficie
                </span>
                <span className="text-lg font-bold text-gray-900 mt-0.5">
                  {property.area} m²
                </span>
              </div>
            </div>

            {/* Descripción Completa */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                <FileText size={20} className="text-blue-600 mr-2" />
                Descripción de la propiedad
              </h3>
              <div className="text-gray-600 leading-relaxed space-y-4 whitespace-pre-line text-justify">
                {property.description ||
                  "No hay una descripción extendida disponible para este inmueble."}
              </div>
            </div>

            {/* Características Extras (Features del XML) */}
            {property.features.length > 0 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                  <ShieldCheck size={20} className="text-blue-600 mr-2" />
                  Características y Comodidades
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-gray-700 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100"
                    >
                      <CheckCircle
                        size={16}
                        className="text-green-500 mr-2 shrink-0"
                      />
                      <span className="text-sm font-medium capitalize">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha (Formulario / Tarjeta de Contacto Real) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Building size={18} className="text-blue-600 mr-2" />
                Agencia Responsable
              </h4>

              <div className="p-4 bg-blue-50/50 rounded-xl mb-6 border border-blue-100/50">
                <p className="text-base font-extrabold text-blue-900 tracking-wide uppercase">
                  {property.agency}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Garantía de gestión profesional
                </p>
              </div>

              {/* Datos de contacto interactivos */}
              <div className="space-y-3 mb-6">
                {property.agencyPhone && (
                  <a
                    href={`tel:${property.agencyPhone}`}
                    className="flex items-center w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors border border-gray-100"
                  >
                    <Phone size={18} className="text-blue-600 mr-3 shrink-0" />
                    <span className="text-sm">{property.agencyPhone}</span>
                  </a>
                )}
                {property.agencyEmail && (
                  <a
                    href={`mailto:${property.agencyEmail}`}
                    className="flex items-center w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors border border-gray-100 break-all"
                  >
                    <Mail size={18} className="text-blue-600 mr-3 shrink-0" />
                    <span className="text-sm">{property.agencyEmail}</span>
                  </a>
                )}
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Formulario rápido para el cliente */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <p className="text-sm font-bold text-gray-800 mb-2">
                  Solicitar más información
                </p>
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
                  Contactar con Agente
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
