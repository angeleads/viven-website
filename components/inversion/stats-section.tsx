import { useTranslations } from "next-intl";

export default function StatsSection() {
  const t = useTranslations("inversion.stats");

  return (
    <section className="py-20 md:py-28 bg-blue-50/60 border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-2">
            <div className="text-7xl sm:text-8xl font-black text-blue-600 tracking-tight leading-none">
              {t("percentage")}
            </div>
            <div className="mt-4 text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {t("statText")}
            </div>
          </div>
          <div className="lg:col-span-3 space-y-4 text-gray-700 leading-relaxed text-base">
            <p>
              <strong className="text-gray-900 font-semibold">{t("p1Company")}</strong> {t("p1Text")}
            </p>
            <p>
              {t("p2Focus")} <span className="font-semibold text-gray-900">{t("p2Trust")}</span> {t("p2And")}{" "}
              <span className="font-semibold text-gray-900">{t("p2Transparency")}</span>
              {t("p2Text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
