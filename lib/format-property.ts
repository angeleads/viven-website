import type { Property, Agent } from "@/types/property";

export function mapInmovillaToProperty(raw: any): Property {
  if (!raw) return {} as Property;

  const id = String(raw.id || raw.cod_ofer || raw.ref || Math.random());
  const reference = String(raw.reference || raw.ref || raw.cod_ofer || id);

  // Título y Tipo
  const propertyType = raw.nbtipo || raw.des_tipo || raw.tipo || "Inmueble";
  const city = raw.ciudad || raw.pobla || raw.poblacion || "";
  const zone = raw.zona || raw.des_zona || "";
  const title =
    raw.title ||
    raw.tituloes ||
    raw.titulo ||
    (city ? `${propertyType} en ${city}` : propertyType);

  // Ubicación
  const locationParts = [city, zone, raw.zonaauxiliar].filter(Boolean);
  const location =
    raw.location && raw.location !== "Ubicación no especificada"
      ? raw.location
      : locationParts.join(" / ") || "Ubicación no especificada";

  const locationDetail =
    raw.locationDetail ||
    [raw.nomcalle || raw.calle, raw.numero].filter(Boolean).join(", ");

  // Precio
  const rawPrice =
    raw.precioreal ??
    raw.precioinmo ??
    raw.preciotraspaso ??
    raw.precioalq ??
    raw.precio;
  const price =
    typeof raw.price === "number"
      ? raw.price
      : Number(rawPrice) || "Consulte";

  // Operación
  let operationType = raw.operationType || "Venta";
  if (!raw.operationType) {
    if (Number(raw.preciotraspaso) > 0) operationType = "Traspaso";
    else if (
      Number(raw.precioalq) > 0 ||
      raw.tipomensual === "MES" ||
      raw.keyacci === 2
    )
      operationType = "Alquiler";
  }

  // Medidas y Estancias (Solución al fallo de 0 habitaciones)
  const beds = Number(
    raw.beds || raw.total_hab || raw.habdobles || raw.habitaciones || 0
  );
  const baths = Number(
    raw.baths || raw.banyos || raw.sumaseos || raw.aseos || 0
  );
  const usefulArea = Number(raw.m_uties || 0);
  const builtArea = Number(raw.m_cons || raw.area || 0);
  const area = builtArea || usefulArea;

  // Distancia al mar formateada
  let distMar: string | null = null;
  if (raw.distmar !== undefined && raw.distmar !== null && raw.distmar !== "") {
    const meters = Number(raw.distmar);
    distMar = meters >= 1000 ? `${(meters / 1000).toFixed(1)} Km` : `${meters} m`;
  }

  // Imágenes
  let images: string[] = Array.isArray(raw.images) ? raw.images : [];
  if (images.length === 0) {
    const totalFotos = Number(raw.numfotos || 0);
    if (
      totalFotos > 0 &&
      raw.srvfotos &&
      raw.numagencia &&
      raw.cod_ofer &&
      raw.fotoletra
    ) {
      for (let i = 1; i <= Math.min(totalFotos, 30); i++) {
        images.push(
          `https://fotos${raw.srvfotos}.apinmo.com/${raw.numagencia}/${raw.cod_ofer}/${raw.fotoletra}-${i}.jpg`
        );
      }
    } else if (raw.foto) {
      images.push(raw.foto);
    } else if (raw.image) {
      images.push(raw.image);
    }
  }
  if (images.length === 0) images.push("/placeholder.svg?height=600&width=800");

  // Agente
  const extractedName =
    raw.agent?.name ||
    [raw.nombreagente || raw.nomagente, raw.apellidosagente || raw.apeagente]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    (typeof raw.agente === "string" ? raw.agente : raw.agente?.nombre) ||
    raw.agencia ||
    "RE/MAX Viven";

  let extractedPhone = raw.agent?.phone || "";
  if (!extractedPhone) {
    if (raw.telefono2agente) {
      extractedPhone = `+${raw.prefijotel2agente || 34} ${raw.telefono2agente}`;
    } else if (raw.telefono1agente) {
      extractedPhone = `+${raw.prefijotel1agente || 34} ${raw.telefono1agente}`;
    } else if (raw.movilagente || raw.telagente) {
      extractedPhone = raw.movilagente || raw.telagente;
    } else if (raw.agencyPhone) {
      extractedPhone = raw.agencyPhone;
    }
  }

  const extractedEmail =
    raw.agent?.email ||
    raw.emailagente ||
    raw.email_agente ||
    raw.agencyEmail ||
    "";

  const extractedPhoto =
    raw.agent?.photo ||
    raw.fotoagente ||
    raw.foto_agente ||
    "";

  const agent: Agent = {
    name: extractedName,
    phone: extractedPhone,
    email: extractedEmail,
    photo: extractedPhoto,
  };

  // Características y equipamiento
  const featuresSet = new Set<string>();

  if (raw.nbconservacion) featuresSet.add(raw.nbconservacion);
  if (Number(raw.muebles) === 1) featuresSet.add("Amueblado");
  if (Number(raw.ascensor) === 1) featuresSet.add("Ascensor");
  if (Number(raw.balcon) === 1) featuresSet.add("Balcón");
  if (Number(raw.terraza) === 1 || Number(raw.m_terraza) > 0) featuresSet.add("Terraza");
  if (Number(raw.piscina_com) === 1) featuresSet.add("Piscina Comunitaria");
  if (Number(raw.piscina_prop) === 1) featuresSet.add("Piscina Privada");
  if (Number(raw.parking) > 0 || Number(raw.plaza_gara) > 0) featuresSet.add("Parking Incluido");
  if (Number(raw.airecentral) === 1) featuresSet.add("Aire Acond. Central");
  else if (Number(raw.aire_con) === 1) featuresSet.add("Aire Acondicionado");
  if (Number(raw.calefacentral) === 1) featuresSet.add("Calefacción Central");
  else if (Number(raw.calefaccion) === 1) featuresSet.add("Calefacción");
  if (Number(raw.vistasalmar) === 1) featuresSet.add("Vistas al Mar");
  if (Number(raw.primera_line) === 1) featuresSet.add("Zona de Costa / 1ª Línea");
  if (Number(raw.vistasdespejadas) === 1) featuresSet.add("Vistas Despejadas");
  if (Number(raw.todoext) > 0) featuresSet.add("Exterior");
  if (Number(raw.tour_virtual) === 1) featuresSet.add("Tour Virtual");

  if (Array.isArray(raw.features)) {
    raw.features.forEach((f: string) => featuresSet.add(f));
  }

  return {
    id,
    reference,
    title,
    description:
      raw.description ||
      raw.descripciones ||
      raw.descripcion ||
      raw.observaciones ||
      "Sin descripción disponible.",
    location,
    locationDetail,
    price,
    image: images[0],
    images,
    beds,
    baths,
    area,
    usefulArea,
    builtArea,
    propertyType,
    conservation: raw.nbconservacion || "No especificado",
    city,
    zone,
    distMar,
    operationType,
    date: raw.date || raw.fechaact || raw.fecha || new Date().toISOString(),
    features: Array.from(featuresSet),
    agency: raw.agency || raw.agencia || "RE/MAX Viven",
    agencyPhone: extractedPhone,
    agencyEmail: extractedEmail,
    agent,
  };
}