import { Star } from "lucide-react";

const products = [
  {
    name: "Viven Préstamo Participativo",
    tag: "Renta fija",
    strategy: "Financiación de inversiones inmobiliarias vía préstamos con garantía hipotecaria.",
    goal: "Preservación del capital. Sin fluctuación. Rendimientos ajustados al riesgo.",
    irr: "10 – 12% IRR",
    time: "12 meses",
    featured: false,
  },
  {
    name: "Viven Real Estate — Situaciones Especiales",
    tag: "Crecimiento",
    strategy: "Compra, transformación y venta de oportunidades inmobiliarias en situaciones especiales.",
    goal: "Crecimiento del capital invertido. Margen de seguridad amplio.",
    irr: "24 – 26% IRR",
    time: "24 meses",
    featured: true,
  },
  {
    name: "Viven Compra Activo con Rentabilidad",
    tag: "Ingresos pasivos",
    strategy: "Seleccionamos cuidadosamente los mejores inmuebles para compra y alquiler, buscando una rentabilidad superior.",
    goal: "Preservación de patrimonio sin fluctuación e ingresos pasivos.",
    irr: "10 – 12% IRR",
    time: "Permanente",
    featured: false,
  },
];

export default function ProductsSection() {
  return (
    <section id="inversiones" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Nuestras estrategias</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">Productos de inversión</h2>
          <p className="mt-3 text-gray-600">
            Tres vehículos diseñados para distintos perfiles de riesgo y horizonte temporal.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3 items-stretch">
          {products.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all ${
                p.featured
                  ? "bg-slate-900 text-white shadow-2xl ring-2 ring-blue-600"
                  : "bg-white text-gray-900 border border-gray-200 shadow-md hover:shadow-xl"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3.5 left-8 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Star size={12} fill="currentColor" /> Destacado
                </div>
              )}
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${
                    p.featured ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {p.tag}
                </span>
                <h3 className="mt-2 text-2xl font-bold leading-snug">{p.name}</h3>

                <div className="mt-6 space-y-4 text-sm leading-relaxed">
                  <div>
                    <span className={`font-semibold block ${p.featured ? "text-gray-300" : "text-gray-700"}`}>
                      Estrategia:
                    </span>
                    <span className={p.featured ? "text-gray-400" : "text-gray-600"}>{p.strategy}</span>
                  </div>
                  <div>
                    <span className={`font-semibold block ${p.featured ? "text-gray-300" : "text-gray-700"}`}>
                      Objetivo:
                    </span>
                    <span className={p.featured ? "text-gray-400" : "text-gray-600"}>{p.goal}</span>
                  </div>
                </div>
              </div>

              <div
                className={`mt-8 pt-6 border-t grid grid-cols-2 gap-4 ${
                  p.featured ? "border-slate-800" : "border-gray-100"
                }`}
              >
                <div>
                  <div className={`text-xs uppercase tracking-wider font-medium ${p.featured ? "text-gray-400" : "text-gray-500"}`}>
                    Rentabilidad
                  </div>
                  <div className={`text-xl font-bold mt-1 ${p.featured ? "text-blue-400" : "text-blue-600"}`}>
                    {p.irr}
                  </div>
                </div>
                <div>
                  <div className={`text-xs uppercase tracking-wider font-medium ${p.featured ? "text-gray-400" : "text-gray-500"}`}>
                    Horizonte
                  </div>
                  <div className={`text-xl font-bold mt-1 ${p.featured ? "text-white" : "text-gray-900"}`}>
                    {p.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}