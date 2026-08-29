import { Leaf, Heart, Zap } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function ValuesSection() {
  const t = await getTranslations("empresa.valuesSection")

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("title")}</h2>
          <p className="text-lg text-gray-600">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Environmental Commitment */}
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 hover:shadow-green-500 border border-green-100 text-center">
            <div className="bg-green-100 p-4 rounded-full inline-flex justify-center items-center mb-6">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t("cards.environment.title")}</h3>
            <p className="text-gray-600">
              {t("cards.environment.description")}
            </p>
          </div>

          {/* Social Responsibility */}
          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 hover:shadow-red-500 border border-red-100 text-center">
            <div className="bg-red-100 p-4 rounded-full inline-flex justify-center items-center mb-6">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t("cards.social.title")}</h3>
            <p className="text-gray-600">
              {t("cards.social.description")}
            </p>
          </div>

          {/* Innovation */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 hover:shadow-blue-500 border border-blue-100 text-center">
            <div className="bg-blue-100 p-4 rounded-full inline-flex justify-center items-center mb-6">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t("cards.innovation.title")}</h3>
            <p className="text-gray-600">
              {t("cards.innovation.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
