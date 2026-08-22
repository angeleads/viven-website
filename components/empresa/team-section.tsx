"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Mail,
  Phone,
  Building2,
  Sparkles,
  User,
  X,
  MessageSquare,
  Award,
  ChevronRight,
  Home,
} from "lucide-react";
import type { Property, Agent } from "@/types/property";

interface ExtendedAgent extends Agent {
  propertyCount: number;
}

export default function TeamSection() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<ExtendedAgent | null>(null);

  // Fetch properties from the API
  useEffect(() => {
    let isMounted = true;

    async function loadAgents() {
      try {
        setLoading(true);
        const res = await fetch("/api/properties?limit=100");
        if (!res.ok) throw new Error("No se pudo cargar la lista de agentes.");
        const data = await res.json();

        if (isMounted) {
          setProperties(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err: any) {
        console.error("Error al obtener agentes:", err);
        if (isMounted) {
          setError("No se pudieron cargar los agentes comercializadores.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAgents();

    return () => {
      isMounted = false;
    };
  }, []);

  // Extract and deduplicate unique agents from fetched API properties
  const agents = useMemo(() => {
    if (!properties || properties.length === 0) return [];

    const agentMap = new Map<string, ExtendedAgent>();

    properties.forEach((prop) => {
      const agent = prop.agent;
      const name = agent?.name?.trim() || prop.agency || "Agente RE/MAX Viven";

      // Exclude generic fallbacks if specific agent names exist
      const key = name.toLowerCase();

      if (!agentMap.has(key)) {
        agentMap.set(key, {
          name: name,
          phone: agent?.phone || prop.agencyPhone || "",
          email: agent?.email || prop.agencyEmail || "",
          photo: agent?.photo || "",
          propertyCount: 1,
        });
      } else {
        const existing = agentMap.get(key)!;
        existing.propertyCount += 1;
        // Upgrade photo or phone if previously missing
        if (!existing.photo && agent?.photo) existing.photo = agent.photo;
        if (!existing.phone && agent?.phone) existing.phone = agent.phone;
        if (!existing.email && agent?.email) existing.email = agent.email;
      }
    });

    return Array.from(agentMap.values()).sort((a, b) => b.propertyCount - a.propertyCount);
  }, [properties]);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs md:text-sm font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Asesores Inmobiliarios Certificados</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Conoce a Nuestro{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
              Equipo de Expertos
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed font-normal">
            Nuestros agentes asociados cuentan con un profundo conocimiento del mercado inmobiliario en el Garraf y están comprometidos en ofrecerte un asesoramiento personalizado de excelencia.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 animate-pulse space-y-4"
              >
                <div className="h-64 bg-slate-700/50 rounded-xl" />
                <div className="h-5 w-3/4 bg-slate-700/50 rounded" />
                <div className="h-4 w-1/2 bg-slate-700/50 rounded" />
                <div className="h-10 w-full bg-slate-700/50 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-center py-8 rounded-2xl max-w-lg mx-auto">
            {error}
          </div>
        )}

        {/* Agents Grid */}
        {!loading && !error && agents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-blue-500/40 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Agent Photo Container */}
                <div className="relative h-80 w-full overflow-hidden bg-slate-900">
                  {agent.photo ? (
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to avatar UI on broken URL
                        (e.target as HTMLElement).style.display = "none";
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) parent.classList.add("fallback-avatar");
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-blue-950 text-slate-400">
                      <User size={64} className="stroke-[1.5] text-slate-500 mb-2" />
                      <span className="text-xs font-medium text-slate-400">Sin foto de perfil</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                  {/* Property Count Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 flex items-center gap-1.5 shadow-lg">
                    <Home size={13} className="text-amber-400" />
                    <span>{agent.propertyCount} Inmueble{agent.propertyCount > 1 ? "s" : ""}</span>
                  </div>

                  {/* Floating Agent Info on Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] font-semibold uppercase tracking-wider mb-1">
                      Agente Asociado
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                      {agent.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body & Actions */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 text-xs text-slate-300">
                    {agent.phone && (
                      <a
                        href={`tel:${agent.phone.replace(/\s+/g, "")}`}
                        className="flex items-center gap-2.5 hover:text-blue-400 transition-colors py-1"
                      >
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-blue-400">
                          <Phone size={14} />
                        </div>
                        <span className="font-medium truncate">{agent.phone}</span>
                      </a>
                    )}

                    {agent.email && (
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-2.5 hover:text-blue-400 transition-colors py-1"
                      >
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-blue-400">
                          <Mail size={14} />
                        </div>
                        <span className="font-medium truncate">{agent.email}</span>
                      </a>
                    )}
                  </div>

                  {/* Primary Contact Trigger Button */}
                  <button
                    onClick={() => setSelectedAgent(agent)}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-semibold text-xs py-3 px-4 rounded-xl shadow-lg transition-all duration-300 group/btn"
                  >
                    <span>Contactar Agente</span>
                    <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && agents.length === 0 && (
          <div className="text-center py-16 text-slate-400 font-medium">
            No se encontraron agentes activos en el catálogo actual.
          </div>
        )}

        {/* Modal for Agent Direct Contact */}
        {selectedAgent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedAgent(null)}
          >
            <div
              className="relative w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-6 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAgent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              {/* Agent Detail Header */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 border border-white/15 shrink-0">
                  {selectedAgent.photo ? (
                    <img
                      src={selectedAgent.photo}
                      alt={selectedAgent.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <User size={32} />
                    </div>
                  )}
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-[11px] font-semibold mb-1">
                    <Award size={12} />
                    <span>Asesor Certificado RE/MAX</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedAgent.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Building2 size={13} className="text-blue-400" />
                    <span>{selectedAgent.propertyCount} propiedades gestionadas actualmente</span>
                  </p>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="space-y-3 pt-2">
                {selectedAgent.phone && (
                  <a
                    href={`https://wa.me/${selectedAgent.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-lg transition-all"
                  >
                    <MessageSquare size={16} />
                    <span>Enviar WhatsApp Directo</span>
                  </a>
                )}

                {selectedAgent.phone && (
                  <a
                    href={`tel:${selectedAgent.phone.replace(/\s+/g, "")}`}
                    className="w-full flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all"
                  >
                    <Phone size={16} className="text-blue-400" />
                    <span>Llamar por teléfono ({selectedAgent.phone})</span>
                  </a>
                )}

                {selectedAgent.email && (
                  <a
                    href={`mailto:${selectedAgent.email}?subject=Consulta sobre propiedad en Viven`}
                    className="w-full flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all"
                  >
                    <Mail size={16} className="text-blue-400" />
                    <span>Enviar Correo Electrónico</span>
                  </a>
                )}
              </div>

              {/* Close Footer */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="w-full py-2.5 text-xs text-slate-400 hover:text-white font-medium transition-colors"
                >
                  Cerrar Ventana
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}