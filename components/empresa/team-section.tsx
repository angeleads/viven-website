"use client"

import { useEffect, useMemo, useState } from "react"
import { Mail, Phone, Linkedin, MessageCircle, User, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { EmployeeProfile } from "@/lib/allowed-employees"

interface TeamMember {
  id: string
  name: string
  position: string
  photo: string
  description: string
  email: string
  phone: string
  linkedin?: string
  whatsapp?: string
  languages?: string[]
  hobbies?: string[]
  galleryPhotos?: string[]
  order: number
}

const MEMBERS_PER_PAGE = 6

export default function TeamSection() {
  const t = useTranslations("empresa.teamSection")

  const [activeTeamMember, setActiveTeamMember] = useState<TeamMember | null>(null)
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<string | null>(null)
  const [firestoreMembers, setFirestoreMembers] = useState<EmployeeProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let isMounted = true

    async function loadDynamicTeam() {
      try {
        const empSnap = await getDocs(collection(db, "employees"))
        if (!isMounted) return

        const list: EmployeeProfile[] = []
        empSnap.forEach((d) => {
          list.push({ ...(d.data() as EmployeeProfile), uid: d.id })
        })

        setFirestoreMembers(list)
      } catch (err) {
        console.error("Error cargando equipo desde Firestore:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadDynamicTeam()
    return () => {
      isMounted = false
    }
  }, [])

  // Bloquear scroll del body cuando el modal de miembro está abierto
  useEffect(() => {
    if (activeTeamMember) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeTeamMember])

  const displayedMembers: TeamMember[] = useMemo(() => {
    return firestoreMembers
      .filter((emp) => emp.isPublic !== false)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
      .map((emp) => ({
        id: emp.uid,
        name: emp.fullName || "Equipo Viven",
        position: emp.jobTitle || "",
        photo: emp.avatarUrl || "",
        description: emp.bio || "",
        email: emp.email || "",
        phone: emp.phone || "",
        linkedin: emp.linkedin,
        whatsapp: emp.whatsapp,
        languages: emp.languages,
        hobbies: emp.hobbies,
        galleryPhotos: emp.galleryPhotos || [],
        order: emp.order ?? 99,
      }))
  }, [firestoreMembers])

  const totalPages = Math.max(1, Math.ceil(displayedMembers.length / MEMBERS_PER_PAGE))

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * MEMBERS_PER_PAGE
    return displayedMembers.slice(start, start + MEMBERS_PER_PAGE)
  }, [displayedMembers, currentPage])

  return (
    <section id="team-section" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t("title")}</h2>
          <p className="text-lg text-gray-600">
            {t("description")}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-xl h-[460px] animate-pulse"
              />
            ))}
          </div>
        ) : paginatedMembers.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">
            No hay miembros públicos disponibles en este momento.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100"
                  onClick={() => setActiveTeamMember(member)}
                >
                  <div className="relative h-96 overflow-hidden bg-slate-100 flex items-center justify-center">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-slate-800 text-white flex items-center justify-center text-3xl font-extrabold">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}
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

            {/* Paginación del equipo */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}

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
              <div className="flex flex-row p-5 pb-0 items-start">
                {activeTeamMember.photo ? (
                  <img
                    src={activeTeamMember.photo}
                    alt={activeTeamMember.name}
                    className="w-36 h-36 object-cover rounded-full border border-gray-200"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-slate-900 text-white flex items-center justify-center text-3xl font-extrabold">
                    {activeTeamMember.name ? (
                      activeTeamMember.name.charAt(0).toUpperCase()
                    ) : (
                      <User size={40} />
                    )}
                  </div>
                )}
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

                {activeTeamMember.languages && activeTeamMember.languages.length > 0 && (
                  <div className="mb-4">
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Idiomas
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeTeamMember.languages.map((lang, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTeamMember.hobbies && activeTeamMember.hobbies.length > 0 && (
                  <div className="mb-6">
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Aficiones
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeTeamMember.hobbies.map((hobby, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-100"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTeamMember.galleryPhotos && activeTeamMember.galleryPhotos.length > 0 && (
                  <div className="mb-6">
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                      Galería ({activeTeamMember.galleryPhotos.length})
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {activeTeamMember.galleryPhotos.map((photoUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedGalleryPhoto(photoUrl)}
                          className="relative group aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <img
                            src={photoUrl}
                            alt={`${activeTeamMember.name} - foto ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {activeTeamMember.email && (
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600 mr-3" />
                      <a href={`mailto:${activeTeamMember.email}`} className="text-gray-700 hover:text-blue-600">
                        {activeTeamMember.email}
                      </a>
                    </div>
                  )}
                  {activeTeamMember.phone && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <a href={`tel:${activeTeamMember.phone}`} className="text-gray-700 hover:text-blue-600">
                        {activeTeamMember.phone}
                      </a>
                    </div>
                  )}
                  {activeTeamMember.whatsapp && (
                    <div className="flex items-center">
                      <MessageCircle className="h-5 w-5 text-green-600 mr-3" />
                      <a
                        href={activeTeamMember.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-green-600"
                      >
                        WhatsApp
                      </a>
                    </div>
                  )}
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
                    onClick={() => {
                      setSelectedGalleryPhoto(null)
                      setActiveTeamMember(null)
                    }}
                  >
                    {t("actions.close")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox para ver foto de la galería en grande */}
        {selectedGalleryPhoto && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4"
            onClick={() => setSelectedGalleryPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedGalleryPhoto(null)}
                className="absolute -top-12 right-0 bg-white/90 hover:bg-white text-gray-900 size-9 rounded-full font-bold flex items-center justify-center"
                aria-label="Cerrar imagen"
              >
                ✕
              </button>
              <img
                src={selectedGalleryPhoto}
                alt="Vista ampliada"
                className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain border border-white/20"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
