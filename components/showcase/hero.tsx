import Link from "next/link";
import { Search, MapPin, Home, Euro } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20 md:py-28">
      <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/pictures/showcase-hero-background.png')",
            }}
          ></div>
        </div>
  
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Encuentra en tu Agencia Inmobiliaria en Vilanova i La Geltrú
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Viven Inmobiliaria te ayuda a encontrar la propiedad perfecta con
            los mejores servicios y asesoramiento personalizado.
          </p>

          {/* Search Box */}
          <div className="bg-gray-400/40 p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white-700 flex items-center gap-2">
                  <MapPin size={16} className="text-blue-600" />
                  Ubicación
                </label>
                <select className="w-full p-3 border bg-blue-100 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Toda España</option>
                  <option>Madrid</option>
                  <option>Barcelona</option>
                  <option>Valencia</option>
                  <option>Sevilla</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white-700 flex items-center gap-2">
                  <Home size={16} className="text-blue-600" />
                  Tipo de propiedad
                </label>
                <select className="w-full p-3 border  bg-blue-100 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Cualquier tipo</option>
                  <option>Piso</option>
                  <option>Casa</option>
                  <option>Chalet</option>
                  <option>Local comercial</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white-700 flex items-center gap-2">
                  <Euro size={16} className="text-blue-600" />
                  Precio máximo
                </label>
                <select className="w-full p-3 border  bg-blue-100 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Sin límite</option>
                  <option>100.000 €</option>
                  <option>200.000 €</option>
                  <option>300.000 €</option>
                  <option>500.000 €</option>
                  <option>1.000.000 €</option>
                </select>
              </div>
            </div>

            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-3xl font-medium flex items-center justify-center gap-2 transition-colors duration-300">
              <Search size={20} />
              Buscar propiedades
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-white">
            <Link
              href="/venta"
              className="flex items-center gap-2 hover:underline"
            >
              <span className="bg-white/20 p-1 rounded">
                <Home size={16} />
              </span>
              +500 Propiedades
            </Link>
            <Link
              href="/servicios"
              className="flex items-center gap-2 hover:underline"
            >
              <span className="bg-white/20 p-1 rounded">
                <MapPin size={16} />
              </span>
              En toda España
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
    </section>
  );
}
