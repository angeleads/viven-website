import { Check, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
                alt="Edificio residencial Viven Capital"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl max-w-xs border border-slate-800">
              <div className="text-4xl font-extrabold text-blue-500">12%</div>
              <div className="text-sm text-gray-300 mt-1">de rentabilidad anual en menos de 12 meses</div>
            </div>
          </div>

          <div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Quiénes somos</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Invierte en algo que puedas tocar. <span className="text-blue-600">Invierte en Real Estate.</span>
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed text-base">
              <p>
                <strong className="text-gray-900 font-semibold">Viven Capital SL</strong> es una empresa de inversión inmobiliaria que brinda acceso a <strong className="text-gray-900 font-semibold">oportunidades únicas</strong> no accesibles a través de la red tradicional de Bancos, Fondos Mutuos y Sociedades Patrimoniales.
              </p>
              <p>
                El conocimiento experto del mercado y una sólida red de contactos es nuestra <strong className="text-gray-900 font-semibold">ventaja competitiva</strong>.
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Check size={14} />
                </div>
                <span className="text-sm font-medium text-gray-800">12% anual de rentabilidad</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Check size={14} />
                </div>
                <span className="text-sm font-medium text-gray-800">Fondo de inversión en España</span>
              </div>
            </div>

            <a
              href="#inversiones"
              className="mt-8 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Conoce más <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}