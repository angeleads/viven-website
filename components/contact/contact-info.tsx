import type React from "react"
import { MapPin, Phone, Mail, Clock, MessageSquare, Users } from "lucide-react"

export default function ContactInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactCard
              icon={<Phone className="h-8 w-8 text-blue-600" />}
              title="Llámanos"
              content={
                <>
                  <p className="mb-2">
                    <a href="tel:+34930267436" className="text-gray-700 hover:text-blue-600 transition-colors">
                    +34 930 267 436
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
                </>
              }
            />

            <ContactCard
              icon={<MapPin className="h-8 w-8 text-blue-600" />}
              title="Visítanos"
              content={
                <>
                  <p className="text-gray-700">
                  Carrer de Pelegrí Ballester, 23,
                    <br />
                    08800 Vilanova i la Geltrú, Barcelona
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
