import { useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";

export default function AboutSection() {
  const t = useTranslations("inversion.about");

  return (
    <section id="nosotros" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
                alt={t("imageAlt")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-2xl max-w-xs border border-slate-800">
              <div className="text-4xl font-extrabold text-blue-500">{t("badgeProfitValue")}</div>
              <div className="text-sm text-gray-300 mt-1">{t("badgeProfitText")}</div>
            </div>
          </div>

          <div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">{t("badge")}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {t("titleStart")} <span className="text-blue-600">{t("titleHighlight")}</span>
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed text-base">
              <p>
                <strong className="text-gray-900 font-semibold">Viven Capital SL</strong> {t("p1Part1")}{" "}
                <strong className="text-gray-900 font-semibold">{t("p1Highlight")}</strong> {t("p1Part2")}
              </p>
              <p>
                {t("p2Part1")}{" "}
                <strong className="text-gray-900 font-semibold">{t("p2Highlight")}</strong>
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Check size={14} />
                </div>
                <span className="text-sm font-medium text-gray-800">{t("feature1")}</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Check size={14} />
                </div>
                <span className="text-sm font-medium text-gray-800">{t("feature2")}</span>
              </div>
            </div>

            <a
              href="#inversiones"
              className="mt-8 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              {t("ctaMore")} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
