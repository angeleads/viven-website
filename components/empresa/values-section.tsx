import { Leaf, Heart, Zap } from "lucide-react"

export default function ValuesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nuestros Valores</h2>
          <p className="text-lg text-gray-600">
            En Viven nos comprometemos con el medio ambiente, la sociedad y la excelencia en todo lo que hacemos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Environmental Commitment */}
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 hover:shadow-green-500 border border-green-100 text-center">
            <div className="bg-green-100 p-4 rounded-full inline-flex justify-center items-center mb-6">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Compromiso Medioambiental</h3>
            <p className="text-gray-600">
              Apostamos por el cuidado del medio ambiente, reduciendo el consumo de papel y promoviendo el uso de
              materiales reciclados. En nuestras oficinas utilizamos iluminación natural y de bajo consumo, manteniendo
              nuestro compromiso con la eficiencia energética.
            </p>
          </div>

          {/* Social Responsibility */}
          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 hover:shadow-red-500 border border-red-100 text-center">
            <div className="bg-red-100 p-4 rounded-full inline-flex justify-center items-center mb-6">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Responsabilidad Social</h3>
            <p className="text-gray-600">
              Participamos a lo largo del año en diversas causas solidarias y benéficas con Entidades locales y
              nacionales, devolviendo a la sociedad parte de lo que nos aporta. Creemos firmemente en contribuir
              positivamente a las comunidades donde operamos.
            </p>
          </div>

          {/* Innovation */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 hover:shadow-blue-500 border border-blue-100 text-center">
            <div className="bg-blue-100 p-4 rounded-full inline-flex justify-center items-center mb-6">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Innovación Constante</h3>
            <p className="text-gray-600">
              Implementamos las últimas tecnologías para ofrecer un servicio más eficiente y transparente. Nuestra
              búsqueda de la excelencia nos impulsa a mejorar constantemente nuestros procesos y servicios para
              beneficio de nuestros clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
