import type React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logos/viven-remax-logo.png"
                alt="Viven Inmobiliaria"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6">
              Viven Inmobiliaria es tu socio de confianza para encontrar la
              propiedad perfecta en España. Con más de 15 años de experiencia,
              ofrecemos servicios inmobiliarios integrales y personalizados.
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
                href="https://www.instagram.com/viven_inmobiliaria"
                icon={<Instagram size={20} />}
              />
              <SocialLink
                href="http://linkedin.com/company/viven-franquicia"
                icon={<Linkedin size={20} />}
              />
              <SocialLink
                href="https://www.youtube.com/channel/UCUCJUH0FIf2NOoHG69SK_TA?view_as=subscriber"
                icon={<Youtube size={20} />}
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Enlaces rápidos</h4>
            <ul className="space-y-4">
              <FooterLink href="/">Inicio</FooterLink>
              <FooterLink href="/venta">Venta</FooterLink>
              <FooterLink href="/alquiler">Alquiler</FooterLink>
              <FooterLink href="/administrador-de-fincas">
                Administrador de fincas
              </FooterLink>
              <FooterLink href="/empresa">Empresa</FooterLink>
              <FooterLink href="/inversion">Inversión</FooterLink>
              <FooterLink href="/contacto">Contacto</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Mapas</h4>
            <ul className="space-y-4">
              <FooterMap
                phone="930 267 436"
                email="hola@viven.es"
                mapTitle="VIVEN - VILANOVA"
                mapLink="https://maps.app.goo.gl/t6yvtApknygLCB1e8"
              />
              <FooterMap
                phone="930 267 436"
                email="hola@viven.es"
                mapTitle="VIVEN - SITGES"
                mapLink="https://maps.app.goo.gl/nARgQY1L7nFAGEvg8"
              />
              <FooterMap
                phone="930 267 436"
                email="hola@viven.es"
                mapTitle="VIVEN - COSTA DAURADA"
                mapLink="https://maps.app.goo.gl/ZVa8YqNDNxtaiJUA8"
              />
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Suscríbete para recibir las últimas novedades del mercado
              inmobiliario.
            </p>
            <form className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-grow p-3 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-r-md transition-colors duration-300"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-sm">
              Al suscribirte, aceptas nuestra{" "}
              <Link
                href="/privacidad"
                className="text-blue-400 hover:underline"
              >
                política de privacidad
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Viven Inmobiliaria. Todos los
              derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacidad"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Política de privacidad
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Política de cookies
              </Link>
              <Link
                href="/legal"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Aviso legal
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

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-white transition-colors duration-300">
        {children}
      </Link>
    </li>
  )
}

function FooterMap({
  mapLink,
  mapTitle,
  phone,
  email,
}: {
  mapLink: string;
  mapTitle: string;
  phone: string;
  email: string;
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
      <ul className="space-y-1">
        <li>
          <a
            href={`tel:${phone}`}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {phone}
          </a>
        </li>
        <li>
          <a
            href={`mailto:${email}`}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {email}
          </a>
        </li>
      </ul>
    </div>
  );
}
