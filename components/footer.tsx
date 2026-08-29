"use client";

import type React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  ArrowRight,
  Phone,
  MailCheck
} from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logos/logo-viven-remax-white.png"
                alt="Viven Inmobiliaria"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6">
              {t("about")}
            </p>
            <div className="flex space-x-4">
              <SocialLink
                href="https://www.facebook.com/viveninmobiliaria"
                icon={<Facebook size={20} />}
              />
              <SocialLink
                href="https://twitter.com/viven_inmo"
                icon={<Twitter size={20} />}
              />
              <SocialLink
                href="https://www.instagram.com/remax_viven/"
                icon={<Instagram size={20} />}
              />
              <SocialLink
                href="https://www.linkedin.com/company/remax-viven/"
                icon={<Linkedin size={20} />}
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t("quickLinksTitle")}</h4>
            <ul className="space-y-4">
              <FooterLink href="/">{t("links.home")}</FooterLink>
              <FooterLink href="/propiedades">{t("links.properties")}</FooterLink>
              <FooterLink href="/administrador-de-fincas">
                {t("links.propertyManager")}
              </FooterLink>
              <FooterLink href="/empresa">{t("links.company")}</FooterLink>
              {/* <FooterLink href="/inversion">Inversión</FooterLink> */}
              <FooterLink href="/contacto">{t("links.contact")}</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t("mapsTitle")}</h4>
            <ul className="space-y-4">
              <FooterMap
                mapTitle="VIVEN - VILANOVA"
                mapLink="https://maps.app.goo.gl/t6yvtApknygLCB1e8"
              />
              <FooterMap
                mapTitle="VIVEN - SITGES"
                mapLink="https://maps.app.goo.gl/nARgQY1L7nFAGEvg8"
              />
              <FooterMap
                mapTitle="VIVEN - COSTA DAURADA"
                mapLink="https://maps.app.goo.gl/dTj7q3wAVyJEZxQk8"
              />
            </ul>
            <ul className="space-y-1">
              <div className="flex items-center mb-3 mt-3">
                <Phone className="text-blue-600 mr-2" />

                <li>
                  <a
                    href="tel:+34930267436"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +34 930 267 436
                  </a>
                </li>
              </div>
              <div className="flex items-center">
              <MailCheck className="text-blue-600 mr-2" />
                <li>
                  <a
                    href="mailto:hola@viven.es"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    hola@viven.es
                  </a>
                </li>
              </div>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-3">{t("newsletterTitle")}</h4>
            <p className="text-gray-400 mb-4">
              {t("newsletterText")}
            </p>
            <form className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="flex-grow p-3 bg-gray-800 text-white border border-gray-700 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-r-xl transition-colors duration-300"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-sm">
              {t("privacyAcceptPrefix")}{" "}
              <Link
                href="/privacidad"
                className="text-blue-400 hover:underline"
              >
                {t("privacyPolicy")}
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Viven Inmobiliaria. {t("rights")}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacidad"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t("cookiesPolicy")}
              </Link>
              <Link
                href="/legal"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {t("legalNotice")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="bg-gray-800 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </Link>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-400 hover:text-white transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterMap({
  mapLink,
  mapTitle,
}: {
  mapLink: string;
  mapTitle: string;
}) {
  return (
    <div>
      <div className="flex items-center">
        <MapPin className="text-blue-600 mr-2" />
        <Link
          href={mapLink}
          className="text-gray-400 hover:text-white hover:underline transition-colors"
        >
          {mapTitle}
        </Link>
      </div>
    </div>
  );
}
