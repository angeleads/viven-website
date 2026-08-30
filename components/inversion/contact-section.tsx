"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Check, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const t = useTranslations("inversion.contact");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{t("badge")}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">
              {t("titleStart")} <span className="text-blue-500">{t("titleHighlight")}</span>
            </h2>
            <p className="mt-4 text-gray-300 leading-relaxed max-w-md">
              {t("description")}
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">{t("officeTitle")}</div>
                  <p className="text-gray-200 leading-relaxed text-sm whitespace-pre-line">
                    {t("officeAddress")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">{t("phoneTitle")}</div>
                  <div className="space-y-1 text-sm">
                    <a href="tel:+34930267436" className="text-gray-200 hover:text-blue-400 block transition-colors">
                      930 267 436
                    </a>
                    <a href="tel:+34674083100" className="text-gray-200 hover:text-blue-400 block transition-colors">
                      674 083 100
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">{t("emailTitle")}</div>
                  <a href="mailto:hola@viven.es" className="text-gray-200 hover:text-blue-400 text-sm transition-colors">
                    hola@viven.es
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 p-8 sm:p-10 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">{t("formTitle")}</h3>

            {sent ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} />
                </div>
                <h4 className="text-xl font-bold">{t("successTitle")}</h4>
                <p className="mt-2 text-gray-300 text-sm">
                  {t("successText")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      {t("fields.name")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("fields.namePlaceholder")}
                      className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      {t("fields.email")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t("fields.emailPlaceholder")}
                      className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    {t("fields.phone")}
                  </label>
                  <input
                    type="tel"
                    placeholder={t("fields.phonePlaceholder")}
                    className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    {t("fields.interestArea")}
                  </label>
                  <select
                    required
                    defaultValue=""
                    className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                  >
                    <option value="" disabled>{t("fields.selectOption")}</option>
                    <option value="prestamo">{t("fields.optionLoan")}</option>
                    <option value="situaciones-especiales">{t("fields.optionSpecial")}</option>
                    <option value="rentabilidad">{t("fields.optionIncome")}</option>
                    <option value="asesoramiento">{t("fields.optionAdvice")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    {t("fields.amount")}
                  </label>
                  <select
                    required
                    defaultValue=""
                    className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                  >
                    <option value="" disabled>{t("fields.selectRange")}</option>
                    <option value="10-50k">{t("fields.range1")}</option>
                    <option value="50-100k">{t("fields.range2")}</option>
                    <option value="100-250k">{t("fields.range3")}</option>
                    <option value="250-500k">{t("fields.range4")}</option>
                    <option value="500k+">{t("fields.range5")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    {t("fields.message")}
                  </label>
                  <textarea
                    rows={3}
                    maxLength={1000}
                    placeholder={t("fields.messagePlaceholder")}
                    className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  {t("fields.submit")} <ArrowRight size={18} />
                </button>
                <p className="text-xs text-gray-400 text-center pt-2">
                  {t("fields.disclaimer")}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
