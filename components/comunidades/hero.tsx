import { Heart, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("comunidades.hero");

  return (
    <section className="pt-32 pb-20 relative">
      <img src="/hero-community.jpg" alt="Hero Image" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-red-500 to-blue-800 opacity-50"></div>
      <div className="container mx-auto px-6 relative text-white flex flex-col md:flex-row items-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {t("titleStart")} <span className="text-red-500 underline">{t("titleHighlight")}</span> <br />
            {t("titleEnd")}
          </h1>

          <p className="text-white">{t("descriptionStart")} <span className="font-bold">{t("descriptionHighlight")}</span>. {t("descriptionEnd")}</p>


          <div className="my-3 space-y-2 space-x-2">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all inline-flex items-center justify-center">
              {t("cta.primary")}
            </button>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all inline-flex items-center justify-center">
              {t("cta.secondary")}
            </button>
          </div>

        </div>
        <div className="hidden lg:grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white/20 border border-white/30 p-6 rounded-2xl h-full min-h-[140px]">
              <Heart size={32} className="text-red-500" />
              <p className="text-white mt-2">{t("cards.closeness.title")}</p>
              <p className="text-white text-sm">{t("cards.closeness.text")}</p>
            </div>
            <div className="bg-white/20 border border-white/30 p-6 rounded-2xl h-full min-h-[140px]">
              <ShieldCheck size={32} className="text-red-500" />
              <p className="text-white mt-2">{t("cards.transparency.title")}</p>
              <p className="text-white text-sm">{t("cards.transparency.text")}</p>
            </div>
            <div className="bg-white/20 border border-white/30 p-6 rounded-2xl h-full min-h-[140px]">
              <Users size={32} className="text-red-500" />
              <p className="text-white mt-2">{t("cards.customized.title")}</p>
              <p className="text-white text-sm">{t("cards.customized.text")}</p>
            </div>
            <div className="bg-white/20 border border-white/30 p-6 rounded-2xl h-full min-h-[140px]">
              <TrendingUp size={32} className="text-red-500" />
              <p className="text-white mt-2">{t("cards.technology.title")}</p>
              <p className="text-white text-sm">{t("cards.technology.text")}</p>
            </div>
        </div>
      </div>
    </section>
  );
}
