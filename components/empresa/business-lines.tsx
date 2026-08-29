import { Link } from "@/i18n/navigation"
import { Building2, Home, Users, Shield, Lightbulb, Award } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function BusinessLines() {
  const t = await getTranslations("empresa.businessLines")

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("title")}</h2>
          <p className="text-lg text-gray-600">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* REMAX VIVEN */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-3 rounded-xl mr-4">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600">{t("remax.title")}</h3>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {t("remax.description")}
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t("remax.features.personalAttention.title")}</h4>
                  <p className="text-gray-600 text-sm">
                    {t("remax.features.personalAttention.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t("remax.features.globalExperience.title")}</h4>
                  <p className="text-gray-600 text-sm">
                    {t("remax.features.globalExperience.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/remax"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                {t("remax.cta")}
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

          {/* VIVEN +Plus */}
          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 shadow-lg border border-red-100">
            <div className="flex items-center mb-6">
              <div className="bg-red-600 p-3 rounded-xl mr-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-red-600">{t("plus.title")}</h3>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {t("plus.description")}
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3 mt-1">
                  <Shield className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t("plus.features.transparentManagement.title")}</h4>
                  <p className="text-gray-600 text-sm">
                    {t("plus.features.transparentManagement.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3 mt-1">
                  <Lightbulb className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t("plus.features.constantInnovation.title")}</h4>
                  <p className="text-gray-600 text-sm">
                    {t("plus.features.constantInnovation.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/servicios/administracion-comunidades"
                className="inline-flex items-center text-red-600 font-medium hover:text-red-800 transition-colors"
              >
                {t("plus.cta")}
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
        </div>
      </div>
    </section>
  )
}
