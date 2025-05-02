import { Landmark, ChartColumnBig, Home } from "lucide-react";

export default function InvestmentSection() {
  return (
    <section id="inversiones" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-red-50 opacity-50"></div>
      <div className="container mx-auto px-6 relative">
        <h2 className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600">
          Inversiones Inmobiliarias
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                Asesoramiento Experto en Inversiones
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                En VIVEN+ Plus facilitamos su inversión inmobiliaria con
                soluciones personalizadas y profesionales.
              </p>
              <div className="grid gap-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <Landmark className="h-10 w-10" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Suelo urbano</h4>
                    <p className="text-gray-600">
                      Gestión y asesoramiento especializado
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white">
                    <ChartColumnBig className="h-10 w-10" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      Activos inmobiliarios
                    </h4>
                    <p className="text-gray-600">
                      Maximización de rentabilidad
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <Home className="h-10 w-10" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      Nuevas promociones
                    </h4>
                    <p className="text-gray-600">
                      Desarrollo de proyectos innovadores
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img
              src="/pictures/comunidad.jpg"
              alt="Inversiones Inmobiliarias"
              className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
