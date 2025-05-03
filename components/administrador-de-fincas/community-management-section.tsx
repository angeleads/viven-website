import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Scale, Calculator, AlertCircle, Clock } from "lucide-react"

export default function CommunityManagementSection() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
              VIVEN +Plus
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Una nueva forma de administrar su comunidad
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              En VIVEN rompemos con el modelo antiguo y caduco de Administrador de Comunidad. Entendemos las Comunidades
              de Propietarios como pequeñas empresas que deben gestionarse con un enfoque proactivo, cercano, eficiente
              y transparente.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Los propietarios del patrimonio son ustedes, nosotros gestionamos su patrimonio desde la profesionalidad y
              legalidad que nos caracteriza, y velamos por el mantenimiento o incremento de la valorización del mismo.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Por eso contamos con un amplio staff de profesionales cualificados en todas las materias que puede
              demandar una Comunidad de Propietarios, para dar un servicio diferente, rápido y eficaz.
            </p>

            <div className="mt-8">
              <Link
                href="/servicios/administracion-comunidades"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center"
              >
                Más información
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

          {/* Right Column - Services and Image */}
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full opacity-50 z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-red-100 rounded-full opacity-50 z-0"></div>

            {/* Services Cards */}
            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Entre nuestros servicios se encuentran:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ServiceCard
                  icon={<Scale className="h-6 w-6 text-blue-600" />}
                  title="Asesoramiento legal"
                  description="Fiscal y jurídico, estamos atentos a las nuevas normativas que puedan afectar las comunidades."
                />

                <ServiceCard
                  icon={<Calculator className="h-6 w-6 text-blue-600" />}
                  title="Control presupuestario"
                  description="Contabilidad transparente, seguimos los presupuestos para controlar posibles desviaciones."
                />

                <ServiceCard
                  icon={<AlertCircle className="h-6 w-6 text-blue-600" />}
                  title="Control incidencias"
                  description="Gestión de incidencias, mantenimiento y preservación del edificio. Contamos con proveedores certificados."
                />

                <ServiceCard
                  icon={<Clock className="h-6 w-6 text-blue-600" />}
                  title="Atención al cliente"
                  description="24 horas al día, 365 días al año"
                />
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-center">
              <p className="text-xl md:text-2xl font-bold text-white">
                En VIVEN administramos SU COMUNIDAD como si fuera NUESTRO HOGAR
              </p>
            </div>

            {/* Building Image (Absolute positioned) */}
            <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 hidden xl:block">
              <div className="relative h-80 w-40">
                <Image
                  src="/placeholder.svg?height=400&width=200"
                  alt="Edificio de comunidad"
                  fill
                  className="object-cover rounded-l-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}
