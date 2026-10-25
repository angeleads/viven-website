"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EmployeeProfile } from "@/lib/allowed-employees";

export default function TeamSection() {
  const t = useTranslations("inversion.team");
  const [dynamicMembers, setDynamicMembers] = useState<EmployeeProfile[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadInversionTeam() {
      try {
        const snap = await getDocs(collection(db, "employees"));
        if (!isMounted) return;
        const list: EmployeeProfile[] = [];
        snap.forEach((d) => {
          const data = d.data() as EmployeeProfile;
          if (
            data.isPublic !== false &&
            (data.department === "inversion" || data.department === "direccion")
          ) {
            list.push({ ...data, uid: d.id });
          }
        });
        list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        setDynamicMembers(list);
      } catch {
        // Fallback silencioso
      }
    }
    loadInversionTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  const fallbackTeam = [
    {
      name: t("placeholder.name"),
      role: t("placeholder.role"),
      photo: "",
      bio: t("placeholder.bio"),
      placeholder: true,
    },
  ];

  const team =
    dynamicMembers.length > 0
      ? dynamicMembers.map((emp) => ({
          name: emp.fullName,
          role: emp.jobTitle || t("cesar.role"),
          photo: emp.avatarUrl || "",
          bio: emp.bio || "",
          placeholder: false,
        }))
      : fallbackTeam;

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
