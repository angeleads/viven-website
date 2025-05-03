"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bed, Bath, Maximize, Euro, Phone, Info } from "lucide-react"
import type { Property } from "@/types/property"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md  hover:shadow-xl transition-shadow duration-300 relative h-full">
      {/* Image section with hover effect */}
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="aspect-w-16 aspect-h-10 relative overflow-hidden">
          <Image
            src={property.image || "/placeholder.svg?height=400&width=600"}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
          {property.type}
        </div>
        <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full">
          {property.status}
        </div>

        {/* Agent information overlay on hover - only on the image */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-blue-900/95 to-blue-800/95 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={property.agent.photo || "/placeholder.svg?height=200&width=200"}
                alt={property.agent.name}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-white font-bold text-base mb-1">{property.agent.name}</h4>
            <p className="text-white/80 text-xs mb-3">Agente inmobiliario</p>

            <a
              href={`tel:${property.agent.phone}`}
              className="flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-medium py-1.5 px-3 rounded-xl transition-colors text-sm"
            >
              <Phone size={14} />
              {property.agent.phone}
            </a>
          </div>
        </div>

        {/* Info button alternative for mobile */}
        <button
          className="md:hidden absolute bottom-4 right-4 bg-white/90 text-blue-600 p-2 rounded-full shadow-md"
          onClick={() => setIsHovered(!isHovered)}
        >
          <Info size={18} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="text-lg font-bold text-blue-600 whitespace-nowrap flex items-center">
            <Euro size={18} className="inline mr-1" />
            {property.price.toLocaleString("es-ES")}
          </p>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-1">{property.location}</p>

        <div className="flex justify-between text-gray-700 text-sm">
          <div className="flex items-center">
            <Bed size={16} className="mr-1 text-gray-500" />
            <span>{property.beds} hab.</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1 text-gray-500" />
            <span>{property.baths} baños</span>
          </div>
          <div className="flex items-center">
            <Maximize size={16} className="mr-1 text-gray-500" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link
          href={`/propiedades/${property.id}`}
          className="block w-full text-center bg-gray-200 hover:bg-black hover:text-white text-gray-800 font-medium py-2 rounded-xl transition-colors duration-300"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  )
}
