"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import Hero from "@/components/showcase/hero";
import PropertySection from "@/components/showcase/property-section";
import type { Property } from "@/types/property";

function getMostExpensive(list: Property[]): Property | null {
  if (!Array.isArray(list) || list.length === 0) return null;

  return list.reduce((max, item) => {
    const itemPrice = typeof item.price === "number" ? item.price : Number(item.price) || 0;
    const maxPrice = typeof max.price === "number" ? max.price : Number(max.price) || 0;
    return itemPrice > maxPrice ? item : max;
  }, list[0]);
}

export default function HomePropertiesBlock() {
  const locale = useLocale();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProperties() {
      try {
        const res = await fetch(`/api/properties?idioma=${encodeURIComponent(locale)}`);
        if (!res.ok) throw new Error(`Server returned code: ${res.status}`);

        const data = await res.json();
        if (isMounted) {
          setProperties(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching home properties:", error);
        if (isMounted) {
          setProperties([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  const featuredProperty = useMemo(() => getMostExpensive(properties), [properties]);

  return (
    <>
      <Hero featuredProperty={featuredProperty} loading={loading} />
      <PropertySection properties={properties} loading={loading} />
    </>
  );
}
