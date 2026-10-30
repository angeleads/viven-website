import createMiddleware from "next-intl/middleware";
import {NextRequest, NextResponse} from "next/server";
import {routing} from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // Redirección para el QR impreso y enlaces heredados de administrador de fincas
  if (
    pathname === "/es/seccion/administrador-de-fincas/ef6c358766122053c98c3cc21b010bdd/es" ||
    pathname === "/es/seccion/administrador-de-fincas/ef6c358766122053c98c3cc21b010bdd/es/" ||
    pathname.startsWith("/es/seccion/administrador-de-fincas") ||
    pathname.startsWith("/seccion/administrador-de-fincas")
  ) {
    return NextResponse.redirect(new URL("/es/administrador-de-fincas", request.url), 308);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

