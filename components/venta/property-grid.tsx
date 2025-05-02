import PropertyCard from "./property-card"
import { properties } from "@/data/properties"

export default function PropertyGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Propiedades disponibles</h2>
            <p className="text-gray-600">Mostrando 12 de 57 propiedades</p>
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Ordenar por:</label>
            <select className="p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Más recientes</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Superficie</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
