import { NextRequest, NextResponse } from "next/server";
import { parseInmovillaIdioma, queryInmovilla } from "@/lib/inmovilla";
import { mapInmovillaToProperty } from "@/lib/format-property";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = parseInt(params.get("page") || "1");
  const limit = Math.min(parseInt(params.get("limit") || "100"), 100);
  const idioma = parseInmovillaIdioma(params.get("idioma"));

  const userIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";

  try {
    const data = await queryInmovilla({
      consultas: [
        {
          tipo: "paginacion",
          inicio: page,
          numRegistros: limit,
          where: "",
          orden: "",
        },
      ],
      idioma,
      userIp,
    });

    const rawList = data?.paginacion || data || [];
    const itemsArray = Array.isArray(rawList)
      ? rawList
      : typeof rawList === "object"
      ? Object.values(rawList)
      : [];

    const realProperties = itemsArray.filter(
      (item: any) => item && typeof item === "object" && !("posicion" in item)
    );

    const rawLocale = params.get("idioma") || "es";
    const propiedades = realProperties.map((item: any) =>
      mapInmovillaToProperty(item, rawLocale)
    );
    return NextResponse.json(propiedades, {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (error: any) {
    console.error("Error en API de propiedades:", error.message);
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}