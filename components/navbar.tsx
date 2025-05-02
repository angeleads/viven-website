"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/viven-remax-logo.png"
              alt="Viven Inmobiliaria"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Inicio</NavLink>
            <NavLink href="/venta">Venta</NavLink>
            <NavLink href="/alquiler">Alquiler</NavLink>
            <NavLink href="/administrador-de-fincas">Administrador de fincas</NavLink>
            <NavLink href="/empresa">Empresa</NavLink>
            <NavLink href="/inversion">Inversión</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4 py-4">
              <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
                Inicio
              </MobileNavLink>
              <MobileNavLink
                href="/venta"
                onClick={() => setIsMenuOpen(false)}
              >
                Venta
              </MobileNavLink>
              <MobileNavLink
                href="/alquiler"
                onClick={() => setIsMenuOpen(false)}
              >
                Alquiler
              </MobileNavLink>
              <MobileNavLink
                href="/administrador-de-fincas"
                onClick={() => setIsMenuOpen(false)}
              >
                Administrador de fincas
              </MobileNavLink>
              <MobileNavLink
                href="/empresa"
                onClick={() => setIsMenuOpen(false)}
              >
                Empresa
              </MobileNavLink>
              <MobileNavLink
                href="/inversion"
                onClick={() => setIsMenuOpen(false)}
              >
                Invesion
              </MobileNavLink>
              <MobileNavLink
                href="/contacto"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </MobileNavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300 block py-2"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
