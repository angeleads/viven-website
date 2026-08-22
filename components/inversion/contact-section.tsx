"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Check, ArrowRight } from "lucide-react";

export default function ContactSection() {
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
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Contacto</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">
              Invierte con <span className="text-blue-500">nosotros</span>
            </h2>
            <p className="mt-4 text-gray-300 leading-relaxed max-w-md">
              Estamos a su disposición para presentarle en detalle nuestras estrategias de inversión y ayudarle a construir un patrimonio sólido.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Oficina</div>
                  <p className="text-gray-200 leading-relaxed text-sm">
                    C/ Pelegrí Ballester, 23 LOCAL VIVEN<br />08800 Vilanova i la Geltrú
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Teléfonos</div>
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
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Email</div>
                  <a href="mailto:hola@viven.es" className="text-gray-200 hover:text-blue-400 text-sm transition-colors">
                    hola@viven.es
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 p-8 sm:p-10 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Solicite información</h3>

            {sent ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} />
                </div>
                <h4 className="text-xl font-bold">¡Solicitud recibida!</h4>
                <p className="mt-2 text-gray-300 text-sm">
                  Gracias por contactarnos. Nos pondremos en contacto en breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre completo"
                      className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="+34 600 000 000"
                    className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Área de inversión de interés
                  </label>
                  <select
                    required
                    defaultValue=""
                    className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="prestamo">Viven Préstamo Participativo (Renta fija · 10–12% IRR)</option>
                    <option value="situaciones-especiales">Real Estate — Situaciones Especiales (24–26% IRR)</option>
                    <option value="rentabilidad">Compra Activo con Rentabilidad (Ingresos pasivos)</option>
                    <option value="asesoramiento">Aún no lo tengo claro — quiero asesoramiento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Importe disponible para invertir
                  </label>
                  <select
                    required
                    defaultValue=""
                    className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                  >
                    <option value="" disabled>Selecciona un tramo</option>
                    <option value="10-50k">10.000 € – 50.000 €</option>
                    <option value="50-100k">50.000 € – 100.000 €</option>
                    <option value="100-250k">100.000 € – 250.000 €</option>
                    <option value="250-500k">250.000 € – 500.000 €</option>
                    <option value="500k+">Más de 500.000 €</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={3}
                    maxLength={1000}
                    placeholder="Cuéntenos brevemente su objetivo (opcional)"
                    className="w-full text-sm px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  Enviar solicitud <ArrowRight size={18} />
                </button>
                <p className="text-xs text-gray-400 text-center pt-2">
                  Al enviar acepta ser contactado por Viven Capital SL.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}