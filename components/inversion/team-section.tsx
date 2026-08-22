import { User } from "lucide-react";

const team = [
  {
    name: "César Sanjurjo",
    role: "Socio Fundador",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600",
    bio: "Con amplia experiencia en el sector inmobiliario, César lidera la estrategia de inversión de Viven Capital, aportando visión y rigor en cada operación.",
  },
  { name: "Próximamente", role: "Miembro del equipo", placeholder: true },
  { name: "Próximamente", role: "Miembro del equipo", placeholder: true },
];

export default function TeamSection() {
  return (
    <section id="equipo" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Nuestro equipo</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Personas detrás de Viven Capital
          </h2>
          <p className="mt-3 text-gray-600">
            Un equipo de profesionales dedicados al éxito de sus inversiones.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
              <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden flex items-center justify-center">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                    <User size={64} />
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{m.role}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{m.name}</h3>
                  {m.bio ? (
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                  ) : (
                    <p className="mt-3 text-sm text-gray-400 italic">Próximo miembro del equipo.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}