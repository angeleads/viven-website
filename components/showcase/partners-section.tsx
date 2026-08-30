"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

interface Partner {
  id: number
  name: string
  logo: string
  website?: string
}

export default function PartnersSection() {
  const t = useTranslations("showcase.partnersSection")

  const partners: Partner[] = [
    { id: 1, name: "REMEM", logo: "/logos/partners/remem-logo.png", website: "https://www.remax.es" },
    { id: 2, name: "Rius", logo: "/logos/partners/rius-logo.png", website: "https://www.example.com" },
    { id: 3, name: "Aszende", logo: "/logos/partners/aszende-logo.png", website: "https://www.example.com" },
    { id: 4, name: "Eninter", logo: "/logos/partners/eninter-logo.png", website: "https://www.example.com" },
    { id: 5, name: "Solca", logo: "/logos/partners/solca-logo.png", website: "https://www.example.com" },
    { id: 6, name: "C&C", logo: "/logos/partners/c&c-logo.png", website: "https://www.example.com" },
    { id: 7, name: "Botanics", logo: "/logos/partners/botanics-logo.png", website: "https://www.example.com" },
    { id: 8, name: "Finestec", logo: "/logos/partners/finestec-logo.png", website: "https://www.example.com" },
    { id: 9, name: "Ocsara", logo: "/logos/partners/ocasar-logo.png", website: "https://www.example.com" },
    { id: 10, name: "Ventanas", logo: "/logos/partners/ventana-logo.png", website: "https://www.example.com" },
  ]

  // Triplicate the list to ensure screen width is completely covered at all screen sizes
  const seamlessPartners = [...partners, ...partners, ...partners]

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      {/* Inline styles for keyframe animation - no tailwind.config editing required */}
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: ticker 25s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("title")}</h2>
          <p className="text-lg text-gray-600">
            {t("description.start")} <span className="font-bold">{t("description.brand")}</span> {t("description.middle")} <span className="font-bold">{t("description.values")}</span> {t("description.end")}
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Carousel Container */}
      <div className="relative w-full overflow-hidden py-4 [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
        <div className="animate-ticker flex-nowrap">
          {seamlessPartners.map((partner, index) => (
            <div key={`${partner.id}-${index}`} className="w-44 md:w-52 px-3 flex-shrink-0">
              <PartnerLogo partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface PartnerLogoProps {
  partner: Partner
}

function PartnerLogo({ partner }: PartnerLogoProps) {
  const t = useTranslations("showcase.partnersSection")

  return (
    <div className="group h-full">
      <div className="bg-white rounded-xl border border-gray-100 p-5 h-28 flex items-center justify-center hover:shadow-lg hover:border-blue-100 transition-all duration-300">
        <div className="relative w-full h-full">
          <Image
            src={partner.logo || "/placeholder.svg"}
            alt={t("logoAlt", { name: partner.name })}
            fill
            className="object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  )
}