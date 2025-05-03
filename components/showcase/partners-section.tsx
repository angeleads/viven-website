"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Partner {
  id: number
  name: string
  logo: string
  website?: string
}

export default function PartnersSection() {
  const partners: Partner[] = [
    { id: 1, name: "REMEM", logo: "/logos/partners/remem-logo.png", website: "https://www.remax.es" },
    { id: 2, name: "Rius", logo: "/logos/partners/rius-logo.png", website: "https://www.example.com" },
    { id: 3, name: "Aszende", logo: "/logos/partners/aszende-logo.png", website: "https://www.example.com" },
    { id: 4, name: "Eninter", logo: "/logos/partners/eninter-logo.png", website: "https://www.example.com" },
    { id: 5, name: "Solca", logo: "/logos/partners/solca-logo.png", website: "https://www.example.com" },
    { id: 6, name: "Ocsara Construcciones", logo: "/logos/partners/construccions-logo.png", website: "https://www.example.com" },
    { id: 7, name: "Botanics", logo: "/logos/partners/botanics-logo.png", website: "https://www.example.com" },
    { id: 8, name: "Finestec", logo: "/logos/partners/finestec-logo.png", website: "https://www.example.com" },
    { id: 9, name: "Ocsara", logo: "/logos/partners/ocasar-logo.png", website: "https://www.example.com" },
    { id: 10, name: "Ventanas", logo: "/logos/partners/ventana-logo.png", website: "https://www.example.com" },
  ]

  // For mobile carousel
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const nextSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev === Math.ceil(partners.length / 2) - 1 ? 0 : prev + 1))
    } else {
      setCurrentSlide((prev) => (prev === Math.ceil(partners.length / 5) - 1 ? 0 : prev + 1))
    }
  }

  const prevSlide = () => {
    if (isMobile) {
      setCurrentSlide((prev) => (prev === 0 ? Math.ceil(partners.length / 2) - 1 : prev - 1))
    } else {
      setCurrentSlide((prev) => (prev === 0 ? Math.ceil(partners.length / 5) - 1 : prev - 1))
    }
  }

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, isMobile])

  // Update slider position when currentSlide changes
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = isMobile ? 100 : 100
      sliderRef.current.style.transform = `translateX(-${currentSlide * slideWidth}%)`
    }
  }, [currentSlide, isMobile])

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Partners</h2>
          <p className="text-lg text-gray-600">
           En <span className="font-bold">Viven</span> tenemos el placer de trabajar conjuntamente con Empresas que comparten los mismos valores de <span className="font-bold">Compromiso, Transparencia y Profesionalismo</span> que nosotros.
          </p>
        </div>

        {/* Desktop view - Grid layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-6">
            {partners.map((partner) => (
              <PartnerLogo key={partner.id} partner={partner} />
            ))}
          </div>
        </div>

        {/* Mobile view - Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: `${partners.length * 50}%` }}
            >
              {partners.map((partner) => (
                <div key={partner.id} className="w-1/2">
                  <PartnerLogo partner={partner} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 z-10"
            aria-label="Previous partners"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 z-10"
            aria-label="Next partners"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(partners.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-blue-600" : "bg-gray-300"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface PartnerLogoProps {
  partner: Partner
}

function PartnerLogo({ partner }: PartnerLogoProps) {
  return (
    <div className="group">
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className=" bg-white rounded-lg p-6 h-32 flex items-center justify-center  hover:shadow-md transition-all duration-300"
      >
        <div className="relative w-full h-full">
          <Image
            src={partner.logo || "/placeholder.svg"}
            alt={`${partner.name} logo`}
            fill
            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </a>
    </div>
  )
}
