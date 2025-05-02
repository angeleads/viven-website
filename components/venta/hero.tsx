export default function Hero() {
    return (
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/pictures/venta-backround.png')",
              filter: "blur(2px)",
            }}
          ></div>
        </div>
  
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Propiedades en Venta</h1>
            <p className="text-xl text-white/90 mb-8">
              Descubre nuestra selección exclusiva de propiedades en venta en las mejores ubicaciones
            </p>
  
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <select className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option className="text-black" value="">Tipo de propiedad</option>
                    <option className="text-black" value="piso">Piso</option>
                    <option className="text-black" value="casa">Casa</option>
                    <option className="text-black" value="chalet">Chalet</option>
                    <option className="text-black" value="local">Local comercial</option>
                  </select>
                </div>
                <div>
                  <select className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option className="text-black" value="">Ubicación</option>
                    <option className="text-black" value="garraf">El Garraf</option>
                    <option className="text-black" value="penedes">El Baix Penedès</option>
                    <option className="text-black" value="alt-penedes">El Alt Penedès</option>
                  </select>
                </div>
                <div>
                  <select className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option className="text-black" value="">Precio máximo</option>
                    <option className="text-black" value="100000">Hasta 100.000 €</option>
                    <option className="text-black" value="200000">Hasta 200.000 €</option>
                    <option className="text-black" value="300000">Hasta 300.000 €</option>
                    <option className="text-black" value="500000">Hasta 500.000 €</option>
                    <option className="text-black" value="1000000">Hasta 1.000.000 €</option>
                  </select>
                </div>
              </div>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-medium transition-colors duration-300">
                Buscar propiedades
              </button>
            </div>
          </div>
        </div>
  
        {/* Decorative elements */}
        <div
          className="absolute bottom-0 left-0 w-full h-12 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
        ></div>
      </section>
    )
  }
  