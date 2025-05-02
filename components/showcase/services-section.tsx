import type React from "react"
import { Briefcase, ListChecks, Wrench, Scale, PieChart, Home } from "lucide-react"

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">
          Nuestros Servicios Premium
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Como administrador de fincas en Vilanova i La Geltrú, ofrecemos una
          gestión eficiente y profesional para su comunidad de propietarios.
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
            <h3 className="text-2xl font-bold mb-4">Experiencia Profesional</h3>
            <p className="text-gray-600">
              Equipo altamente capacitado con experiencia en aspectos legales,
              financieros, técnicos y de mantenimiento para una administración
              sólida.
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
            <h3 className="text-2xl font-bold mb-4">Gestión Eficiente</h3>
            <p className="text-gray-600">
              Nos encargamos de la contabilidad, resolución de conflictos y
              coordinación de servicios para el óptimo funcionamiento de su
              comunidad.
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
            <h3 className="text-2xl font-bold mb-4">Mantenimiento Integral</h3>
            <p className="text-gray-600">
              Inspecciones periódicas, reparaciones y servicios de calidad para
              mantener las propiedades en óptimas condiciones.
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
            <h3 className="text-2xl font-bold mb-4">Asesoramiento Legal</h3>
            <p className="text-gray-600">
              Gestión de obligaciones legales y fiscales, asegurando el
              cumplimiento normativo y la optimización fiscal.
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
              Gestión Financiera Transparente
            </h3>
            <p className="text-gray-600">
              Informes periódicos y gestión transparente de los recursos
              económicos de la comunidad.
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
            <h3 className="text-2xl font-bold mb-4">Mejora Comunitaria</h3>
            <p className="text-gray-600">
              Implementación de proyectos de mejora y optimización de servicios
              para aumentar la calidad de vida.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}