"use client";

import { useState, useMemo } from "react";
import { Property } from "@/types/property";
import PropertyCard from "./property-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface PropertyGridProps {
  properties: Property[];
}

const ITEMS_PER_PAGE = 20;
type SortOption = "newest" | "priceAsc" | "priceDesc" | "area";

// Helper para convertir el precio (number | string) a número seguro para ordenar
function getNumericPrice(price: number | string): number {
  if (typeof price === "number") return price;
  const parsed = Number(price);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const t = useTranslations("venta.propertyGrid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortedProperties = useMemo(() => {
    if (!Array.isArray(properties)) return [];
    const propertiesCopy = [...properties];

    switch (sortBy) {
      case "priceAsc":
        return propertiesCopy.sort(
          (a, b) => getNumericPrice(a.price) - getNumericPrice(b.price)
        );

      case "priceDesc":
        return propertiesCopy.sort(
          (a, b) => getNumericPrice(b.price) - getNumericPrice(a.price)
        );

      case "area":
        return propertiesCopy.sort((a, b) => (b.area || 0) - (a.area || 0));

      case "newest":
      default:
        return propertiesCopy.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });
    }
  }, [properties, sortBy]);

  const totalCount = sortedProperties.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Reiniciar a la página 1 cuando se cambia la ordenación o la lista de propiedades
  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  // Obtener las propiedades correspondientes a la página actual
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProperties, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startItem = totalCount > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t("title")}
            </h2>
            <p className="text-gray-600">
              {t("summary", { startItem, endItem, totalCount })}
            </p>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            <label className="text-gray-700 font-medium whitespace-nowrap">
              {t("sort.label")}
            </label>

            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 cursor-pointer"
            >
              <option value="newest">{t("sort.options.newest")}</option>
              <option value="priceAsc">{t("sort.options.priceAsc")}</option>
              <option value="priceDesc">{t("sort.options.priceDesc")}</option>
              <option value="area">{t("sort.options.area")}</option>
            </select>
          </div>
        </div>

        {totalCount === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {t("empty")}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProperties.map((property, index) => {
                const uniqueKey =
                  property.id ||
                  (property as any).cod_ofer ||
                  (property as any).ref ||
                  index;

                return <PropertyCard key={uniqueKey} property={property} />;
              })}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label={t("pagination.previous")}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label={t("pagination.next")}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}