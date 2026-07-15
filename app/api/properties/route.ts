  import { NextRequest, NextResponse } from "next/server";
  import { queryInmovilla } from "@/lib/inmovilla";

  export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;

    const page = parseInt(params.get("page") || "0");
    const limit = parseInt(params.get("limit") || "20");

    const userIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";

    try {
      const data = await queryInmovilla({
        consultas: ["paginacion"],
        inicio: page * limit,
        numRegistros: limit,
        where: "",
        orden: "",
        userIp,
      });

      
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