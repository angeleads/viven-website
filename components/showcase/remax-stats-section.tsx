"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Building2, Globe, Users, Home, Target, Languages, Phone } from "lucide-react"

export default function RemaxStatsSection() {
  const [activeTab, setActiveTab] = useState<"europe" | "global">("europe")

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Datos rápidos</h2>
          <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
            1º TRIMESTRE 2025
          </div>
          <p className="text-lg text-white/90">
            RE/MAX es la red inmobiliaria más grande del mundo. Descubre nuestro alcance global y europeo.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg p-1 bg-blue-800/50 backdrop-blur-sm">
            <button
              className={`px-6 py-2 rounded-l-xl font-medium transition-colors ${
                activeTab === "europe" ? "bg-white text-blue-900" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setActiveTab("europe")}
            >
              Europa
            </button>
            <button
              className={`px-6 py-2 rounded-r-xl font-medium transition-colors ${
                activeTab === "global" ? "bg-white text-blue-900" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setActiveTab("global")}
            >
              Global
            </button>
          </div>
        </div>
        {/* Europe Stats */}
        <div className={`${activeTab === "europe" ? "block" : "hidden"}`}>
          <div className="flex justify-center items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-8">
                <StatItem
                  icon={<Users className="h-8 w-8 text-red-500" />}
                  value="+33.000"
                  label="Asociados RE/MAX"
                  color="text-red-500"
                />
                <StatItem
                  icon={<Home className="h-8 w-8 text-red-500" />}
                  value="161.299"
                  label="Propiedades en venta"
                  color="text-white"
                />
                <StatItem
                  icon={<Users className="h-8 w-8 text-red-500" />}
                  value="+32.000"
                  label="Agentes"
                  color="text-red-500"
                />
                <StatItem
                  icon={<Home className="h-8 w-8 text-red-500" />}
                  value="25.716"
                  label="Nuevas propiedades en venta"
                  color="text-white"
                />
                <StatItem
                  icon={<Building2 className="h-8 w-8 text-red-500" />}
                  value="+2.400"
                  label="Oficinas"
                  color="text-red-500"
                />
                <StatItem
                  icon={<Target className="h-8 w-8 text-red-500" />}
                  value="+70%"
                  label="Usuarios de móvil"
                  color="text-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Global Stats */}
        <div className={`${activeTab === "global" ? "block" : "hidden"}`}>
          <div className="flex justify-center items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-2 gap-14">
                <StatItem
                  icon={<Home className="h-8 w-8 text-red-500" />}
                  value="663.410"
                  label="Propiedades en venta"
                  color="text-white"
                />
                <StatItem
                  icon={<Globe className="h-8 w-8 text-red-500" />}
                  value="+110"
                  label="Países y territorios"
                  color="text-white"
                />
                <StatItem
                  icon={<Users className="h-8 w-8 text-red-500" />}
                  value="+140.000"
                  label="Agentes"
                  color="text-red-500"
                />
                <StatItem
                  icon={<Languages className="h-8 w-8 text-red-500" />}
                  value="50"
                  label="Idiomas"
                  color="text-white"
                />
                <StatItem
                  icon={<Building2 className="h-8 w-8 text-red-500" />}
                  value="+9.000"
                  label="Oficinas"
                  color="text-red-500"
                />
                <StatItem
                  icon={<Phone className="h-8 w-8 text-red-500" />}
                  value="+70%"
                  label="Usuarios de móvil"
                  color="text-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-white/70">
          <p>Las estadísticas no reflejan todas las regiones europeas de RE/MAX.</p>
          <p>Fuentes de RE/MAX LLC y GrowthTech Inc.</p>
          <p>Tener en cuenta que estas cifras se basan en cifras medias obtenidas del T1 2025.</p>
        </div>
      </div>
    </section>
  )
}

interface StatItemProps {
  icon: React.ReactNode
  value: string
  label: string
  color: string
}

function StatItem({ icon, value, label, color }: StatItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-3">{icon}</div>
      <div className={`text-2xl md:text-3xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  )
}
