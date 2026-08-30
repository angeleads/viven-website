import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("inversion.hero");

  return (
    <section className="relative text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950">
      {/* 1. Direct Background Image Container */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url('/pictures/inversion-hero.jpg')`,
        }}
      />

      {/* 2. Red & Blue Tint Overlay (High-visibility gradient) */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 58, 138, 0.65) 50%, rgba(153, 27, 27, 0.65) 100%)`,
        }}
      />

      {/* 3. Subtle Dark Vignette for Text Contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none" />

      {/* 4. Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <ShieldCheck size={14} /> {t("badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t("titleStart")} <span className="text-blue-400">{t("titleHighlight")}</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-200 font-normal leading-relaxed max-w-2xl">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#inversiones"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30"
            >
              {t("ctaProducts")} <ArrowRight size={18} />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all backdrop-blur-md"
            >
              {t("ctaInvest")}
            </a>
          </div>

          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">{t("stats.stat1Value")}</div>
              <div className="text-xs uppercase tracking-wider text-gray-300 mt-1">{t("stats.stat1Label")}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">{t("stats.stat2Value")}</div>
              <div className="text-xs uppercase tracking-wider text-gray-300 mt-1">{t("stats.stat2Label")}</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">{t("stats.stat3Value")}</div>
              <div className="text-xs uppercase tracking-wider text-gray-300 mt-1">{t("stats.stat3Label")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}