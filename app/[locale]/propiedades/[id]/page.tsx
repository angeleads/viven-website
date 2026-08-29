"use client";

import { use, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import emailjs from "@emailjs/browser";
import {
  Bed,
  Bath,
  Maximize,
  Euro,
  MapPin,
  ChevronLeft,
  Phone,
  Mail,
  FileText,
  ShieldCheck,
  User,
  Building,
  Check,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { Property } from "@/types/property";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = use(params);
  const locale = useLocale();
  const t = useTranslations("venta.propertyDetail");
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para EmailJS
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${id}?idioma=${encodeURIComponent(locale)}`);
        if (!res.ok) {
          throw new Error(t("errors.loadFailed"));
        }
        const data: Property = await res.json();
        setProperty(data);
        setActiveImage(data.image || data.images?.[0] || "/placeholder.svg?height=600&width=800");

        setFormData((prev) => ({
          ...prev,
          message: t("form.defaultMessage", { reference: data.reference }),
        }));
      } catch (err: any) {
        setError(err.message || t("errors.unexpected"));
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id, locale, t]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    setIsSending(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // Parámetros que se enviarán a la plantilla de EmailJS
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone || t("form.phoneNotProvided"),
      message: formData.message,
      property_ref: property.reference,
      property_title: property.title,
      agent_email: property.agent?.email || "",
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: t("form.defaultMessage", { reference: property.reference }),
      });
    } catch (err: any) {
      console.error("Error enviando email con EmailJS:", err);
      setSubmitError(t("status.error"));
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("errors.notFoundTitle")}
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          {error || t("errors.notFoundMessage")}
        </p>
        <Link
          href="/propiedades"
          className="inline-flex items-center text-white bg-blue-600 px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft size={18} className="mr-1" /> {t("actions.backToList")}
        </Link>
      </div>
    );
  }

  const rawDescriptionText =
    property.description ||
    property.descripciones ||
    property.descrip ||
    "";

  const formattedDescription = rawDescriptionText
    ? rawDescriptionText
        .replace(/~{2,}/g, "\n\n")
        .replace(/~/g, "\n\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
    : t("fallbacks.description");

  const agent = property.agent;
  const agentName = agent?.name || property.agency || t("fallbacks.defaultAgency");
  const agentPhone = agent?.phone || "";
  const agentEmail = agent?.email || "";
  const agentPhoto = agent?.photo || "";

  const specDetails: Array<{ label: string; value: string | number }> = [
    { label: t("specs.reference"), value: property.reference },
    { label: t("specs.operationType"), value: property.operationType },
    { label: t("specs.propertyType"), value: property.propertyType || t("fallbacks.propertyType") },
    { label: t("specs.zoneCity"), value: property.location },
    ...(property.usefulArea ? [{ label: t("specs.usefulArea"), value: `${property.usefulArea} m²` }] : []),
    ...(property.builtArea ? [{ label: t("specs.builtArea"), value: `${property.builtArea} m²` }] : [{ label: t("specs.builtArea"), value: `${property.area} m²` }]),
    ...(property.plotArea ? [{ label: t("specs.plotArea") || "Superficie Parcela", value: `${property.plotArea} m²` }] : []),
    ...(property.terraceArea ? [{ label: t("specs.terraceArea") || "Superficie Terraza", value: `${property.terraceArea} m²` }] : []),
    ...(property.conservation ? [{ label: t("specs.condition"), value: property.conservation }] : []),
    ...(property.category === "residential" || property.beds > 0
      ? [{ label: t("specs.bedrooms"), value: property.beds }]
      : []),
    ...(property.baths > 0 ? [{ label: t("specs.bathrooms"), value: property.baths }] : []),
    ...(property.toilets ? [{ label: t("specs.toilets") || "Aseos", value: property.toilets }] : []),
    ...(property.orientation ? [{ label: t("specs.orientation") || "Orientación", value: property.orientation }] : []),
    ...(property.heating ? [{ label: t("specs.heating") || "Calefacción", value: property.heating }] : []),
    ...(property.kitchenType ? [{ label: t("specs.kitchenType") || "Tipo de Cocina", value: property.kitchenType }] : []),
    ...(property.floorType ? [{ label: t("specs.floorType") || "Tipo de Suelo", value: property.floorType }] : []),
    ...(property.exteriorCarpentry ? [{ label: t("specs.exteriorCarpentry") || "Carpintería Exterior", value: property.exteriorCarpentry }] : []),
    ...(property.interiorCarpentry ? [{ label: t("specs.interiorCarpentry") || "Carpintería Interior", value: property.interiorCarpentry }] : []),
    ...(property.views ? [{ label: t("specs.views") || "Vistas", value: property.views }] : []),
    ...(property.commercialActivity ? [{ label: t("specs.commercialActivity") || "Actividad Comercial", value: property.commercialActivity }] : []),
    ...(property.hasSmokeVent ? [{ label: t("specs.smokeVent") || "Salida de Humos", value: "Sí" }] : []),
    ...(property.floorNumber !== undefined ? [{ label: t("specs.floor") || "Planta", value: property.floorNumber }] : []),
    ...(property.yearBuilt ? [{ label: t("specs.yearBuilt") || "Año Construcción", value: property.yearBuilt }] : []),
    ...(property.communityFees ? [{ label: t("specs.communityFees") || "Gastos de Comunidad", value: `${property.communityFees} €/mes` }] : []),
    ...(property.energyRating ? [{ label: t("specs.energyRating") || "Consumo Energía", value: property.energyRating }] : []),
    ...(property.emissionsRating ? [{ label: t("specs.emissionsRating") || "Emisiones", value: property.emissionsRating }] : []),
    ...(property.distMar ? [{ label: t("specs.distanceToSea"), value: property.distMar }] : []),
    ...(property.transferPrice ? [{ label: t("specs.transferPrice") || "Precio Traspaso", value: `${property.transferPrice.toLocaleString(locale)} €` }] : []),
    ...(property.rentalPrice ? [{ label: t("specs.rentalPrice") || "Precio Alquiler", value: `${property.rentalPrice.toLocaleString(locale)} €/mes` }] : []),
  ];

  const enabledCharacteristics = (property.characteristics || [])
    .filter((item) => item.value)
    .map((item) => item.label);

  const checklistItems = Array.from(new Set([...enabledCharacteristics]));

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <Navbar />

      <div className="container mx-auto p-4 max-w-7xl">
        <Link
          href="/propiedades"
          className="inline-flex items-center text-gray-600 hover:text-black font-medium mt-8 mb-8 transition-colors group"
        >
          <ChevronLeft
            size={20}
            className="mr-1 group-hover:-translate-x-1 transition-transform"
          />
          {t("actions.backToProperties")}
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              {property.operationType} · {t("header.referenceShort")}: {property.reference}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              {property.title}
            </h1>
            <p className="text-lg text-gray-600 flex items-center">
              <MapPin size={18} className="text-blue-600 mr-2 shrink-0" />
              {property.locationDetail ? `${property.locationDetail}, ` : ""}
              {property.location}
            </p>
          </div>

          <div className="text-left md:text-right bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-w-[220px]">
            <p className="text-sm text-gray-500 font-medium">{t("header.operationPrice")}</p>
            <p className="text-3xl font-black text-blue-600 flex items-center md:justify-end mt-0.5">
              {typeof property.price === "number" && <Euro size={28} className="mr-1" />}
              {typeof property.price === "number"
                ? property.price.toLocaleString(locale)
                : property.price}
            </p>
            {property.rentalPrice && property.transferPrice && (
              <p className="text-xs text-gray-600 font-medium mt-1">
                + {property.rentalPrice.toLocaleString(locale)} €/mes {t("header.rentSuffix") || "alquiler"}
              </p>
            )}
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Galería de imágenes */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 h-[300px] md:h-[480px]">
                <Image
                  src={activeImage}
                  alt={property.title}
                  fill
                  priority
                  className="object-cover"
                  unoptimized={activeImage.startsWith("http")}
                />
              </div>

              {property.images && property.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 transition-all border-2 ${
                        activeImage === img
                          ? "border-blue-600 scale-95"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={t("gallery.thumbnailAlt", { index: idx + 1 })}
                        fill
                        className="object-cover"
                        unoptimized={img.startsWith("http")}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ficha técnica rápida adaptada a categoría */}
            <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              {property.category === "commercial" ? (
                <>
                  <div className="flex flex-col items-center py-2 border-r border-gray-100">
                    <Bath size={24} className="text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">{t("specs.toilets") || "Aseos"}</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5">{property.toilets || property.baths || 1}</span>
                  </div>
                  <div className="flex flex-col items-center py-2 border-r border-gray-100">
                    <Maximize size={24} className="text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">{t("quickSpecs.area")}</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5">{property.area} m²</span>
                  </div>
                  <div className="flex flex-col items-center py-2">
                    <Building size={24} className="text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">{t("specs.activity") || "Actividad"}</span>
                    <span className="text-sm font-bold text-gray-900 mt-1 truncate max-w-[120px]">{property.commercialActivity || property.propertyType}</span>
                  </div>
                </>
              ) : property.category === "land" ? (
                <>
                  <div className="flex flex-col items-center py-2 border-r border-gray-100">
                    <Maximize size={24} className="text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">{t("specs.plotArea") || "Parcela"}</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5">{property.plotArea || property.area} m²</span>
                  </div>
                  <div className="flex flex-col items-center py-2 border-r border-gray-100">
                    <Building size={24} className="text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">{t("specs.propertyType")}</span>
                    <span className="text-sm font-bold text-gray-900 mt-1">{property.propertyType}</span>
                  </div>
                  <div className="flex flex-col items-center py-2">
                    <MapPin size={24} className="text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">{t("specs.city") || "Ciudad"}</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5">{property.city || "-"}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center py-2 border-r border-gray-100">
                    <Bed size={24} className="text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">{t("quickSpecs.bedrooms")}</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5">{property.beds}</span>
                  </div>
                  <div className="flex flex-col items-center py-2 border-r border-gray-100">
                    <Bath size={24} className="text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">{t("quickSpecs.bathrooms")}</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5">{property.baths}</span>
                  </div>
                  <div className="flex flex-col items-center py-2">
                    <Maximize size={24} className="text-blue-600 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">{property.plotArea ? (t("specs.plotArea") || "Parcela") : t("quickSpecs.area")}</span>
                    <span className="text-lg font-bold text-gray-900 mt-0.5">{property.plotArea ? `${property.plotArea} m²` : `${property.area} m²`}</span>
                  </div>
                </>
              )}
            </div>

            {/* Descripción */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                <FileText size={20} className="text-blue-600 mr-2" />
                {t("sections.propertyDescription")}
              </h3>
              <div className="text-gray-600 leading-relaxed space-y-4 whitespace-pre-line text-justify">
                {formattedDescription}
              </div>
            </div>

            {/* Especificaciones */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                <Building size={20} className="text-blue-600 mr-2" />
                {t("sections.featuresAndQualities")}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {specDetails.map((detail, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-gray-50/80" : "bg-white"}
                      >
                        <td className="py-3 px-4 font-semibold text-gray-700 text-sm w-1/2 border-b border-gray-100">
                          {detail.label}
                        </td>
                        <td className="py-3 px-4 text-gray-900 text-sm border-b border-gray-100">
                          {detail.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Equipamiento */}
            {checklistItems.length > 0 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                  <ShieldCheck size={20} className="text-blue-600 mr-2" />
                  {t("sections.equipmentAndServices")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {checklistItems.map((feature, idx) => (
                    <div
                      key={`${feature}-${idx}`}
                      className="flex items-center text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3 shrink-0">
                        <Check size={12} className="text-white stroke-[3]" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tarjeta Agente & Formulario EmailJS */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User size={18} className="text-blue-600 mr-2" />
                {t("sections.agentContact")}
              </h4>

              <div className="p-4 bg-blue-50/50 rounded-xl mb-6 border border-blue-100/50 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shrink-0 bg-blue-100 flex items-center justify-center">
                  {agentPhoto ? (
                    <Image
                      src={agentPhoto}
                      alt={agentName}
                      fill
                      className="object-cover"
                      unoptimized={agentPhoto.startsWith("http")}
                    />
                  ) : (
                    <User size={28} className="text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-base font-extrabold text-blue-900 leading-snug">
                    {agentName}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    {property.agency || t("fallbacks.defaultAgency")}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {agentPhone && (
                  <a
                    href={`tel:${agentPhone.replace(/\s+/g, "")}`}
                    className="flex items-center w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors border border-gray-100"
                  >
                    <Phone size={18} className="text-blue-600 mr-3 shrink-0" />
                    <span className="text-sm">{agentPhone}</span>
                  </a>
                )}
                {agentEmail && (
                  <a
                    href={`mailto:${agentEmail}`}
                    className="flex items-center w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors border border-gray-100 break-all"
                  >
                    <Mail size={18} className="text-blue-600 mr-3 shrink-0" />
                    <span className="text-sm">{agentEmail}</span>
                  </a>
                )}
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Formulario conectado con EmailJS */}
              <form onSubmit={handleSubmitForm} className="space-y-3">
                <p className="text-sm font-bold text-gray-800 mb-2">
                  {t("sections.requestInformation")}
                </p>

                {submitSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl">
                    {t("status.success")}
                  </div>
                )}

                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    {submitError}
                  </div>
                )}

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("form.fullNamePlaceholder")}
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-gray-900"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-gray-900"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t("form.phonePlaceholder")}
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-gray-900"
                />
                <textarea
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-gray-900 resize-none"
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      {t("form.sending")}
                    </>
                  ) : (
                    t("actions.sendMessage")
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
