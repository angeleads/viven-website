import { ShieldCheck } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Excelencia en Números
          </h2>
          <p className="text-xl text-white/90">
            Nuestro compromiso con la calidad y la satisfacción del cliente se
            refleja en nuestras estadísticas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            percentage="99.9%"
            title="Incidencias Resueltas"
          />
          <StatCard
            percentage="99.9%"
            title="Clientes Satisfechos"
          />
          <StatCard
            percentage="99.9%"
            title="Contratos Satisfactorios"
          />
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  percentage: string;
  title: string;
}

function StatCard({ percentage, title }: StatCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20 hover:bg-white/15 transition-colors duration-300">
      <div className="relative mb-4">
        <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100">
          <circle
            className="text-blue-900/30"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
          <circle
            className="text-white"
            strokeWidth="8"
            strokeDasharray="264, 266"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-3xl font-bold text-white">{percentage}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    </div>
  );
}
