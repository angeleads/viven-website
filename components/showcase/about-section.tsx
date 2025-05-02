import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/pictures/room.jpg"
                alt="Equipo Viven Inmobiliaria"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600 rounded-xl transform -translate-x-6 -translate-y-6 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-red-500 rounded-xl transform translate-x-6 translate-y-6 -z-20"></div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Sobre Viven Inmobiliaria</h2>
            <p className="text-lg text-gray-600 mb-8">
              Somos una empresa inmobiliaria con más de 15 años de experiencia en el mercado español. Nuestro compromiso
              es ofrecer un servicio personalizado y de calidad, adaptado a las necesidades específicas de cada cliente.
            </p>

            <div className="space-y-4 mb-8">
              <FeatureItem text="Equipo de profesionales altamente cualificados" />
              <FeatureItem text="Asesoramiento personalizado en cada operación" />
              <FeatureItem text="Amplia cartera de propiedades exclusivas" />
              <FeatureItem text="Tecnología avanzada para una mejor experiencia" />
              <FeatureItem text="Transparencia y confianza en cada paso" />
            </div>

            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-4xl font-bold text-blue-600 mb-2">+1500</p>
                <p className="text-gray-600">Propiedades vendidas</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-4xl font-bold text-blue-600 mb-2">+3000</p>
                <p className="text-gray-600">Clientes satisfechos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start">
      <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
      <p className="text-gray-700">{text}</p>
    </div>
  )
}
