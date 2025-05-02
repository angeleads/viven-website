"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ArrowRight } from "lucide-react"

interface Location {
  name: string
  url: string
}

interface Region {
  id: string
  name: string
  locations: Location[]
}

export default function CoverageSection() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const regions: Region[] = [
    {
      id: "garraf",
      name: "El Garraf",
      locations: [
        {
          name: "Canyelles",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-canyelles/c9e97ba8846fb8537343fd3c0ad7a385/es/",
        },
        {
          name: "Cubelles",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-cubelles/c3f731eccfa5b840cf22850624e1ee4f/es/",
        },
        {
          name: "Olivella",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-olivella/1d662f26977a96a6a4db5defb0a6005c/es/",
        },
        {
          name: "Sant Pere de Ribes",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-sant-pere-de-ribes/e1c84f6c68527be945dcfd391481f5c6/es/",
        },
        {
          name: "Sitges",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-sitges/873684356649ed1cb079010b7d62ada4/es/",
        },
        {
          name: "Vilanova i La Geltrú",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-vilanova-i-la-geltru/c03626d34885dbc967fb1f7553cbdb16/es/",
        },
      ],
    },
    {
      id: "penedes",
      name: "El Baix Penedès",
      locations: [
        {
          name: "Calafell",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-calafell/1c93d92375731822b8122eebf945a13c/es/",
        },
        {
          name: "Segur de Calafell",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-segur-calafell/2cbab80a5fda472d109ccd4f0864b1b7/es/",
        },
        {
          name: "Cunit",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-cunit/2cbab80a5fda472d109ccd4f0864b1b7/es/",
        },
        {
          name: "El Vendrell",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-el-vendrell/2cbab80a5fda472d109ccd4f0864b1b7/es/",
        },
      ],
    },
    {
      id: "alt-penedes",
      name: "El Alt Penedès",
      locations: [
        {
          name: "Vilafranca del Penedès",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-villafranca-del-penedes/bf51e11716d8ec8136a3b7ae7ac1a811/es/",
        },
        {
          name: "Santa Margarida i els Monjos",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-santa-margarida-i-els-monjos/e4a0047bb6cc8717c1d66a79d66df149/es/",
        },
        {
          name: "Sant Sadurní d'Anoia",
          url: "https://www.viven.es/seccion/administrador-de-fincas-en-sant-sadurni-d-anoia/080d37b515f18455897fa38da3d3ac07/es/",
        },
      ],
    },
  ]

  const toggleRegion = (regionId: string) => {
    if (activeRegion === regionId) {
      setActiveRegion(null)
    } else {
      setActiveRegion(regionId)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600">
          Nuestra Cobertura
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive Region Selector */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="space-y-8">
              {regions.map((region) => (
                <div key={region.id} className={`region-card group ${activeRegion === region.id ? "active" : ""}`}>
                  <div
                    className="bg-gradient-to-r from-blue-50 to-red-50 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => toggleRegion(region.id)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-blue-600">{region.name}</h3>
                      <ChevronDown
                        className={`text-blue-600 transition-transform ${
                          activeRegion === region.id ? "rotate-180" : ""
                        }`}
                        size={20}
                      />
                    </div>
                  </div>
                  <div
                    className={`region-content mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 ${
                      activeRegion === region.id ? "" : "hidden"
                    }`}
                  >
                    {region.locations.map((location) => (
                      <Link key={location.name} href={location.url} className="location-card">
                        <div className="bg-white rounded-xl p-4 hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                          <h4 className="font-semibold text-gray-800">{location.name}</h4>
                          <span className="text-sm text-blue-600 flex items-center mt-2">
                            Ver más <ArrowRight size={16} className="ml-2" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map Preview */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-24">
            <div className="text-center p-8">
              <Image
                src="/pictures/mapa-oficinas.png"
                alt="Mapa de cobertura"
                width={256}
                height={256}
                className="w-64 max-w-md mx-auto mb-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
