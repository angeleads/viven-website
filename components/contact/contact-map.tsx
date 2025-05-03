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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.013742250933!2d1.7202775!3d41.221471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a386fbdda9e279%3A0x1beaed70bdc17530!2sCarrer%20de%20Pelegr%C3%AD%20Ballester%2C%2023%2C%2008800%20Vilanova%20i%20la%20Geltr%C3%BA%2C%20Barcelona!5e0!3m2!1sfr!2ses!4v1746291062246!5m2!1sfr!2ses" 
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
  
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-3xl p-4 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Oficina Vilanova</h3>
                <p className="text-gray-600">Carrer de Pelegrí Ballester, 23, 08800 Vilanova i la Geltrú, Barcelona</p>
              </div>
              <div className="bg-gray-50 rounded-3xl p-4 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Oficina Sitges</h3>
                <p className="text-gray-600">Passeig de Vilanova, 08870 Sitges, Barcelona</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  