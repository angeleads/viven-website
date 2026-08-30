"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

const LANGUAGES: { code: AppLocale; labelKey: string }[] = [
  { code: "es", labelKey: "language.es" },
  { code: "en", labelKey: "language.en" },
  { code: "ca", labelKey: "language.ca" },
  { code: "fr", labelKey: "language.fr" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (nextLocale: AppLocale) => {
    router.replace(pathname, { locale: nextLocale });
    setIsLangOpen(false);
  };

  // Cerrar el dropdown de idioma al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center"
              aria-label="Viven Inmobiliaria home"
            >
              <Image
                src="/logos/viven-plus-logo.png"
                alt="Viven Plus"
                width={140}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
            <Link
              href="https://www.remax.es/buscador-de-oficinas/barcelona/vilanova-i-la-geltru/todos/remax-viven/"
              className="ml-5 flex items-center"
              aria-label="Viven Plus company page"
            >
              <Image
                src="/logos/logo-viven-remax-black-blue.png"
                alt="Viven Inmobiliaria"
                width={120}
                height={40}
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" pathname={pathname}>
              {t("nav.home")}
            </NavLink>
            <NavLink href="/propiedades" pathname={pathname}>
              {t("nav.properties")}
            </NavLink>
            <NavLink href="/administrador-de-fincas" pathname={pathname}>
              {t("nav.propertyManager")}
            </NavLink>
            <NavLink href="/empresa" pathname={pathname}>
              {t("nav.company")}
            </NavLink>
             <NavLink href="/inversion" pathname={pathname}>
              {t("nav.inversion")}
            </NavLink>
            <NavLink href="/contacto" pathname={pathname}>
              {t("nav.contact")}
            </NavLink>

            {/* Selector de Idioma Desktop Estilizado */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                aria-expanded={isLangOpen}
              >
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="uppercase font-semibold text-xs tracking-wider">
                  {locale}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white border border-gray-100 shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {LANGUAGES.map((lang) => {
                    const isSelected = locale === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="uppercase text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-600">
                            {lang.code}
                          </span>
                          {t(lang.labelKey)}
                        </span>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3 py-2">
              <MobileNavLink
                href="/"
                pathname={pathname}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </MobileNavLink>
              <MobileNavLink
                href="/propiedades"
                pathname={pathname}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.properties")}
              </MobileNavLink>
              <MobileNavLink
                href="/administrador-de-fincas"
                pathname={pathname}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.propertyManager")}
              </MobileNavLink>
              <MobileNavLink
                href="/empresa"
                pathname={pathname}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.company")}
              </MobileNavLink>
              <MobileNavLink
                href="/inversion"
                pathname={pathname}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.inversion")}
              </MobileNavLink>
              <MobileNavLink
                href="/contacto"
                pathname={pathname}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact")}
              </MobileNavLink>

              {/* Selector de Idioma Mobile Estilizado */}
              <div className="pt-3 mt-2 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {t("language.label")}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map((lang) => {
                    const isSelected = locale === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 text-blue-600 font-semibold"
                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="uppercase text-[10px] font-mono">
                            {lang.code}
                          </span>
                          <span>{t(lang.labelKey)}</span>
                        </span>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "text-blue-600 font-semibold"
          : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  pathname,
  onClick,
  children,
}: {
  href: string;
  pathname: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors duration-200 block py-1.5 ${
        isActive
          ? "text-blue-600 font-semibold pl-2 border-l-2 border-blue-600"
          : "text-gray-700 hover:text-blue-600"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
