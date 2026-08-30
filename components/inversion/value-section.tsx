import { useTranslations } from "next-intl";
import { TrendingUp, Shield, Droplets, Eye } from "lucide-react";

export default function ValuesSection() {
  const t = useTranslations("inversion.values");

  const values = [
    {
      icon: TrendingUp,
      title: t("items.profitability.title"),
      desc: t("items.profitability.desc"),
    },
    {
      icon: Shield,
      title: t("items.protection.title"),
      desc: t("items.protection.desc"),
    },
    {
      icon: Droplets,
      title: t("items.liquidity.title"),
      desc: t("items.liquidity.desc"),
    },
    {
      icon: Eye,
      title: t("items.transparency.title"),
      desc: t("items.transparency.desc"),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{t("badge")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">{t("title")}</h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-slate-800/80 border border-slate-700/80 p-8 rounded-2xl hover:border-blue-500/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <v.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
