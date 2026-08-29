import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { CheckCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function VivenPlusSection() {
  const t = await getTranslations("empresa.vivenPlusSection")

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
            {t("badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t("subtitle")}
            </h3>
            <p className="text-gray-600 mb-8">
              {t("body")}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  <span className="font-semibold">{t("features.legalAdvice.title")}</span>{" "}{t("features.legalAdvice.text")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  <span className="font-semibold">{t("features.budgetControl.title")}</span>{" "}{t("features.budgetControl.text")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  <span className="font-semibold">{t("features.incidentManagement.title")}</span>{" "}{t("features.incidentManagement.text")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  <span className="font-semibold">{t("features.customerSupport.title")}</span>{" "}{t("features.customerSupport.text")}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/servicios/administracion-comunidades"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-3xl font-medium transition-colors duration-300 inline-flex items-center"
              >
                {t("cta")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/pictures/community.jpg"
                  alt={t("imageAlt")}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-xl transform -translate-x-6 -translate-y-6 -z-10"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-blue-600 rounded-xl transform translate-x-6 translate-y-6 -z-20"></div>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-xl p-8 text-center">
          <p className="text-xl md:text-2xl font-bold italic text-blue-700">
            {t("quote")}
          </p>
        </div>
      </div>
    </section>
  )
}
