import { useTranslations } from "next-intl";

export default function ProcessSection() {
  const t = useTranslations("inversion.process");

  const processSteps = [
    { n: t("steps.step1.n"), title: t("steps.step1.title"), desc: t("steps.step1.desc") },
    { n: t("steps.step2.n"), title: t("steps.step2.title"), desc: t("steps.step2.desc") },
    { n: t("steps.step3.n"), title: t("steps.step3.title"), desc: t("steps.step3.desc") },
    { n: t("steps.step4.n"), title: t("steps.step4.title"), desc: t("steps.step4.desc") },
    { n: t("steps.step5.n"), title: t("steps.step5.title"), desc: t("steps.step5.desc") },
    { n: t("steps.step6.n"), title: t("steps.step6.title"), desc: t("steps.step6.desc") },
  ];

  return (
    <section id="proceso" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">{t("badge")}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {t("titleStart")} <span className="text-blue-600">{t("titleHighlight")}</span>
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-md">
              {t("description")}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600"
                  alt={t("imageAlts.renovatedInterior")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600"
                  alt={t("imageAlts.renovation")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600"
                  alt={t("imageAlts.renovatedKitchen")}
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
