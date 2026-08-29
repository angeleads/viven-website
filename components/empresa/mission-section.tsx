import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function MissionSection() {
  const t = await getTranslations("empresa.missionSection")

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("title")}</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t("description")}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  {t("points.point1")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  {t("points.point2")}
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  {t("points.point3")}
                </p>
              </div>
            </div>

            <p className="text-xl font-semibold text-blue-600">{t("tagline")}</p>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/pictures/deal-house.jpg"
                alt={t("imageAlt")}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600 rounded-xl transform -translate-x-6 -translate-y-6 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-red-500 rounded-xl transform translate-x-6 translate-y-6 -z-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
