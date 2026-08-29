import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function CallToAction() {
  const t = useTranslations("empresa.callToAction")

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="bg-white hover:bg-gray-100 text-blue-600 font-medium px-8 py-3 rounded-xl transition-colors duration-300"
            >
              {t("cta.contact")}
            </Link>
            <Link
              href="/servicios"
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-xl transition-colors duration-300"
            >
              {t("cta.services")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
