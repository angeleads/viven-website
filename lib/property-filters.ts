import type { Property } from "@/types/property";

export interface FilterState {
  searchRef: string;     // Reference number or ID search
  propertyType: string;  // e.g. "Piso", "Casa"
  city: string;          // Selected City
  zone: string;          // Selected Zone
  minPrice: string;      // Minimum price threshold
  maxPrice: string;      // Maximum price threshold
  operation: string;     // e.g. "venta", "alquiler"
}

export const INITIAL_FILTERS: FilterState = {
  searchRef: "",
  propertyType: "",
  city: "",
  zone: "",
  minPrice: "",
  maxPrice: "",
  operation: "",
};

// Helper function to convert price safely to a number
export function getNumericPrice(price: number | string): number {
  if (typeof price === "number") return price;
  const parsed = Number(price);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Dynamically extracts unique cities, zones, and property types available in current inventory
 */
export function getFilterOptions(properties: Property[]) {
  const cities = new Set<string>();
  const zones = new Set<string>();
  const propertyTypes = new Set<string>();

  properties.forEach((p) => {
    if (p.city) cities.add(p.city);
    if (p.zone) zones.add(p.zone);
    if (p.propertyType) propertyTypes.add(p.propertyType);
  });

  return {
    cities: Array.from(cities).sort(),
    zones: Array.from(zones).sort(),
    propertyTypes: Array.from(propertyTypes).sort(),
  };
}

/**
 * Filters the list of properties based on active filter criteria
 */
export function filterProperties(properties: Property[], filters: FilterState): Property[] {
  if (!Array.isArray(properties)) return [];

  return properties.filter((property) => {
    // 1. Operation filter (Venta / Alquiler / Traspaso)
    if (filters.operation) {
      const opFilter = filters.operation.toLowerCase();
      const propOp = (property.operationType || "").toLowerCase();
      const opCode = property.operationTypeCode;

      if (opFilter === "traspaso") {
        const isTransfer =
          propOp.includes("traspas") ||
          propOp.includes("transfer") ||
          propOp.includes("cession") ||
          [3, 5, 6, 7, 18].includes(opCode || 0) ||
          (property.transferPrice !== undefined && property.transferPrice > 0);
        if (!isTransfer) return false;
      } else if (opFilter === "alquiler") {
        const isRent =
          (propOp.includes("alquiler") ||
            propOp.includes("lloguer") ||
            propOp.includes("rent") ||
            propOp.includes("louer")) &&
          !propOp.includes("traspas");
        if (!isRent && ![2, 9, 16, 20].includes(opCode || 0)) return false;
      } else if (opFilter === "venta") {
        const isSale =
          (propOp.includes("venta") ||
            propOp.includes("venda") ||
            propOp.includes("sale") ||
            propOp.includes("vendre")) &&
          !propOp.includes("traspas");
        if (!isSale && ![1, 13, 14].includes(opCode || 0)) return false;
      } else if (propOp && !propOp.includes(opFilter)) {
        return false;
      }
    }

    // 2. Reference / ID / Title search
    if (filters.searchRef.trim()) {
      const query = filters.searchRef.trim().toLowerCase();
      const matchRef = property.reference?.toLowerCase().includes(query);
      const matchId = property.id?.toLowerCase().includes(query);
      const matchTitle = property.title?.toLowerCase().includes(query);
      if (!matchRef && !matchId && !matchTitle) return false;
    }

    // 3. Property Type filter
    if (filters.propertyType && property.propertyType) {
      if (property.propertyType.toLowerCase() !== filters.propertyType.toLowerCase()) {
        return false;
      }
    }

    // 4. City filter
    if (filters.city && property.city) {
      if (property.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
    }

    // 5. Zone filter
    if (filters.zone && property.zone) {
      if (property.zone.toLowerCase() !== filters.zone.toLowerCase()) {
        return false;
      }
    }

    // 6. Minimum Price filter
    if (filters.minPrice) {
      const min = Number(filters.minPrice);
      const price = getNumericPrice(property.price);
      if (price < min) return false;
    }

    // 7. Maximum Price filter
    if (filters.maxPrice) {
      const max = Number(filters.maxPrice);
      const price = getNumericPrice(property.price);
      if (price > max) return false;
    }

    return true;
  });
}