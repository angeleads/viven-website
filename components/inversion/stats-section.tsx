export default function StatsSection() {
  return (
    <section className="py-20 md:py-28 bg-blue-50/60 border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-2">
            <div className="text-7xl sm:text-8xl font-black text-blue-600 tracking-tight leading-none">7%</div>
            <div className="mt-4 text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              de los ciudadanos españoles invierte su dinero
            </div>
          </div>
          <div className="lg:col-span-3 space-y-4 text-gray-700 leading-relaxed text-base">
            <p>
              <strong className="text-gray-900 font-semibold">Viven Capital</strong> se dedica a maximizar los ahorros de los inversores a través de oportunidades de inversión inmobiliaria en España, garantizando seguridad financiera y rendimientos estables.
            </p>
            <p>
              Con un enfoque en la <span className="font-semibold text-gray-900">confianza</span> y la <span className="font-semibold text-gray-900">transparencia</span>, el equipo de Viven Capital SL cuenta con experiencia y un historial probado, ofreciendo propiedades a precios competitivos y con garantías fuertes. Invitamos a nuestros inversores a colaborar para lograr sus metas financieras de forma segura y eficaz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}