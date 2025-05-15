import type React from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contacta con nosotros</h2>
          <p className="text-lg text-gray-600">
            Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo para resolver todas tus dudas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tu email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tu teléfono"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Asunto
                  </label>
                  <select
                    id="subject"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Compra de propiedad</option>
                    <option>Venta de propiedad</option>
                    <option>Alquiler</option>
                    <option>Inversión</option>
                    <option>Gestión de Comunidades</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300"
                  >
                    Enviar mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-blue-600 text-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>

              <div className="space-y-6">
                  <ContactItem
                    icon={<MapPin className="h-6 w-6" />}
                    title="Dirección"
                    content="Pelegrí Ballester, 23 Vilanova I La Geltrú 08800 (Barcelona)"
                  />
                <ContactItem icon={<Phone className="h-6 w-6" />} title="Teléfono" content="930 267 436" />

                <ContactItem icon={<Mail className="h-6 w-6" />} title="Email" content="hola@viven.es" />

                <ContactItem
                  icon={<Clock className="h-6 w-6" />}
                  title="Horario"
                  content="Lunes a Jueves: 9:00 - 19:00 y Viernes: 8:00 - 15:00"
                />
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl overflow-hidden h-80">
              {/* Aquí iría un mapa, pero por ahora usamos un placeholder */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0135584121313!2d1.7177025765771565!3d41.22147500626918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a386fbdda9e279%3A0x1beaed70bdc17530!2sCarrer%20de%20Pelegr%C3%AD%20Ballester%2C%2023%2C%2008800%20Vilanova%20i%20la%20Geltr%C3%BA%2C%20Barcelona!5e0!3m2!1sfr!2ses!4v1746185046790!5m2!1sfr!2ses" width="600" height="450" className="w-full h-full bg-gray-300 flex items-center justify-center" loading="lazy"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactItem({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode
  title: string
  content: string
}) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4 mt-1">{icon}</div>
      <div>
        <h4 className="font-medium text-white/90 mb-1">{title}</h4>
        <p className="text-white/80">{content}</p>
      </div>
    </div>
  )
}
