import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bed, Bath, Maximize, Euro } from "lucide-react";

export default function PropertySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Propiedades destacadas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Descubre nuestra selección de propiedades exclusivas en las
              mejores ubicaciones de España.
            </p>
          </div>
          <Link
            href="/propiedades"
            className="mt-6 md:mt-0 inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            Ver todas las propiedades
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  beds: number;
  baths: number;
  area: number;
  type: string;
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-10 relative overflow-hidden">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
          {property.type}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-lg font-bold text-blue-600 whitespace-nowrap flex items-center">
            <Euro size={18} className="inline mr-1" />
            {property.price.toLocaleString("es-ES")}
          </p>
        </div>

        <p className="text-gray-600 mb-4">{property.location}</p>

        <div className="flex justify-between text-gray-700">
          <div className="flex items-center">
            <Bed size={18} className="mr-1 text-gray-500" />
            <span>{property.beds} hab.</span>
          </div>
          <div className="flex items-center">
            <Bath size={18} className="mr-1 text-gray-500" />
            <span>{property.baths} baños</span>
          </div>
          <div className="flex items-center">
            <Maximize size={18} className="mr-1 text-gray-500" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Link
          href={`/propiedades/${property.id}`}
          className="block w-full text-center bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-800 font-medium py-3 rounded-lg transition-colors duration-300"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}

const properties: Property[] = [
  {
    id: 1,
    title: "Ático de lujo con terraza",
    location: "Salamanca, Madrid",
    price: 850000,
    image: "/placeholder.svg?height=400&width=600",
    beds: 3,
    baths: 2,
    area: 150,
    type: "Ático",
  },
  {
    id: 2,
    title: "Chalet con piscina",
    location: "La Moraleja, Madrid",
    price: 1250000,
    image: "/placeholder.svg?height=400&width=600",
    beds: 5,
    baths: 4,
    area: 350,
    type: "Chalet",
  },
  {
    id: 3,
    title: "Piso reformado en el centro",
    location: "Eixample, Barcelona",
    price: 495000,
    image: "/placeholder.svg?height=400&width=600",
    beds: 2,
    baths: 2,
    area: 95,
    type: "Piso",
  },
  {
    id: 4,
    title: "Apartamento con vistas al mar",
    location: "Diagonal Mar, Barcelona",
    price: 675000,
    image: "/placeholder.svg?height=400&width=600",
    beds: 3,
    baths: 2,
    area: 120,
    type: "Apartamento",
  },
  {
    id: 5,
    title: "Casa adosada con jardín",
    location: "Pozuelo de Alarcón, Madrid",
    price: 580000,
    image: "/placeholder.svg?height=400&width=600",
    beds: 4,
    baths: 3,
    area: 220,
    type: "Adosado",
  },
  {
    id: 6,
    title: "Loft industrial renovado",
    location: "Poblenou, Barcelona",
    price: 425000,
    image: "/placeholder.svg?height=400&width=600",
    beds: 1,
    baths: 1,
    area: 85,
    type: "Loft",
  },
];
