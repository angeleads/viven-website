import { useTranslations } from "next-intl";
import { User } from "lucide-react";

export default function TeamSection() {
  const t = useTranslations("inversion.team");

  const team = [
    {
      name: t("cesar.name"),
      role: t("cesar.role"),
      photo: "/team/cesar-sanjurjo.png",
      bio: t("cesar.bio"),
    },
    {
      name: t("placeholder.name"),
      role: t("placeholder.role"),
      bio: t("placeholder.bio"),
      placeholder: true,
    },
    {
      name: t("placeholder.name"),
      role: t("placeholder.role"),
      bio: t("placeholder.bio"),
      placeholder: true,
    },
  ];

  return (
    <section id="equipo" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">{t("badge")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            {t("title")}
          </h2>
          <p className="mt-3 text-gray-600">
            {t("description")}
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
                    <p className="mt-3 text-sm text-gray-400 italic">{t("placeholder.bio")}</p>
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
