"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import emailjs from "@emailjs/browser"
import { useTranslations } from "next-intl"

export default function ContactSection() {
    const t = useTranslations()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Compra de propiedad",
    message: "",
    acceptTerms: false,
  })

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    }

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setFormStatus("success")
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "Compra de propiedad",
            message: "",
            acceptTerms: false,
          })
          setTimeout(() => setFormStatus("idle"), 5000)
        },
        (error) => {
          console.error("Error al enviar el mensaje:", error)
          setFormStatus("error")
        }
      )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("contact.hero.title")}</h2>
          <p className="text-lg text-gray-600">
            {t("contact.hero.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("contact.form.title")}</h3>

              {formStatus === "success" && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl text-center font-medium">
                  {t("contact.form.successTitle")}
                </div>
              )}

              {formStatus === "error" && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl text-center font-medium">
                  {t("contact.form.errorTitle")}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.form.fields.name.label")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.form.fields.email.label")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tu email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.fields.phone.label")} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tu teléfono"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.fields.subject.label")} *
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Compra de propiedad">{t("contact.form.fields.service.options.buy")}</option>
                    <option value="Venta de propiedad">{t("contact.form.fields.service.options.sell")}</option>
                    <option value="Alquiler">{t("contact.form.fields.service.options.rent")}</option>
                    <option value="Inversión">{t("contact.form.fields.service.options.investment")}</option>
                    <option value="Gestión de Comunidades">{t("contact.form.fields.service.options.communityManagement")}</option>
                    <option value="Otro">{t("contact.form.fields.service.options.other")}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.fields.message.label")} *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="acceptTerms"
                      type="checkbox"
                      required
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="acceptTerms" className="text-gray-600">
                      {t("contact.form.terms.prefix")}{" "}
                      <a href="/privacidad" className="text-blue-600 hover:underline">
                        {t("contact.form.terms.privacyPolicy")}
                      </a>{" "}
                      {t("contact.form.terms.suffix")}
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300 ${
                      formStatus === "submitting" ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {formStatus === "submitting" ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-blue-600 text-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">{t("showcase.contactSection.info.title")}</h3>

              <div className="space-y-6">
                <ContactItem
                  icon={<MapPin className="h-6 w-6" />}
                  title={t("showcase.contactSection.info.items.address")}
                  content={t("showcase.contactSection.info.items.addressValue")}
                />
                <ContactItem
                  icon={<Phone className="h-6 w-6" />}
                  title={t("showcase.contactSection.info.items.phone")}
                  content="930 267 436"
                />

                <ContactItem
                  icon={<Mail className="h-6 w-6" />}
                  title={t("showcase.contactSection.info.items.email")}
                  content="hola@viven.es"
                />

                <ContactItem
                  icon={<Clock className="h-6 w-6" />}
                  title={t("showcase.contactSection.info.items.schedule")}
                  content={t("contact.info.scheduleValue")}
                />
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl overflow-hidden h-80">
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.0135584121313!2d1.7177025765771565!3d41.22147500626918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a386fbdda9e279%3A0x1beaed70bdc17530!2sCarrer%20de%20Pelegr%C3%AD%20Ballester%2C%2023%2C%2008800%20Vilanova%20i%20la%20Geltr%C3%BA%2C%20Barcelona!5e0!3m2!1sfr!2ses!4v1746185046790!5m2!1ses!2ses"
                  title={t("contact.map.iframeTitle")}
                  width="600"
                  height="450"
                  className="w-full h-full bg-gray-300 flex items-center justify-center border-0"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactItem({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode
  title: string
  content: string
}) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4 mt-1">{icon}</div>
      <div>
        <h4 className="font-medium text-white/90 mb-1">{title}</h4>
        <p className="text-white/80">{content}</p>
      </div>
    </div>
  )
}