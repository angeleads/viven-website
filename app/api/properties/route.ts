import { NextRequest, NextResponse } from "next/server";
import { queryInmovilla } from "@/lib/inmovilla";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  
  // Capturar paginación dinámica si viene de la URL
  const page = parseInt(params.get("page") || "0");
  const limit = parseInt(params.get("limit") || "20");
  
  // Cumplir requisito estricto: Extraer la IP real del usuario visitante
  const userIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "0.0.0.0";

  try {
    // Hacemos la consulta inicial de paginación para traer el listado
    const data = await queryInmovilla({
      consultas: ["paginacion", "tipos", "ciudades"], // Traemos paginación y catálogos de apoyo
      inicio: page * limit,
      numRegistros: limit,
      orden: "precio_asc", // Puedes cambiarlo según tu UI estróboscópica o minimalista
      userIp,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error en conexión con Inmovilla:", error.message);
    return NextResponse.json(
      { error: "Error al consultar la API de Inmovilla" },
      { status: 502 }
    );
  }
}