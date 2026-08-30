"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import Hero from "@/components/showcase/hero";
import PropertySection from "@/components/showcase/property-section";
import type { Property } from "@/types/property";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Selecciona hasta 6 propiedades para el Home:
 * 1. Prioriza "destacado === 2" (Estrella / Outstanding star).
 * 2. Si hay menos de 6, completa con "destacado === 1".
 * 3. Si aún hay menos de 6, completa aleatoriamente con el resto.
 */
export function selectShowcaseProperties(list: Property[], limit = 6): Property[] {
  if (!Array.isArray(list) || list.length === 0) return [];

  const outstanding = list.filter((p) => Number(p.destacado) === 2);
  const featured = list.filter((p) => Number(p.destacado) === 1);
  const others = list.filter(
    (p) => Number(p.destacado) !== 2 && Number(p.destacado) !== 1
  );

  if (outstanding.length >= limit) {
    return outstanding.slice(0, limit);
  }

  const selected: Property[] = [...outstanding];

  if (selected.length < limit && featured.length > 0) {
    const shuffledFeatured = shuffleArray(featured);
    const needed = limit - selected.length;
    selected.push(...shuffledFeatured.slice(0, needed));
  }

  if (selected.length < limit && others.length > 0) {
    const shuffledOthers = shuffleArray(others);
    const needed = limit - selected.length;
    selected.push(...shuffledOthers.slice(0, needed));
  }

  return selected.slice(0, limit);
}

/**
 * Selecciona la propiedad destacada principal para el Hero de la Home
 */
export function selectFeaturedHeroProperty(list: Property[]): Property | null {
  if (!Array.isArray(list) || list.length === 0) return null;

  const getPrice = (item: Property) =>
    typeof item.price === "number" ? item.price : Number(item.price) || 0;

  const outstanding = list.filter((p) => Number(p.destacado) === 2);
  if (outstanding.length > 0) {
    return outstanding.reduce(
      (max, item) => (getPrice(item) > getPrice(max) ? item : max),
      outstanding[0]
    );
  }

  const featured = list.filter((p) => Number(p.destacado) === 1);
  if (featured.length > 0) {
    return featured.reduce(
      (max, item) => (getPrice(item) > getPrice(max) ? item : max),
      featured[0]
    );
  }

  return list.reduce(
    (max, item) => (getPrice(item) > getPrice(max) ? item : max),
    list[0]
  );
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

  const showcaseProperties = useMemo(
    () => selectShowcaseProperties(properties, 6),
    [properties]
  );

  const featuredProperty = useMemo(
    () => selectFeaturedHeroProperty(properties),
    [properties]
  );

  return (
    <>
      <Hero featuredProperty={featuredProperty} loading={loading} />
      <PropertySection properties={showcaseProperties} loading={loading} />
    </>
  );
}
