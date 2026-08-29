import { Download } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AppSection() {
  const t = await getTranslations("showcase.appSection");

  return (
    <section id="app" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-pattern opacity-10"></div> */}
          <div className="md:flex items-center md:justify-between ">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">{t("title")}</h2>
              <p className="text-xl mb-8">
                {t("description")}
              </p>
              <a
                href="https://vivenvng.administraciononline.taaf.es/#/login"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all"
              >
                <Download className="mr-2" /> {t("cta.download")}
              </a>
            </div>
            <img
              src="/logos/viven-app-logo.png"
              alt={t("imageAlt")}
              className="max-w-sm mx-auto"
              height={200}
              width={200}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
