"use client";

import React from "react";
import { FilterState, INITIAL_FILTERS } from "@/lib/property-filters";
import { Search, RotateCcw } from "lucide-react";

interface HeroProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableCities: string[];
  availableZones: string[];
  availableTypes: string[];
  onReset: () => void;
}

export default function Hero({
  filters,
  setFilters,
  availableCities,
  availableZones,
  availableTypes,
  onReset,
}: HeroProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const hasActiveFilters = Object.values(filters).some((val) => val !== "");

  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20 md:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/pictures/venta-backround.png')",
            filter: "blur(2px)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Propiedades en Venta
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Descubre nuestra selección exclusiva de propiedades en las mejores ubicaciones
          </p>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
            {/* Grid de Filtros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              
              {/* Búsqueda por Referencia / ID */}
              <div className="relative">
                <input
                  type="text"
                  name="searchRef"
                  value={filters.searchRef}
                  onChange={handleChange}
                  placeholder="Buscar por ref. o título..."
                  className="w-full p-3 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                />
              </div>

              {/* Tipo de Propiedad (Diverso / Dinámico) */}
              <div>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                >
                  <option className="text-black" value="">
                    Todos los tipos
                  </option>
                  {availableTypes.map((type) => (
                    <option key={type} className="text-black" value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ciudad (Dinámica) */}
              <div>
                <select
                  name="city"
                  value={filters.city}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                >
                  <option className="text-black" value="">
                    Todas las ciudades
                  </option>
                  {availableCities.map((city) => (
                    <option key={city} className="text-black" value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Zona / Barrio (Dinámica) */}
              <div>
                <select
                  name="zone"
                  value={filters.zone}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                >
                  <option className="text-black" value="">
                    Todas las zonas
                  </option>
                  {availableZones.map((zone) => (
                    <option key={zone} className="text-black" value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Precio Mínimo */}
              <div>
                <select
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                >
                  <option className="text-black" value="">
                    Precio mín. (Cualquiera)
                  </option>
                  <option className="text-black" value="50000">Desde 50.000 €</option>
                  <option className="text-black" value="100000">Desde 100.000 €</option>
                  <option className="text-black" value="200000">Desde 200.000 €</option>
                  <option className="text-black" value="300000">Desde 300.000 €</option>
                  <option className="text-black" value="500000">Desde 500.000 €</option>
                </select>
              </div>

              {/* Precio Máximo */}
              <div>
                <select
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                >
                  <option className="text-black" value="">
                    Precio máx. (Cualquiera)
                  </option>
                  <option className="text-black" value="150000">Hasta 150.000 €</option>
                  <option className="text-black" value="250000">Hasta 250.000 €</option>
                  <option className="text-black" value="400000">Hasta 400.000 €</option>
                  <option className="text-black" value="600000">Hasta 600.000 €</option>
                  <option className="text-black" value="1000000">Hasta 1.000.000 €</option>
                </select>
              </div>

            </div>

            {/* Botón de Limpiar / Reset */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all"
                >
                  <RotateCcw size={16} />
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Elemento decorativo inferior */}
      <div
        className="absolute bottom-0 left-0 w-full h-12 bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
      ></div>
    </section>
  );
}