const processSteps = [
  { n: "01", title: "Adjudicación o compra directa", desc: "Identificamos y adquirimos activos con margen de seguridad: subastas judiciales, adjudicaciones bancarias y compra directa a propietario." },
  { n: "02", title: "Desocupación y regularización", desc: "Gestionamos la desocupación cuando es necesaria, con el respaldo legal adecuado y respetando todos los procedimientos." },
  { n: "03", title: "Inspección técnica", desc: "Auditoría estructural, técnica y documental del inmueble antes de intervenir. Presupuesto cerrado, sin sorpresas." },
  { n: "04", title: "Reforma integral", desc: "Coordinamos la reforma completa con nuestro equipo de arquitectura y ejecución, elevando el estándar y el valor del activo." },
  { n: "05", title: "Documentación al día", desc: "Cédula, ITE, certificado energético, notas simples, cargas: entregamos el inmueble con toda la documentación en regla." },
  { n: "06", title: "Venta y rentabilidad", desc: "Salida al mercado con estrategia comercial propia. La plusvalía generada se traduce en rentabilidad para el inversor." },
];

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Nuestro proceso</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Del activo con potencial al <span className="text-blue-600">retorno tangible</span>
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-md">
              Nos ocupamos de todo el ciclo del inmueble: desde la adquisición hasta la venta, pasando por reforma, documentación y puesta en valor. El inversor participa sin la carga operativa.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600"
                  alt="Interior reformado"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600"
                  alt="Reforma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600"
                  alt="Cocina reformada"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {processSteps.map((s) => (
              <div
                key={s.n}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex gap-5 items-start"
              >
                <div className="text-2xl font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg shrink-0">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}