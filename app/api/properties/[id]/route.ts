import { NextRequest, NextResponse } from "next/server";
import { queryInmovilla } from "@/lib/inmovilla";
import { mapInmovillaToProperty } from "@/lib/format-property";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";

  try {
    // Hacemos consulta doble: paginacion (para datos del agente) + ficha (para descripción/detalles)
    const data = await queryInmovilla({
      consultas: [
        { tipo: "paginacion", inicio: 1, numRegistros: 1, where: `cod_ofer='${id}'` },
        { tipo: "ficha", where: `cod_ofer='${id}'` },
      ],
      userIp,
    });

    // Extraer respuesta de paginacion
    const rawPagList = data?.paginacion || [];
    const rawPagItem = Array.isArray(rawPagList)
      ? rawPagList.find((item: any) => item && typeof item === "object" && !("posicion" in item)) || rawPagList[0]
      : typeof rawPagList === "object"
      ? Object.values(rawPagList)[0]
      : {};

    // Extraer respuesta de ficha
    const rawFichaList = data?.ficha || [];
    const rawFichaItem = Array.isArray(rawFichaList)
      ? rawFichaList.find((item: any) => item && typeof item === "object" && !("posicion" in item)) || rawFichaList[0]
      : typeof rawFichaList === "object"
      ? Object.values(rawFichaList)[0]
      : {};

    if (!rawPagItem && !rawFichaItem) {
      return NextResponse.json(
        { error: "Propiedad no encontrada en el CRM de Inmovilla" },
        { status: 404 }
      );
    }

    // Fusionamos ambos objetos priorizando los campos de agente de paginación
    const combinedRaw = {
      ...rawPagItem,
      ...rawFichaItem,
      nombreagente: rawPagItem?.nombreagente || rawFichaItem?.nombreagente || rawFichaItem?.nomagente,
      apellidosagente: rawPagItem?.apellidosagente || rawFichaItem?.apellidosagente || rawFichaItem?.apeagente,
      telefono1agente: rawPagItem?.telefono1agente || rawFichaItem?.telefono1agente || rawFichaItem?.telagente,
      telefono2agente: rawPagItem?.telefono2agente || rawFichaItem?.telefono2agente,
      movilagente: rawPagItem?.movilagente || rawFichaItem?.movilagente,
      emailagente: rawPagItem?.emailagente || rawFichaItem?.emailagente,
      fotoagente: rawPagItem?.fotoagente || rawFichaItem?.fotoagente,
    };

    // Mapear con la lógica unificada
    const propertyDetail = mapInmovillaToProperty(combinedRaw);
    return NextResponse.json(propertyDetail);
  } catch (error: any) {
    console.error(`[Route Detail Error] Error en propiedad ${id}:`, error.message);
    return NextResponse.json(
      { error: "Error al conectar con la ficha del CRM", details: error.message },
      { status: 502 }
    );
  }
  
}