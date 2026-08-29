"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, Phone, Linkedin } from "lucide-react"
import { useTranslations } from "next-intl"

interface TeamMember {
  id: number
  name: string
  position: string
  photo: string
  description: string
  email: string
  phone: string
  linkedin?: string
  whatsapp?: string
}

export default function TeamSection() {
  const t = useTranslations("empresa.teamSection")

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Cesar Sanjurjo",
      position: t("members.cesar.position"),
      photo: "/team/cesar-sanjurjo.png",
      description: t("members.cesar.description"),
      email: "cesar.sanjurjo@viven.es",
      phone: "+34 930 267 436",
      linkedin: "https://www.linkedin.com/in/c%C3%A9sar-sanjurjo-10a7ab55/",
      whatsapp: "https://wa.me/34930267436",
    },
    {
      id: 2,
      name: "Merche Romero",
      position: t("members.merche.position"),
      photo: "/team/merche.png",
      description: t("members.merche.description"),
      email: "hola@viven.es",
      phone: "+34 930 267 436",
    },
    {
      id: 15,
      name: "Pilar Martín",
      position: t("members.pilar.position"),
      photo: "/team/icon_profile.png",
      description: t("members.pilar.description"),
      email: "hola@viven.es",
      phone: "+34 930 267 436",
    },
    {
      id: 4,
      name: "Michel Arquimbau",
      position: t("members.michel.position"),
      photo: "/team/michel.png",
      description: t("members.michel.description"),
      email: "michel.arquimbau@remax.es",
      phone: "+34 641 173 416",
      whatsapp: "https://wa.me/34641173416",
    },
    {
      id: 5,
      name: "Agatha y Jose Antonio",
      position: t("members.agathaJose.position"),
      photo: "/team/jose-antonio.png",
      description: t("members.agathaJose.description"),
      email: "jose.munoz@remax.es",
      phone: "+34 639 475 164",
    },
    {
      id: 6,
      name: "Ingo Von Sundahl",
      position: t("members.ingo.position"),
      photo: "/team/ingo.png",
      description: t("members.ingo.description"),
      email: "ingo.vonsundahl@remax.es",
      phone: "+34 605 678 642",
      whatsapp: "https://wa.me/34605678642",
    },
    {
      id: 7,
      name: "Jose Antonio Peycovich",
      position: t("members.joseAntonio.position"),
      photo: "/team/jose-a-peycovich.png",
      description: t("members.joseAntonio.description"),
      email: "hola@viven.es",
      phone: "+34 688 804 497",
    },
    {
      id: 8,
      name: "Yuri Solari",
      position: t("members.yuri.position"),
      photo: "/team/yuri.png",
      description: t("members.yuri.description"),
      email: "hola@viven.es",
      phone: "+34 611 526 298",
      whatsapp: "https://wa.me/34611526298",
    },
    {
      id: 9,
      name: "Luis Hernandez",
      position: t("members.luis.position"),
      photo: "/team/luis.png",
      description: t("members.luis.description"),
      email: "hola@viven.es",
      phone: "+34 624 883 432",
      whatsapp: "https://wa.me/34624883432",
    },
    {
      id: 10,
      name: "Igor Zherebko",
      position: t("members.igor.position"),
      photo: "/team/igor.png",
      description: t("members.igor.description"),
      email: "igor.zherebko@remax.es",
      phone: "+34 645 392 986",
      whatsapp: "https://wa.me/34645392986",
    },
    {
      id: 11,
      name: "Xavier Paradis",
      position: t("members.xavier.position"),
      photo: "/team/xavier-paradis.png",
      description: t("members.xavier.description"),
      email: "xavier.paradis@remax.es",
      phone: "+34 697 667 147",
      whatsapp: "https://wa.me/34697667147",
    },
    {
      id: 12,
      name: "Pepi Menendez",
      position: t("members.pepi.position"),
      photo: "/team/pepi-menendez.png",
      description: t("members.pepi.description"),
      email: "pepi.menendez@remax.es",
      phone: "+34 614 756 837",
      whatsapp: "https://wa.me/34614756837",
    },
    {
      id: 13,
      name: "Jorge Ramírez",
      position: t("members.jorge.position"),
      photo: "/team/jorge.png",
      description: t("members.jorge.description"),
      email: "hola@viven.es",
      phone: "+34 615 146 941",
    },
    {
      id: 14,
      name: "Lorena Fernandez",
      position: t("members.lorena.position"),
      photo: "/team/icon_profile.png",
      description: t("members.lorena.description"),
      email: "lorena.fernandez@remax.es",
      phone: "+34 681 954 043",
      whatsapp: "https://wa.me/34681954043",
    },
    {
      id: 3,
      name: "Duglaiska",
      position: t("members.duglaiska.position"),
      photo: "/team/dug.png",
      description: t("members.duglaiska.description"),
      email: "dug.fernandez@remax.es",
      phone: "+34 664 841 885",
      whatsapp: "https://wa.me/34664841885",
    },
  ]

  const [activeTeamMember, setActiveTeamMember] = useState<TeamMember | null>(null)

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("title")}</h2>
          <p className="text-lg text-gray-600">
            {t("description")}
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
                  {t("actions.viewMore")}
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
              <div className="flex flex-row p-5 pb-0">
                <Image
                  src={activeTeamMember.photo || "/placeholder.svg"}
                  alt={activeTeamMember.name}
                  objectFit="cover"
                  width={200}
                  height={200}
                  className="object-cover rounded-full"
                />
                <button
                  aria-label={t("actions.close")}
                  className="ml-auto mr-0 bg-white/80 hover:bg-white text-gray-800 size-10 rounded-full"
                  onClick={() => setActiveTeamMember(null)}
                >
                  ✕
                </button>
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
                        {t("linkedinProfile")}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
                    onClick={() => setActiveTeamMember(null)}
                  >
                    {t("actions.close")}
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
