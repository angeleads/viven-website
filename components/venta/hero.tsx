"use client";

import React from "react";
import { FilterState } from "@/lib/property-filters";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("venta.hero");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleOperationChange = (operation: string) => {
    setFilters((prev) => ({ ...prev, operation }));
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
        <div className="max-w-4xl mx-auto text-center mt-6 md:mt-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-white/90 mb-8">
            {t("description")}
          </p>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
            {/* Pestañas de Selección: Venta / Alquiler / Todos */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-md gap-1">
                <button
                  type="button"
                  onClick={() => handleOperationChange("")}
                  className={`px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ease-in-out active:scale-95 ${!filters.operation
                      ? "bg-white text-blue-900 shadow-lg scale-100"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {t("tabs.all")}
                </button>
                <button
                  type="button"
                  onClick={() => handleOperationChange("venta")}
                  className={`px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ease-in-out active:scale-95 ${filters.operation === "venta"
                      ? "bg-white text-blue-900 shadow-lg scale-100"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {t("tabs.sale")}
                </button>
                <button
                  type="button"
                  onClick={() => handleOperationChange("alquiler")}
                  className={`px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ease-in-out active:scale-95 ${filters.operation === "alquiler"
                      ? "bg-white text-blue-900 shadow-lg scale-100"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {t("tabs.rent")}
                </button>
              </div>
            </div>

            {/* Grid de Filtros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

              {/* Búsqueda por Referencia / ID */}
              <div className="relative">
                <input
                  type="text"
                  name="searchRef"
                  value={filters.searchRef}
                  onChange={handleChange}
                  placeholder={t("filters.search.placeholder")}
                  className="w-full p-3 bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                />
              </div>

              {/* Tipo de Propiedad */}
              <div>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                >
                  <option className="text-black" value="">
                    {t("filters.propertyType.all")}
                  </option>
                  {availableTypes.map((type) => (
                    <option key={type} className="text-black" value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ciudad */}
              <div>
                <select
                  name="city"
                  value={filters.city}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                >
                  <option className="text-black" value="">
                    {t("filters.city.all")}
                  </option>
                  {availableCities.map((city) => (
                    <option key={city} className="text-black" value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Zona / Barrio */}
              <div>
                <select
                  name="zone"
                  value={filters.zone}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                >
                  <option className="text-black" value="">
                    {t("filters.zone.all")}
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
                    {t("filters.minPrice.any")}
                  </option>
                  {filters.operation === "alquiler" ? (
                    <>
                      <option className="text-black" value="400">{t("filters.minPrice.rent.from400")}</option>
                      <option className="text-black" value="600">{t("filters.minPrice.rent.from600")}</option>
                      <option className="text-black" value="800">{t("filters.minPrice.rent.from800")}</option>
                      <option className="text-black" value="1000">{t("filters.minPrice.rent.from1000")}</option>
                      <option className="text-black" value="1500">{t("filters.minPrice.rent.from1500")}</option>
                    </>
                  ) : (
                    <>
                      <option className="text-black" value="50000">{t("filters.minPrice.sale.from50000")}</option>
                      <option className="text-black" value="100000">{t("filters.minPrice.sale.from100000")}</option>
                      <option className="text-black" value="200000">{t("filters.minPrice.sale.from200000")}</option>
                      <option className="text-black" value="300000">{t("filters.minPrice.sale.from300000")}</option>
                      <option className="text-black" value="500000">{t("filters.minPrice.sale.from500000")}</option>
                    </>
                  )}
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
                    {t("filters.maxPrice.any")}
                  </option>
                  {filters.operation === "alquiler" ? (
                    <>
                      <option className="text-black" value="800">{t("filters.maxPrice.rent.to800")}</option>
                      <option className="text-black" value="1200">{t("filters.maxPrice.rent.to1200")}</option>
                      <option className="text-black" value="1500">{t("filters.maxPrice.rent.to1500")}</option>
                      <option className="text-black" value="2000">{t("filters.maxPrice.rent.to2000")}</option>
                      <option className="text-black" value="3000">{t("filters.maxPrice.rent.to3000")}</option>
                    </>
                  ) : (
                    <>
                      <option className="text-black" value="150000">{t("filters.maxPrice.sale.to150000")}</option>
                      <option className="text-black" value="250000">{t("filters.maxPrice.sale.to250000")}</option>
                      <option className="text-black" value="400000">{t("filters.maxPrice.sale.to400000")}</option>
                      <option className="text-black" value="600000">{t("filters.maxPrice.sale.to600000")}</option>
                      <option className="text-black" value="1000000">{t("filters.maxPrice.sale.to1000000")}</option>
                    </>
                  )}
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
                  {t("actions.clearFilters")}
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