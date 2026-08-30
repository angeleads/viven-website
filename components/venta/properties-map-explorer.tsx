"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  MapPin,
  ExternalLink,
  Bed,
  Bath,
  Maximize,
  Euro,
  X,
  Compass,
  Layers,
  ChevronRight,
} from "lucide-react";
import type { Property } from "@/types/property";

interface PropertiesMapExplorerProps {
  properties: Property[];
}

const KNOWN_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "vilanova i la geltrú": { lat: 41.2239, lng: 1.7259 },
  "vilanova i la geltru": { lat: 41.2239, lng: 1.7259 },
  "vilanova": { lat: 41.2239, lng: 1.7259 },
  "sitges": { lat: 41.2372, lng: 1.8059 },
  "calafell": { lat: 41.2003, lng: 1.5684 },
  "segur de calafell": { lat: 41.1925, lng: 1.5972 },
  "cubelles": { lat: 41.2081, lng: 1.6738 },
  "cunit": { lat: 41.1979, lng: 1.6334 },
  "sant pere de ribes": { lat: 41.2599, lng: 1.7731 },
  "les roquetes": { lat: 41.233, lng: 1.751 },
  "roquetes": { lat: 41.233, lng: 1.751 },
  "canyelles": { lat: 41.2869, lng: 1.7222 },
  "olivella": { lat: 41.314, lng: 1.812 },
  "vilafranca del penedès": { lat: 41.3462, lng: 1.6976 },
  "vilafranca del penedes": { lat: 41.3462, lng: 1.6976 },
  "vilafranca": { lat: 41.3462, lng: 1.6976 },
  "barcelona": { lat: 41.3879, lng: 2.1699 },
  "tarragona": { lat: 41.1189, lng: 1.2445 },
  "el vendrell": { lat: 41.1895, lng: 1.5358 },
  "comarruga": { lat: 41.1812, lng: 1.5244 },
  "coma-ruga": { lat: 41.1812, lng: 1.5244 },
  "castelldefels": { lat: 41.28, lng: 1.9764 },
  "gava": { lat: 41.306, lng: 2.001 },
  "gavà": { lat: 41.306, lng: 2.001 },
};

function formatCompactPrice(price: number | string | undefined): string {
  if (!price) return "Consulte";
  let num: number;
  if (typeof price === "string") {
    num = Number(price.replace(/[^0-9.-]+/g, ""));
    if (isNaN(num) || num === 0) return price;
  } else {
    num = price;
  }

  if (num >= 1000000) {
    const m = num / 1000000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M €`;
  }
  if (num >= 1000) {
    return `${Math.round(num / 1000)}k €`;
  }
  return `${num} €`;
}

function getPropertyCoordinates(property: Property, index: number): { lat: number; lng: number } {
  const lat = property.latitude ?? property.latitud;
  const lng = property.longitude ?? property.longitud;

  if (
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat !== 0 &&
    lng !== 0
  ) {
    return { lat, lng };
  }

  const cityKey = (property.city || property.location || "").toLowerCase().trim();
  let base = KNOWN_COORDINATES[cityKey];

  if (!base) {
    for (const [knownCity, coords] of Object.entries(KNOWN_COORDINATES)) {
      if (cityKey.includes(knownCity) || knownCity.includes(cityKey)) {
        base = coords;
        break;
      }
    }
  }

  if (!base) {
    base = { lat: 41.2239, lng: 1.7259 }; // Vilanova default
  }

  // Deterministic micro-jitter so multiple properties in same town don't overlap directly
  const hash = Math.abs(
    (property.id || property.reference || `${index}`)
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );
  const angle = (hash % 360) * (Math.PI / 180);
  const distance = 0.003 + ((hash % 10) * 0.0008);

  return {
    lat: base.lat + Math.sin(angle) * distance,
    lng: base.lng + Math.cos(angle) * distance,
  };
}

interface ClusterItem {
  property: Property;
  coords: { lat: number; lng: number };
}

interface Cluster {
  id: string;
  lat: number;
  lng: number;
  items: ClusterItem[];
}

function clusterProperties(items: ClusterItem[], zoom: number): Cluster[] {
  if (zoom >= 13) {
    // Zoom in profundo: cada propiedad como pin individual
    return items.map((item, idx) => ({
      id: `single-${item.property.id || idx}`,
      lat: item.coords.lat,
      lng: item.coords.lng,
      items: [item],
    }));
  }

  // Umbral dinámico según nivel de zoom
  let threshold = 0.035;
  if (zoom <= 10) threshold = 0.08;
  else if (zoom <= 11) threshold = 0.05;
  else if (zoom === 12) threshold = 0.025;

  const clusters: Cluster[] = [];

  items.forEach((item, idx) => {
    let bestCluster: Cluster | null = null;
    let minDist = threshold;

    for (const c of clusters) {
      const dLat = c.lat - item.coords.lat;
      const dLng = c.lng - item.coords.lng;
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);
      if (dist < minDist) {
        minDist = dist;
        bestCluster = c;
      }
    }

    if (bestCluster) {
      bestCluster.items.push(item);
      // Actualizar centroide
      bestCluster.lat =
        bestCluster.items.reduce((acc, i) => acc + i.coords.lat, 0) /
        bestCluster.items.length;
      bestCluster.lng =
        bestCluster.items.reduce((acc, i) => acc + i.coords.lng, 0) /
        bestCluster.items.length;
    } else {
      clusters.push({
        id: `cluster-${idx}`,
        lat: item.coords.lat,
        lng: item.coords.lng,
        items: [item],
      });
    }
  });

  return clusters;
}

export default function PropertiesMapExplorer({ properties }: PropertiesMapExplorerProps) {
  const t = useTranslations("venta.mapExplorer");
  const locale = useLocale();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [isMapReady, setIsMapReady] = useState(false);
  const [currentZoom, setCurrentZoom] = useState<number>(11);

  // Mapeo de propiedades con coordenadas
  const geolocatedProperties = useMemo(() => {
    return properties.map((p, idx) => ({
      property: p,
      coords: getPropertyCoordinates(p, idx),
    }));
  }, [properties]);

  // Zonas destacadas
  const zoneFilters = useMemo(() => {
    return [
      { id: "all", label: t("zones.all"), center: [41.23, 1.72], zoom: 11 },
      { id: "vilanova", label: t("zones.vilanova"), center: [41.2239, 1.7259], zoom: 13 },
      { id: "sitges", label: t("zones.sitges"), center: [41.2372, 1.8059], zoom: 13 },
      { id: "calafell", label: t("zones.calafell"), center: [41.2003, 1.5684], zoom: 13 },
      { id: "cubelles", label: t("zones.cubelles"), center: [41.203, 1.6536], zoom: 13 },
      { id: "ribes", label: t("zones.ribes"), center: [41.2599, 1.7731], zoom: 13 },
      { id: "penedes", label: t("zones.penedes"), center: [41.3462, 1.6976], zoom: 12 },
    ];
  }, [t]);

  // Carga e inicialización de Leaflet
  useEffect(() => {
    let isCancelled = false;

    function initLeafletMap() {
      const L = (window as any).L;
      if (!L || !mapContainerRef.current || mapInstanceRef.current || isCancelled) return;

      try {
        const map = L.map(mapContainerRef.current, {
          center: [41.225, 1.72],
          zoom: 11,
          zoomControl: false,
          scrollWheelZoom: false,
        });

        L.control.zoom({ position: "bottomright" }).addTo(map);

        // Capa de mapa OpenStreetMap estándar, rápida y universal
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        map.on("zoomend", () => {
          if (!isCancelled) {
            setCurrentZoom(map.getZoom());
          }
        });

        // Forzar cálculo de dimensiones de contenedor
        setTimeout(() => {
          if (!isCancelled && map) map.invalidateSize();
        }, 100);

        setTimeout(() => {
          if (!isCancelled && map) map.invalidateSize();
        }, 400);

        setTimeout(() => {
          if (!isCancelled && map) map.invalidateSize();
        }, 1000);

        mapInstanceRef.current = map;
        if (!isCancelled) {
          setIsMapReady(true);
          setCurrentZoom(map.getZoom());
        }
      } catch (err) {
        console.error("Error initializing Leaflet map:", err);
      }
    }

    if ((window as any).L) {
      initLeafletMap();
    } else {
      const scriptId = "leaflet-js";
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
        script.async = true;
        document.body.appendChild(script);
      }

      script.addEventListener("load", () => {
        if (!isCancelled) initLeafletMap();
      });

      const checkInterval = setInterval(() => {
        if ((window as any).L && !mapInstanceRef.current) {
          clearInterval(checkInterval);
          if (!isCancelled) initLeafletMap();
        }
      }, 100);

      setTimeout(() => clearInterval(checkInterval), 5000);
    }

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Actualizar marcadores y clusters según el nivel de zoom y estado
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    if (!L || !map || !isMapReady) return;

    // Limpiar marcadores anteriores
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Agrupar propiedades en clusters dinámicos según el zoom
    const clusters = clusterProperties(geolocatedProperties, currentZoom);

    clusters.forEach((cluster) => {
      if (cluster.items.length === 1) {
        // Pin individual compacto con precio corto (ej: 245k €)
        const item = cluster.items[0];
        const isSelected = selectedProperty?.id === item.property.id;
        const compactPrice = formatCompactPrice(item.property.price);

        const customIcon = L.divIcon({
          className: "custom-map-marker",
          html: `
            <div class="group relative flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110">
              <div class="${
                isSelected
                  ? "bg-blue-800 ring-4 ring-blue-300 scale-110 text-white z-50"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } px-2.5 py-1 rounded-full shadow-lg border border-white flex items-center gap-1 font-black text-[11px] whitespace-nowrap shadow-blue-900/30">
                <span class="w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white animate-ping" : "bg-white"}"></span>
                <span>${compactPrice}</span>
              </div>
              <div class="w-2 h-2 ${isSelected ? "bg-blue-800" : "bg-blue-600"} rotate-45 -mt-1 border-r border-b border-white"></div>
            </div>
          `,
          iconSize: [68, 30],
          iconAnchor: [34, 30],
        });

        const marker = L.marker([cluster.lat, cluster.lng], { icon: customIcon }).addTo(map);

        marker.on("click", () => {
          setSelectedProperty(item.property);
          map.flyTo([cluster.lat, cluster.lng], Math.max(map.getZoom(), 13), {
            duration: 0.8,
          });
        });

        markersRef.current.push(marker);
      } else {
        // Marcador de Cluster Circular con contador (ej: "8", "4")
        const count = cluster.items.length;
        const clusterIcon = L.divIcon({
          className: "custom-map-marker",
          html: `
            <div class="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-115">
              <span class="absolute -inset-1.5 rounded-full bg-blue-500/25 animate-ping"></span>
              <span class="absolute -inset-1 rounded-full bg-blue-400/30"></span>
              <div class="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-white shadow-xl flex flex-col items-center justify-center text-white ring-2 ring-blue-400/40">
                <span class="font-black text-xs leading-none">${count}</span>
              </div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        const marker = L.marker([cluster.lat, cluster.lng], { icon: clusterIcon }).addTo(map);

        marker.on("click", () => {
          // Al hacer clic en el cluster, hace zoom hacia dentro para expandirlo
          const targetZoom = Math.min(map.getZoom() + 2, 14);
          map.flyTo([cluster.lat, cluster.lng], targetZoom, {
            duration: 0.8,
          });
        });

        markersRef.current.push(marker);
      }
    });
  }, [geolocatedProperties, isMapReady, selectedProperty, currentZoom, locale]);

  // Filtrar o enfocar zona
  const handleSelectZone = (zone: (typeof zoneFilters)[0]) => {
    setSelectedZone(zone.id);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo(zone.center, zone.zoom, { duration: 1.2 });
    }
  };

  const handleResetView = () => {
    handleSelectZone(zoneFilters[0]);
    setSelectedProperty(null);
  };

  return (
    <section className="my-16 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 overflow-hidden">
      {/* Cabecera del Mapa */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass size={14} className="animate-spin-slow" />
            {t("badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {t("title")}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
            {t("description")}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg">
            {t("propertiesFound", { count: geolocatedProperties.length })}
          </div>
          <button
            onClick={handleResetView}
            className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Compass size={14} />
            {t("actions.centerMap")}
          </button>
        </div>
      </div>

      {/* Selector de Zonas / Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
        {zoneFilters.map((zone) => {
          const isActive = selectedZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => handleSelectZone(zone)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/80"
              }`}
            >
              <MapPin size={12} className={isActive ? "text-white" : "text-blue-500"} />
              {zone.label}
            </button>
          );
        })}
      </div>

      {/* Contenedor del Mapa Interactivo */}
      <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-gray-200 bg-slate-100 shadow-inner">
        {!isMapReady && (
          <div className="absolute inset-0 bg-slate-50/90 backdrop-blur-xs flex flex-col items-center justify-center z-10 gap-3">
            <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-gray-500 animate-pulse">Cargando mapa interactivo...</p>
          </div>
        )}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Tarjeta flotante de previsualización al pulsar un marcador */}
        {selectedProperty && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-[1000] animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-gray-200 flex flex-col relative">
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors z-10"
                aria-label={t("actions.close")}
              >
                <X size={16} />
              </button>

              <div className="flex gap-4 items-start">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <Image
                    src={
                      selectedProperty.images?.[0] ||
                      selectedProperty.image ||
                      "/placeholder.svg?height=200&width=200"
                    }
                    alt={selectedProperty.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {selectedProperty.operationType && (
                    <span className="absolute top-1 left-1 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                      {selectedProperty.operationType}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                    {selectedProperty.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                    {[selectedProperty.locationDetail, selectedProperty.zone, selectedProperty.city || selectedProperty.location]
                      .filter(Boolean)
                      .join(", ")}
                  </p>

                  <div className="text-base font-extrabold text-blue-600 mt-1">
                    {typeof selectedProperty.price === "number"
                      ? `${selectedProperty.price.toLocaleString(locale)} €`
                      : `${selectedProperty.price || "Consulte"}`}
                  </div>

                  <div className="flex items-center gap-3 text-gray-500 text-[11px] mt-2">
                    {selectedProperty.beds > 0 && (
                      <span className="flex items-center gap-1">
                        <Bed size={12} /> {selectedProperty.beds}
                      </span>
                    )}
                    {selectedProperty.baths > 0 && (
                      <span className="flex items-center gap-1">
                        <Bath size={12} /> {selectedProperty.baths}
                      </span>
                    )}
                    {selectedProperty.area > 0 && (
                      <span className="flex items-center gap-1">
                        <Maximize size={12} /> {selectedProperty.area} m²
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/propiedades/${selectedProperty.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold text-xs py-2 px-4 rounded-xl transition-colors shadow-sm"
                >
                  <span>{t("actions.viewProperty")}</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
