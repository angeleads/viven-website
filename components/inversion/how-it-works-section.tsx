import { Building2, LineChart, HandCoins } from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "Invierte en una propiedad",
    desc: "Viven Capital te permite participar, ya sea mediante capital o deuda, en proyectos inmobiliarios de nuestros colaboradores certificados.",
  },
  {
    icon: LineChart,
    title: "Obtén altos rendimientos",
    desc: "Al recuperar la inversión, recibirás tu dinero junto con la parte proporcional de los beneficios generados.",
  },
  {
    icon: HandCoins,
    title: "Diversifícate como los profesionales",
    desc: "Construye tu cartera con proyectos diferenciados por tipo, ubicación, plazo y segmento (residencial, comercial, industrial, etc.).",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Proceso</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            ¿Cómo funciona Viven Capital?
          </h2>
          <p className="mt-3 text-gray-600">
            Fondo de inversión inmobiliario con rendimientos del 12% en menos de 12 meses.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="bg-gray-50 border border-gray-200/80 p-8 rounded-2xl relative">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <s.icon size={24} />
                </div>
                <span className="text-4xl font-black text-gray-200">0{i + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}