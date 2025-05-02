import Image from "next/image"

export default function CompanyHero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
            filter: "blur(1px)",
          }}
        ></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <Image src="/logo-white.svg" alt="Viven Inmobiliaria" fill className="object-contain" />
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Sobre Nosotros</h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Viven es el nuevo concepto de negocio dentro del sector inmobiliario. Nació de las inquietudes de su
                fundador, con amplia trayectoria en el sector, buscando un modelo de negocio que soportase las
                fluctuaciones del mercado y estabilizase la rentabilidad de la agencia inmobiliaria.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto fill-white"
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  )
}
