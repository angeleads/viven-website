"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { Property } from "@/types/property";
import PropertyCard from "@/components/venta/property-card";

interface PropertySectionProps {
  properties?: Property[];
  loading?: boolean;
}

export default function PropertySection({
  properties: initialProperties,
  loading: initialLoading,
}: PropertySectionProps = {}) {
  const locale = useLocale();
  const t = useTranslations("showcase.propertySection");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const hasInjectedData = Array.isArray(initialProperties);

  useEffect(() => {
    if (hasInjectedData) {
      setProperties(initialProperties || []);
      setLoading(initialLoading ?? false);
      return;
    }

    async function loadProperties() {
      try {
        const res = await fetch(`/api/properties?idioma=${encodeURIComponent(locale)}`);
        if (res.ok) {
          const data = await res.json();
          setProperties(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching properties from API:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, [locale, hasInjectedData, initialProperties, initialLoading]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {t("description")}
            </p>
          </div>
          <Link
            href="/propiedades"
            className="mt-6 md:mt-0 inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            {t("viewAll")}
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {t("empty")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 6).map((property, index) => {
              const uniqueKey =
                property.id ||
                (property as any).cod_ofer ||
                (property as any).ref ||
                index;

              return <PropertyCard key={uniqueKey} property={property} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}
