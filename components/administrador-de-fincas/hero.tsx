import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("administradorDeFincas.hero");

  return (
    <section className="pt-32 pb-20 relative">
      <img src="/hero-community.jpg" alt={t("imageAlt")} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container mx-auto px-6 relative text-white">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white">
            {t("titleStart")}{" "}
            <span className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-800 bg-clip-text text-transparent">{t("titleHighlight")}</span>
            <br />
            {t("titleEnd")}
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl text-gray-200">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contacto"
              className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all inline-flex items-center justify-center"
            >
              {t("cta.contact")}
            </Link>
            <a
              href="https://vivenvng.administraciononline.taaf.es/#/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all inline-flex items-center justify-center"
            >
              {t("cta.app")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
