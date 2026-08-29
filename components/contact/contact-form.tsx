"use client"

import { useState } from "react"
import emailjs from "@emailjs/browser"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function ContactForm() {
  const t = useTranslations("contact.form")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "general",
    acceptTerms: false,
  })

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

  // Los nombres de las propiedades deben coincidir exactamente con los {{variables}} de tu plantilla de EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
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
          setTimeout(() => {
            setFormStatus("idle")
            setFormData({
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
              service: "general",
              acceptTerms: false,
            })
          }, 3000)
        },
        (error) => {
          console.error("Error sending email:", error)
          setFormStatus("error")
        }
      )
  }
  
  return (
    <section id="contactForm" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("title")}</h2>
            <p className="text-lg text-gray-600">
              {t("description")}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              {formStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 text-green-700 p-4 rounded-full inline-flex mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("successTitle")}</h3>
                  <p className="text-gray-600">
                    {t("successMessage")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("fields.name.label")} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t("fields.name.placeholder")}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("fields.email.label")} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t("fields.email.placeholder")}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("fields.phone.label")}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t("fields.phone.placeholder")}
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        {t("fields.service.label")} *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option className="rounded-xl" value="general">{t("fields.service.options.general")}</option>
                        <option className="rounded-xl" value="compra">{t("fields.service.options.buy")}</option>
                        <option className="rounded-xl" value="venta">{t("fields.service.options.sell")}</option>
                        <option className="rounded-xl" value="alquiler">{t("fields.service.options.rent")}</option>
                        <option className="rounded-xl" value="gestion_comunidades">{t("fields.service.options.communityManagement")}</option>
                        <option className="rounded-xl" value="comunidades">{t("fields.service.options.communityAdministration")}</option>
                        <option className="rounded-xl" value="inversion">{t("fields.service.options.investment")}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("fields.subject.label")} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t("fields.subject.placeholder")}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("fields.message.label")} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t("fields.message.placeholder")}
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded-xl focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="acceptTerms" className="text-gray-600">
                        {t("terms.prefix")}{" "}
                        <Link href="/privacidad" className="text-blue-600 hover:underline">
                          {t("terms.privacyPolicy")}
                        </Link>{" "}
                        {t("terms.suffix")} *
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors duration-300 ${formStatus === "submitting" ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                      {formStatus === "submitting" ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {t("submitting")}
                        </span>
                      ) : (
                        t("submit")
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>
              {t("requiredHintPrefix")} <span className="text-red-500">*</span> {t("requiredHintSuffix")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

