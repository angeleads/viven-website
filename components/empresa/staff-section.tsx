import type React from "react"
import { Users, Scale, Wrench, Brush, Lightbulb } from "lucide-react"

export default function StaffSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nuestro Staff Profesional</h2>
          <p className="text-lg text-gray-600">
            En nuestro Staff contamos con profesionales altamente cualificados en diversas áreas para ofrecer un
            servicio integral y de máxima calidad.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <StaffCard
            icon={<Users className="h-10 w-10 text-blue-600" />}
            title="Administradores Colegiados"
            description="Expertos en gestión de comunidades y activos inmobiliarios"
          />
          <StaffCard
            icon={<Scale className="h-10 w-10 text-blue-600" />}
            title="Abogados"
            description="Asesoramiento legal especializado en el sector inmobiliario"
          />
          <StaffCard
            icon={<Lightbulb className="h-10 w-10 text-blue-600" />}
            title="Arquitectos"
            description="Diseño y supervisión de proyectos arquitectónicos"
          />
          <StaffCard
            icon={<Wrench className="h-10 w-10 text-blue-600" />}
            title="Electricistas y Fontaneros"
            description="Mantenimiento y reparaciones profesionales"
          />
          <StaffCard
            icon={<Brush className="h-10 w-10 text-blue-600" />}
            title="Equipos de Limpieza"
            description="Servicios de limpieza y mantenimiento de propiedades"
          />
        </div>
      </div>
    </section>
  )
}

interface StaffCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function StaffCard({ icon, title, description }: StaffCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
