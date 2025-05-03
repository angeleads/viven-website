import type React from "react"
import { MapPin, Phone, Mail, Clock, MessageSquare, Users } from "lucide-react"

export default function ContactInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard
              icon={<Phone className="h-8 w-8 text-blue-600" />}
              title="Llámanos"
              content={
                <>
                  <p className="mb-2">
                    <a href="tel:+34912345678" className="text-gray-700 hover:text-blue-600 transition-colors">
                      +34 91 234 56 78
                    </a>
                  </p>
                  <p>
                    <a href="tel:+34623456789" className="text-gray-700 hover:text-blue-600 transition-colors">
                      +34 62 345 67 89
                    </a>
                  </p>
                </>
              }
            />

            <ContactCard
              icon={<Mail className="h-8 w-8 text-blue-600" />}
              title="Escríbenos"
              content={
                <>
                  <p className="mb-2">
                    <a href="mailto:info@viven.es" className="text-gray-700 hover:text-blue-600 transition-colors">
                      info@viven.es
                    </a>
                  </p>
                  <p>
                    <a href="mailto:ventas@viven.es" className="text-gray-700 hover:text-blue-600 transition-colors">
                      ventas@viven.es
                    </a>
                  </p>
                </>
              }
            />

            <ContactCard
              icon={<MessageSquare className="h-8 w-8 text-blue-600" />}
              title="Chat en vivo"
              content={
                <>
                  <p className="mb-2 text-gray-700">Chatea con nuestros agentes en tiempo real</p>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    Iniciar chat
                  </button>
                </>
              }
            />

            <ContactCard
              icon={<MapPin className="h-8 w-8 text-blue-600" />}
              title="Visítanos"
              content={
                <>
                  <p className="text-gray-700">
                    Calle Gran Vía 28
                    <br />
                    28013 Madrid, España
                  </p>
                </>
              }
            />

            <ContactCard
              icon={<Clock className="h-8 w-8 text-blue-600" />}
              title="Horario"
              content={
                <>
                  <p className="mb-2 text-gray-700">Lunes a Viernes: 9:00 - 20:00</p>
                  <p className="text-gray-700">Sábados: 10:00 - 14:00</p>
                </>
              }
            />

            <ContactCard
              icon={<Users className="h-8 w-8 text-blue-600" />}
              title="Atención al cliente"
              content={
                <>
                  <p className="text-gray-700">
                    Servicio 24/7 para clientes
                    <br />
                    <span className="text-blue-600 font-medium">365 días al año</span>
                  </p>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface ContactCardProps {
  icon: React.ReactNode
  title: string
  content: React.ReactNode
}

function ContactCard({ icon, title, content }: ContactCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex flex-col items-center text-center">
        <div className="bg-blue-50 p-4 rounded-full mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <div>{content}</div>
      </div>
    </div>
  )
}
