import type React from "react"
import { useTranslations } from "next-intl"
import { Building2, Scale, Home, BarChart3, Construction } from "lucide-react"

interface ServiceCategory {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  services: string[]
}

export default function ServicesSection() {
  const t = useTranslations("showcase.servicesSection")

  const serviceCategories: ServiceCategory[] = [
    {
      id: "community",
      title: t("categories.community.title"),
      icon: <Building2 className="h-6 w-6" />,
      color: "blue",
      services: [
        t("categories.community.services.0"),
        t("categories.community.services.1"),
        t("categories.community.services.2"),
        t("categories.community.services.3"),
        t("categories.community.services.4"),
        t("categories.community.services.5"),
      ],
    },
    {
      id: "property",
      title: t("categories.property.title"),
      icon: <Home className="h-6 w-6" />,
      color: "red",
      services: [
        t("categories.property.services.0"),
        t("categories.property.services.1"),
        t("categories.property.services.2"),
        t("categories.property.services.3"),
        t("categories.property.services.4"),
        t("categories.property.services.5"),
      ],
    },
    {
      id: "construction",
      title: t("categories.construction.title"),
      icon: <Construction className="h-6 w-6" />,
      color: "amber",
      services: [
        t("categories.construction.services.0"),
        t("categories.construction.services.1"),
        t("categories.construction.services.2"),
        t("categories.construction.services.3"),
      ],
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("title")}</h2>
          <p className="text-lg text-gray-600">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category) => (
            <ServiceCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  category: ServiceCategory
}

function ServiceCard({ category }: ServiceCardProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: "bg-blue-100 text-blue-600",
      title: "text-blue-600",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-100",
      icon: "bg-red-100 text-red-600",
      title: "text-red-600",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: "bg-amber-100 text-amber-600",
      title: "text-amber-600",
    },
  }

  const colors = colorClasses[category.color as keyof typeof colorClasses]

  return (
    <div
      className={`${colors.bg} rounded-xl p-6 border ${colors.border} hover:shadow-md transition-shadow duration-300`}
    >
      <div className="flex items-center mb-6">
        <div className={`p-3 rounded-xl ${colors.icon} mr-4`}>{category.icon}</div>
        <h3 className={`text-xl font-bold ${colors.title}`}>{category.title}</h3>
      </div>

      <ul className="space-y-3">
        {category.services.map((service, index) => (
          <li key={index} className="flex items-center">
            <div className={`h-1.5 w-1.5 rounded-full ${colors.icon} mr-3`}></div>
            <span className="text-gray-700">{service}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
