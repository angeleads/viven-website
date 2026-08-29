import type React from "react"
import { Briefcase, ListChecks, Wrench, Scale, PieChart, Home } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function ServicesSection() {
  const t = await getTranslations("administradorDeFincas.servicesSection")

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">
          {t("title")}
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          {t("description")}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div
              className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4"
            >
              <Briefcase className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("cards.professionalExperience.title")}</h3>
            <p className="text-gray-600">
              {t("cards.professionalExperience.description")}
            </p>
          </div>

          <div
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div
              className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4"
            >
              <ListChecks className="h-10 w-10 text-blue-600"/>
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("cards.efficientManagement.title")}</h3>
            <p className="text-gray-600">
              {t("cards.efficientManagement.description")}
            </p>
          </div>

          <div
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div
              className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4"
            >
              <Wrench className="h-10 w-10 text-blue-600"/>
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("cards.comprehensiveMaintenance.title")}</h3>
            <p className="text-gray-600">
              {t("cards.comprehensiveMaintenance.description")}
            </p>
          </div>

          <div
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div
              className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4"
            >
              <Scale className="h-10 w-10 text-blue-600"/>
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("cards.legalAdvice.title")}</h3>
            <p className="text-gray-600">
              {t("cards.legalAdvice.description")}
            </p>
          </div>

          <div
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div
              className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4"
            >
              <PieChart className="h-10 w-10 text-blue-600"/>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {t("cards.transparentFinancialManagement.title")}
            </h3>
            <p className="text-gray-600">
              {t("cards.transparentFinancialManagement.description")}
            </p>
          </div>

          <div
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div
              className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4"
            >
              <Home className="h-10 w-10 text-blue-600"/>
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("cards.communityImprovement.title")}</h3>
            <p className="text-gray-600">
              {t("cards.communityImprovement.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}