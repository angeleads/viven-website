import { NextRequest, NextResponse } from "next/server";
import { queryInmovilla } from "@/lib/inmovilla";
import { mapInmovillaToProperty } from "@/lib/format-property";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = parseInt(params.get("page") || "1");
  const limit = Math.min(parseInt(params.get("limit") || "100"), 100);

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

    const propiedades = realProperties.map(mapInmovillaToProperty);
    return NextResponse.json(propiedades);
  } catch (error: any) {
    console.error("Error en API de propiedades:", error.message);
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}