import { Property } from "@/types/property";
import PropertyCard from "./property-card"; // Asegúrate de que PropertyCard acepte la interfaz Property actualizada

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Propiedades disponibles</h2>
            {/* 👇 Ahora muestra el conteo real en tiempo real */}
            <p className="text-gray-600">
              Mostrando {properties.length} de {properties.length} propiedades
            </p>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            <label className="text-gray-700 font-medium whitespace-nowrap">Ordenar por:</label>
            <select className="p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option>Más recientes</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Superficie</option>
            </select>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No se han encontrado propiedades disponibles en este momento.
          </div>
        ) : (
          /* Mantenemos tu layout grid pero inyectando los datos del XML */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}