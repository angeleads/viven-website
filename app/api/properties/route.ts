import { NextRequest, NextResponse } from "next/server";
import { queryInmovilla } from "@/lib/inmovilla";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  // Capturar paginación dinámica si viene de la URL
  const page = parseInt(params.get("page") || "0");
  const limit = parseInt(params.get("limit") || "20");

  // Cumplir requisito estricto: Extraer la IP real del usuario visitante
  const userIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";

  try {
    const data = await queryInmovilla({
      consultas: ["paginacion"],
      inicio: page * limit,
      numRegistros: limit,
      orden: "precio_asc",
      userIp,
    });

    // SOLUCIÓN: Si Inmovilla responde con un objeto que tiene la propiedad 'paginacion',
    // extraemos el array real para que tu frontend reciba el listado directamente.
    const propiedadesEnBruto = data?.paginacion || data;

    return NextResponse.json(propiedadesEnBruto);
  } catch (error: any) {
    console.error("Error en conexión Proxy Inmovilla:", error.message);
    return NextResponse.json(
      { error: `Error al consultar las propiedades: ${error.message}` },
      { status: 502 },
    );
  }
}
