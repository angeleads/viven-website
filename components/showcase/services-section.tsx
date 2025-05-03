import type React from "react"
import { Building2, Scale, Home, BarChart3, Construction } from "lucide-react"

interface ServiceCategory {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  services: string[]
}

export default function ServicesSection() {
  const serviceCategories: ServiceCategory[] = [
    {
      id: "community",
      title: "Gestión de Comunidades",
      icon: <Building2 className="h-6 w-6" />,
      color: "blue",
      services: [
        "Control de incidencias",
        "Asesoramiento legal",
        "Control presupuestario",
        "Control de morosidad",
        "Ahorro de costes",
        "Gestión de subvenciones",
      ],
    },
    {
      id: "property",
      title: "Servicios Inmobiliarios",
      icon: <Home className="h-6 w-6" />,
      color: "red",
      services: ["Compra", "Venta", "Alquiler", "Todo tipo de inmuebles", "Inversores", "Socimis"],
    },
    {
      id: "construction",
      title: "Construcción y Reformas",
      icon: <Construction className="h-6 w-6" />,
      color: "amber",
      services: ["Arquitectura", "Certificaciones", "Ejecución obra nueva", "Reformas"],
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nuestros Servicios</h2>
          <p className="text-lg text-gray-600">
            En Viven ofrecemos una amplia gama de servicios inmobiliarios para satisfacer todas tus necesidades.
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
