"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, Phone, Linkedin } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  position: string
  photo: string
  description: string
  email: string
  phone: string
  linkedin?: string
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Cesar Sanjurjo",
      position: "Fundador y CEO",
      photo: "/team/cesar-sanjurjo.png",
      description:
        "Con más de 20 años de experiencia en el sector inmobiliario, Carlos fundó Viven con la visión de crear un modelo de negocio estable e innovador.",
      email: "carlos@viven.es",
      phone: "+34 612 345 678",
      linkedin: "https://linkedin.com/in/carlosrodriguez",
    },
    {
      id: 2,
      name: "Ángeles Marcos",
      position: "Directora de RE/MAX VIVEN",
      photo: "/team/angeles-marcos.png",
      description:
        "Especialista en comercialización de propiedades de lujo, Ana lidera el equipo de agentes asociados de RE/MAX VIVEN.",
      email: "ana@viven.es",
      phone: "+34 623 456 789",
    },
    {
      id: 3,
      name: "Hector Alarcon",
      position: "Director de VIVEN +Plus",
      photo: "/team/hector-alarcon.png",
      description:
        "Experto en gestión patrimonial, Miguel ha revolucionado la administración de comunidades con un enfoque transparente y eficiente.",
      email: "miguel@viven.es",
      phone: "+34 634 567 890",
      linkedin: "https://linkedin.com/in/miguelfernandez",
    },
    {
      id: 4,
      name: "Isabel Carrasco",
      position: "Directora Financiera",
      photo: "/team/isabel-carrasco.png",
      description:
        "Con formación en finanzas y experiencia en el sector inmobiliario, Laura gestiona la estabilidad económica de Viven.",
      email: "laura@viven.es",
      phone: "+34 645 678 901",
    },
    {
      id: 5,
      name: "Maria Garrido",
      position: "Director de Tecnología",
      photo: "/team/maria-garrido.png",
      description:
        "Responsable de la implementación de soluciones tecnológicas que mejoran la eficiencia y transparencia en todos los servicios.",
      email: "david@viven.es",
      phone: "+34 656 789 012",
      linkedin: "https://linkedin.com/in/davidlopez",
    },
    {
      id: 6,
      name: "Fran Hernan",
      position: "Directora de Marketing",
      photo: "/placeholder.svg?height=400&width=400",
      description:
        "Especialista en marketing digital y comunicación, Elena desarrolla estrategias para posicionar la marca Viven en el mercado.",
      email: "elena@viven.es",
      phone: "+34 667 890 123",
    },
  ]

  const [activeTeamMember, setActiveTeamMember] = useState<TeamMember | null>(null)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nuestro Equipo</h2>
          <p className="text-lg text-gray-600">
            El equipo de Viven está formado por profesionales expertos, formados y dinámicos con un único objetivo
            común: satisfacer las demandas de nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
              onClick={() => setActiveTeamMember(member)}
            >
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={member.photo || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-white/80">{member.position}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 line-clamp-3">{member.description}</p>
                <button
                  className="mt-4 text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveTeamMember(member)
                  }}
                >
                  Ver más información
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for team member details */}
        {activeTeamMember && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setActiveTeamMember(null)}
          >
            <div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-80">
                <Image
                  src={activeTeamMember.photo || "/placeholder.svg"}
                  alt={activeTeamMember.name}
                  fill
                  className="object-cover"
                />
                <button
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center"
                  onClick={() => setActiveTeamMember(null)}
                >
                  ✕
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeTeamMember.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{activeTeamMember.position}</p>

                <p className="text-gray-700 mb-6 leading-relaxed">{activeTeamMember.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <a href={`mailto:${activeTeamMember.email}`} className="text-gray-700 hover:text-blue-600">
                      {activeTeamMember.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <a href={`tel:${activeTeamMember.phone}`} className="text-gray-700 hover:text-blue-600">
                      {activeTeamMember.phone}
                    </a>
                  </div>
                  {activeTeamMember.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="h-5 w-5 text-blue-600 mr-3" />
                      <a
                        href={activeTeamMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-blue-600"
                      >
                        Perfil de LinkedIn
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    onClick={() => setActiveTeamMember(null)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
