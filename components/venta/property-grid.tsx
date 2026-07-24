"use client";

import { useState, useMemo } from "react";
import { Property } from "@/types/property";
import PropertyCard from "./property-card";

interface PropertyGridProps {
  properties: Property[];
}

// Helper para convertir el precio (number | string) a número seguro para ordenar
function getNumericPrice(price: number | string): number {
  if (typeof price === "number") return price;
  const parsed = Number(price);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const [sortBy, setSortBy] = useState<string>("Más recientes");

  const sortedProperties = useMemo(() => {
    if (!Array.isArray(properties)) return [];
    const propertiesCopy = [...properties];

    switch (sortBy) {
      case "Precio: menor a mayor":
        return propertiesCopy.sort(
          (a, b) => getNumericPrice(a.price) - getNumericPrice(b.price)
        );

      case "Precio: mayor a menor":
        return propertiesCopy.sort(
          (a, b) => getNumericPrice(b.price) - getNumericPrice(a.price)
        );

      case "Superficie":
        // Ordena de mayor a menor superficie (m²)
        return propertiesCopy.sort((a, b) => (b.area || 0) - (a.area || 0));

      case "Más recientes":
      default:
        return propertiesCopy.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA; // De más reciente a más antigua
        });
    }
  }, [properties, sortBy]);

  const totalCount = Array.isArray(properties) ? properties.length : 0;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Propiedades disponibles
            </h2>
            <p className="text-gray-600">
              Mostrando {sortedProperties.length} de {totalCount} propiedades
            </p>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            <label className="text-gray-700 font-medium whitespace-nowrap">
              Ordenar por:
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 cursor-pointer"
            >
              <option value="Más recientes">Más recientes</option>
              <option value="Precio: menor a mayor">
                Precio: menor a mayor
              </option>
              <option value="Precio: mayor a menor">
                Precio: mayor a menor
              </option>
              <option value="Superficie">Superficie</option>
            </select>
          </div>
        </div>

        {sortedProperties.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No se han encontrado propiedades disponibles en este momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProperties.map((property, index) => {
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