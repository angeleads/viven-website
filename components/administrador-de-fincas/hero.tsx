export default function Hero() {
  return (
    <section className="pt-32 pb-20 relative">
      <div className="absolute inset-0 bg-white"></div>
      <div className="container mx-auto px-6 relative text-white">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-red-500 to-blue-800 bg-clip-text text-transparent">
            Administración de Fincas Premium
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl text-gray-600">
            Gestión profesional e integral de su patrimonio inmobiliario en
            Vilanova i La Geltrú
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contacto"
              className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all inline-flex items-center justify-center"
            >
              Solicitar Información
            </a>
            <a
              href="https://vivenvng.administraciononline.taaf.es/#/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all inline-flex items-center justify-center"
            >
              Descargar App
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
