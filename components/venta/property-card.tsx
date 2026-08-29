"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Bed, Bath, Maximize, Euro, Phone, Info, User } from "lucide-react";
import type { Property } from "@/types/property";
import { mapInmovillaToProperty } from "@/lib/format-property";
import { useLocale, useTranslations } from "next-intl";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property: rawProperty }: PropertyCardProps) {
  const t = useTranslations("venta.propertyCard");
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);

  // Mapeo seguro dinámico
  const property = mapInmovillaToProperty(rawProperty);

  const formattedPrice =
    typeof property.price === "number"
      ? property.price.toLocaleString(
          locale === "ca" ? "ca-ES" : locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "es-ES"
        )
      : property.price || t("fallbacks.consultPrice");

  const agent = property.agent;
  const agentName = agent?.name || property.agency || t("fallbacks.defaultAgency");
  const agentPhone = agent?.phone || "";
  const agentPhoto = agent?.photo || "";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative h-full flex flex-col justify-between">
      <div>
        {/* Sección de Imagen con Hover Effect del Agente */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="aspect-w-16 aspect-h-10 relative overflow-hidden h-48 w-full">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              unoptimized={property.image.startsWith("http")}
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
            <div className="text-center w-full">
              <div className="relative w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white bg-blue-100 flex items-center justify-center">
                {agentPhoto ? (
                  <Image
                    src={agentPhoto}
                    alt={agentName}
                    fill
                    className="object-cover"
                    unoptimized={agentPhoto.startsWith("http")}
                  />
                ) : (
                  <User size={36} className="text-blue-600" />
                )}
              </div>
              <h4 className="text-white font-bold text-base line-clamp-1">
                {agentName}
              </h4>
              <p className="text-white/80 text-xs mb-3">{t("agentLabel")}</p>

              {agentPhone ? (
                <a
                  href={`tel:${agentPhone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-medium py-1.5 px-3 rounded-xl transition-colors text-sm"
                >
                  <Phone size={14} />
                  {agentPhone}
                </a>
              ) : (
                <span className="text-white/70 text-xs">{t("fallbacks.defaultAgency")}</span>
              )}
            </div>
          </div>

          {/* Botón táctil para dispositivos móviles */}
          <button
            className="md:hidden absolute bottom-4 right-4 bg-white/90 text-blue-600 p-2 rounded-full shadow-md z-10"
            onClick={() => setIsHovered(!isHovered)}
            type="button"
            aria-label={t("actions.toggleAgentInfo")}
          >
            <Info size={18} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
            <p className="text-lg font-bold text-blue-600 whitespace-nowrap flex items-center">
              <Euro size={18} className="inline mr-1" />
              {formattedPrice}
            </p>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-1 text-sm">
            {property.location}
          </p>

          <div className="flex justify-between text-gray-700 text-sm">
            <div className="flex items-center">
              <Bed size={16} className="mr-1 text-gray-500" />
              <span>{property.beds} {t("units.beds")}</span>
            </div>
            <div className="flex items-center">
              <Bath size={16} className="mr-1 text-gray-500" />
              <span>{property.baths} {t("units.baths")}</span>
            </div>
            <div className="flex items-center">
              <Maximize size={16} className="mr-1 text-gray-500" />
              <span>{property.area} {t("units.area")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 mt-auto">
        <Link
          href={`/propiedades/${property.id}`}
          className="block w-full text-center bg-gray-100 hover:bg-black hover:text-white text-gray-800 font-medium py-2 rounded-xl transition-colors duration-300 text-sm"
        >
          {t("actions.viewDetails")}
        </Link>
      </div>
    </div>
  );
}