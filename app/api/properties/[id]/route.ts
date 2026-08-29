import { NextRequest, NextResponse } from "next/server";
import { parseInmovillaIdioma, queryInmovilla } from "@/lib/inmovilla";
import { mapInmovillaToProperty } from "@/lib/format-property";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idioma = parseInmovillaIdioma(request.nextUrl.searchParams.get("idioma"));
  const userIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";

  try {
    // Consulta principal: ficha (detalle)
    const fichaData = await queryInmovilla({
      consultas: [
        {
          tipo: "ficha",
          inicio: 1,
          numRegistros: 1,
          where: `cod_ofer='${id}'`,
          orden: "",
        },
      ],
      idioma,
      userIp,
    });

    const rawFichaList = fichaData?.ficha || fichaData || [];
    const rawFichaItem = Array.isArray(rawFichaList)
      ? rawFichaList.find((item: any) => item && typeof item === "object" && !("posicion" in item)) || rawFichaList[0]
      : typeof rawFichaList === "object"
      ? Object.values(rawFichaList)[0]
      : {};

    if (!rawFichaItem) {
      return NextResponse.json(
        { error: "Propiedad no encontrada en el CRM de Inmovilla" },
        { status: 404 }
      );
    }

    const hasAgentDataInFicha = Boolean(
      rawFichaItem?.nombreagente ||
        rawFichaItem?.nomagente ||
        rawFichaItem?.apellidosagente ||
        rawFichaItem?.apeagente ||
        rawFichaItem?.telefono1agente ||
        rawFichaItem?.telefono2agente ||
        rawFichaItem?.movilagente ||
        rawFichaItem?.telagente ||
        rawFichaItem?.emailagente ||
        rawFichaItem?.fotoagente
    );

    let rawPagItem: any = {};
    if (!hasAgentDataInFicha) {
      const pagData = await queryInmovilla({
        consultas: [
          {
            tipo: "paginacion",
            inicio: 1,
            numRegistros: 1,
            where: `cod_ofer='${id}'`,
            orden: "",
          },
        ],
        idioma,
        userIp,
      });

      const rawPagList = pagData?.paginacion || pagData || [];
      rawPagItem = Array.isArray(rawPagList)
        ? rawPagList.find((item: any) => item && typeof item === "object" && !("posicion" in item)) || rawPagList[0]
        : typeof rawPagList === "object"
        ? Object.values(rawPagList)[0]
        : {};
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
    return NextResponse.json(propertyDetail, {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (error: any) {
    console.error(`[Route Detail Error] Error en propiedad ${id}:`, error.message);
    return NextResponse.json(
      { error: "Error al conectar con la ficha del CRM", details: error.message },
      { status: 502 }
    );
  }
  
}