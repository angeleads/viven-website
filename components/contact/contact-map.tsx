export default function ContactMap() {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestra ubicación</h2>
              <p className="text-lg text-gray-600">
                Visítanos en nuestra oficina central o en cualquiera de nuestras sedes.
              </p>
            </div>
  
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.6774994325566!2d-3.7031968846361758!3d40.41956397936263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287d383b06f7%3A0x6a6fff77e7517fc!2sGran%20V%C3%ADa%2C%2028%2C%2028013%20Madrid!5e0!3m2!1ses!2ses!4v1651234567890!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Viven Inmobiliaria"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
  
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Oficina Madrid</h3>
                <p className="text-gray-600">Calle Gran Vía 28, 28013 Madrid</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Oficina Barcelona</h3>
                <p className="text-gray-600">Passeig de Gràcia 43, 08007 Barcelona</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Oficina Valencia</h3>
                <p className="text-gray-600">Calle Colón 22, 46004 Valencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  