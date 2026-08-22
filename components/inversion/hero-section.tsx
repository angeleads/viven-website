import { ArrowRight, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-slate-900 text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-950 opacity-80" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <ShieldCheck size={14} /> Viven Capital SL
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Inversión inmobiliaria <span className="text-blue-500">con visión</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl">
            Invierte en activos inmobiliarios de las principales ciudades de España. Oportunidades únicas para inversores exigentes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#inversiones"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25"
            >
              Conoce nuestros productos <ArrowRight size={18} />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all backdrop-blur-sm"
            >
              Invierte con nosotros
            </a>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">12%</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Rentabilidad anual</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">26%</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">IRR objetivo máximo</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">España</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Cobertura nacional</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}