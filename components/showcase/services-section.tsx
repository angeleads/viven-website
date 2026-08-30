import type React from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Building2, Home, Construction, ArrowUpRight } from "lucide-react"

interface ServiceCategory {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  href: string
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
      href: "/administrador-de-fincas",
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
      href: "/propiedades", // Path for Servicios inmobiliarios / Propiedades
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
      href: "https://www.remem.es",
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
      bg: "bg-blue-50/80 hover:bg-blue-50",
      border: "border-blue-100 hover:border-blue-300",
      icon: "bg-blue-100 text-blue-600",
      title: "text-blue-600",
      arrow: "text-blue-500 bg-blue-100/80 group-hover:bg-blue-600 group-hover:text-white",
    },
    red: {
      bg: "bg-red-50/80 hover:bg-red-50",
      border: "border-red-100 hover:border-red-300",
      icon: "bg-red-100 text-red-600",
      title: "text-red-600",
      arrow: "text-red-500 bg-red-100/80 group-hover:bg-red-600 group-hover:text-white",
    },
    amber: {
      bg: "bg-amber-50/80 hover:bg-amber-50",
      border: "border-amber-100 hover:border-amber-300",
      icon: "bg-amber-100 text-amber-600",
      title: "text-amber-600",
      arrow: "text-amber-500 bg-amber-100/80 group-hover:bg-amber-600 group-hover:text-white",
    },
  }

  const colors = colorClasses[category.color as keyof typeof colorClasses]
  const isExternal = category.href.startsWith("http")

  return (
    <Link
      href={category.href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group relative flex flex-col justify-between ${colors.bg} rounded-2xl p-6 border ${colors.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-xl ${colors.icon} mr-4 transition-transform duration-300 group-hover:scale-110`}>
              {category.icon}
            </div>
            <h3 className={`text-xl font-bold ${colors.title}`}>{category.title}</h3>
          </div>

          {/* Redirect indicator icon */}
          <div className={`p-2 rounded-full ${colors.arrow} transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-sm`}>
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <ul className="space-y-3">
          {category.services.map((service, index) => (
            <li key={index} className="flex items-center">
              <div className={`h-1.5 w-1.5 rounded-full ${colors.icon} mr-3`}></div>
              <span className="text-gray-700 font-medium">{service}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Subtle indicator bar on bottom hover */}
      <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-end text-xs font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
        <span className={colors.title}>Ver más →</span>
      </div>
    </Link>
  )
}