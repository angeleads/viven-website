import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function MissionSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nos enorgullece ir creciendo y consolidando día a día el trabajo que realiza nuestro equipo humano,
              formado por los mejores profesionales en sus ámbitos de actuación. Así, desde VIVEN nos encargamos de
              todas las gestiones que puedan estar relacionadas con su activo inmobiliario, con el afán de darle valor y
              velar por el incremento de su patrimonio.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  Desde las Comunidades de Propietarios hasta el apartamento en alquiler, son tratados con la debida
                  diligencia, optimizados y mejorados en lo posible.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  El mundo de servicios que le ofrece VIVEN solo empieza cuando descuelga el teléfono para contactarnos.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  A partir de ahí, nos explica sus necesidades y nosotros le ayudaremos con las mejores soluciones
                  adaptadas y personalizadas para usted.
                </p>
              </div>
            </div>

            <p className="text-xl font-semibold text-blue-600">En VIVEN personalizamos su Experiencia Inmobiliaria</p>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Equipo Viven Inmobiliaria"
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
