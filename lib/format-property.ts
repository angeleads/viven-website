import type { Property, Agent, PropertyCharacteristic } from "@/types/property";
import {
  normalizeLocale,
  getPropertyCategory,
  getPropertyTypeName,
  getOperationName,
  getOrientationName,
  getConservationName,
  getHeatingName,
  getFloorTypeName,
  getKitchenTypeName,
  getViewsName,
  getExtCarpentryName,
  getIntCarpentryName,
  getCommercialActivityName,
  parseXEntorno,
} from "./inmovilla-dict";

export function mapInmovillaToProperty(raw: any, locale?: string): Property {
  if (!raw) return {} as Property;

  const normLocale = normalizeLocale(locale);

  const toBooleanFlag = (value: unknown): boolean => {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value === 1;
    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      return (
        normalized === "1" ||
        normalized === "true" ||
        normalized === "si" ||
        normalized === "sí" ||
        normalized === "yes"
      );
    }
    return false;
  };

  const id = String(raw.id || raw.cod_ofer || raw.ref || Math.random());
  const reference = String(raw.reference || raw.ref || raw.cod_ofer || id);

  // Categoría y Tipo de Inmueble
  const propertyTypeCode = Number(raw.propertyTypeCode ?? raw.key_tipo ?? 0);
  const category = raw.category || getPropertyCategory(propertyTypeCode);
  const propertyType =
    (propertyTypeCode > 0
      ? getPropertyTypeName(
          propertyTypeCode,
          raw.nbtipo || raw.des_tipo || raw.tipo,
          normLocale
        )
      : null) ||
    raw.propertyType ||
    getPropertyTypeName(
      propertyTypeCode,
      raw.nbtipo || raw.des_tipo || raw.tipo,
      normLocale
    );

  const city = raw.city || raw.ciudad || raw.pobla || raw.poblacion || "";
  const zone = raw.zone || raw.zona || raw.des_zona || "";
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

  // Tipo de Operación
  const operationTypeCode = Number(raw.operationTypeCode ?? raw.keyacci ?? 0);
  let operationType =
    (operationTypeCode > 0
      ? getOperationName(operationTypeCode, raw.operationType, normLocale)
      : null) ||
    raw.operationType ||
    getOperationName(operationTypeCode, raw.operationType, normLocale);

  // Extracción exhaustiva de todos los campos de precio de Inmovilla
  const agencyPriceNum = Number(raw.precioinmo ?? 0);
  const basePriceNum = Number(
    raw.precio !== undefined && raw.precio !== null && raw.precio !== ""
      ? raw.precio
      : typeof raw.price === "number"
      ? raw.price
      : 0
  );
  const realPriceNum = Number(raw.precioreal ?? raw.preciopvp ?? 0);
  const transferPriceNum = Number(raw.transferPrice ?? raw.preciotraspaso ?? 0);
  const rentalPriceNum = Number(raw.rentalPrice ?? raw.precioalq ?? 0);
  const vacationPriceNum = Number(raw.precioalqvacacional ?? raw.precioalqvaca ?? 0);
  const isConsultPriceFlag = raw.aconsultar === "1" || raw.aconsultar === 1;

  // Detección de tipos comerciales de hostelería/negocios típicos de traspaso
  const isHospitalityOrBusiness = [4499, 7799, 7899, 7999, 8299, 9899, 1299].includes(propertyTypeCode);
  const isExplicitTransferOp = [3, 5, 6, 7, 18].includes(operationTypeCode);
  const isExplicitRentOp = [2, 9, 16, 20].includes(operationTypeCode) || raw.tipomensual === "MES";

  let price: number | string = "Consulte";
  let transferPrice: number | undefined = undefined;
  let rentalPrice: number | undefined = undefined;

  if (
    isExplicitTransferOp ||
    (isHospitalityOrBusiness && transferPriceNum > 0) ||
    (transferPriceNum > 0 && agencyPriceNum === 0 && basePriceNum === 0)
  ) {
    // 1. Caso Traspaso (Locales, Bares, Cafeterías o keyacci de traspaso)
    price =
      transferPriceNum > 0
        ? transferPriceNum
        : agencyPriceNum > 0
        ? agencyPriceNum
        : basePriceNum > 0
        ? basePriceNum
        : "Consulte";
    transferPrice = transferPriceNum > 0 ? transferPriceNum : undefined;
    rentalPrice = rentalPriceNum > 0 ? rentalPriceNum : undefined;

    if (operationTypeCode === 0 || !isExplicitTransferOp) {
      operationType = getOperationName(3, "Traspaso", normLocale);
    }
  } else if (
    isExplicitRentOp ||
    (rentalPriceNum > 0 && agencyPriceNum === 0 && basePriceNum === 0)
  ) {
    // 2. Caso Alquiler
    price =
      rentalPriceNum > 0
        ? rentalPriceNum
        : vacationPriceNum > 0
        ? vacationPriceNum
        : agencyPriceNum > 0
        ? agencyPriceNum
        : basePriceNum > 0
        ? basePriceNum
        : "Consulte";
    rentalPrice =
      typeof price === "number"
        ? price
        : rentalPriceNum > 0
        ? rentalPriceNum
        : undefined;

    if (operationTypeCode === 0 && !isExplicitRentOp) {
      operationType = getOperationName(2, "Alquiler", normLocale);
    }
  } else {
    // 3. Caso Venta estándar (Masías 899, Chalets 499, Pisos 3399, Solares 3899, etc.)
    if (agencyPriceNum > 0) {
      price = agencyPriceNum;
    } else if (basePriceNum > 0) {
      price = basePriceNum;
    } else if (realPriceNum > 0) {
      price = realPriceNum;
    } else if (transferPriceNum > 0) {
      price = transferPriceNum;
      transferPrice = transferPriceNum;
    } else if (rentalPriceNum > 0) {
      price = rentalPriceNum;
      rentalPrice = rentalPriceNum;
    } else if (typeof raw.price === "number" && raw.price > 0) {
      price = raw.price;
    } else {
      price = "Consulte";
    }
  }

  if (isConsultPriceFlag && price === "Consulte") {
    price = "Consulte";
  }

  // Medidas y Estancias adaptadas
  const beds = Number(
    raw.beds ?? raw.total_hab ?? raw.habdobles ?? raw.habitaciones ?? 0
  );
  const baths = Number(raw.baths ?? raw.banyos ?? 0);
  const toilets = Number(raw.toilets ?? raw.aseos ?? raw.sumaseos ?? 0);

  const usefulArea = Number(raw.usefulArea ?? raw.m_utiles ?? raw.m_uties ?? 0);
  const builtArea = Number(raw.builtArea ?? raw.m_cons ?? raw.area ?? 0);
  const plotArea = Number(raw.plotArea ?? raw.m_parcela ?? 0);
  const terraceArea = Number(raw.terraceArea ?? raw.m_terraza ?? 0);
  const area = builtArea || usefulArea || plotArea;

  // Orientación, conservación y características técnicas
  const orientation =
    raw.orientation ||
    getOrientationName(raw.keyori, normLocale) ||
    undefined;
  const conservation =
    raw.conservation ||
    getConservationName(raw.conservacion, raw.nbconservacion, normLocale);
  const heating =
    raw.heating ||
    getHeatingName(raw.keycalefa, normLocale) ||
    undefined;
  const floorType =
    raw.floorType ||
    getFloorTypeName(raw.keysuelo, normLocale) ||
    undefined;
  const kitchenType =
    raw.kitchenType ||
    getKitchenTypeName(raw.cocina_inde, normLocale) ||
    undefined;
  const views =
    raw.views ||
    getViewsName(raw.keyvista, normLocale) ||
    undefined;
  const interiorCarpentry =
    raw.interiorCarpentry ||
    getIntCarpentryName(raw.keycarpin, normLocale) ||
    undefined;
  const exteriorCarpentry =
    raw.exteriorCarpentry ||
    getExtCarpentryName(raw.keycarpinext, normLocale) ||
    undefined;
  const commercialActivity =
    raw.commercialActivity ||
    getCommercialActivityName(
      raw.actividad_comercial ?? raw.actividadcomercial,
      normLocale
    ) ||
    undefined;
  const hasSmokeVent =
    raw.hasSmokeVent !== undefined
      ? Boolean(raw.hasSmokeVent)
      : toBooleanFlag(raw.salida_humos);
  const floorNumber = raw.floorNumber ?? raw.numplanta ?? raw.planta ?? undefined;
  const yearBuilt =
    raw.yearBuilt ??
    (Number(raw.antiguedad || 0) > 1800 ? Number(raw.antiguedad) : undefined);
  const communityFees =
    raw.communityFees ??
    (Number(raw.gastos_com || 0) > 0 ? Number(raw.gastos_com) : undefined);
  const energyRating =
    raw.energyRating ??
    (raw.energialetra && raw.energialetra !== "0"
      ? String(raw.energialetra).toUpperCase()
      : undefined);
  const emissionsRating =
    raw.emissionsRating ??
    (raw.emisionesletra && raw.emisionesletra !== "0"
      ? String(raw.emisionesletra).toUpperCase()
      : undefined);
  const garagePlaces = Number(
    raw.garagePlaces ?? raw.plaza_gara ?? raw.parking ?? raw.nplazasparking ?? 0
  );

  // Distancia al mar formateada
  let distMar: string | null = raw.distMar ?? null;
  if (
    !distMar &&
    raw.distmar !== undefined &&
    raw.distmar !== null &&
    raw.distmar !== "" &&
    Number(raw.distmar) > 0
  ) {
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

  // Agente asignado
  const extractedName =
    raw.agent?.name ||
    [raw.nombreagente || raw.nomagente, raw.apellidosagente || raw.apeagente]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    (typeof raw.agente === "string" ? raw.agente : raw.agente?.nombre) ||
    raw.agencia ||
    raw.agency ||
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

  const characteristicDefinitions: Array<{
    key: string;
    label: string;
    getValue?: (r: any) => any;
  }> = [
    { key: "patio", label: "Patio", getValue: (r) => r.patio },
    { key: "linea_tlf", label: "Línea Telefónica", getValue: (r) => r.linea_tlf ?? r.linea_telefono },
    { key: "arma_empo", label: "Armarios Empotrados", getValue: (r) => r.arma_empo ?? r.armarios_empotrados },
    { key: "buardilla", label: "Buhardilla", getValue: (r) => r.buardilla ?? r.buhardilla },
    { key: "muebles", label: "Muebles", getValue: (r) => r.muebles },
    { key: "calefaccion", label: "Calefacción", getValue: (r) => r.calefaccion },
    { key: "calefacentral", label: "Calefacción Central", getValue: (r) => r.calefacentral },
    { key: "aire_con", label: "Aire Acondicionado", getValue: (r) => r.aire_con ?? r.aireacondicionado },
    { key: "airecentral", label: "Aire Central", getValue: (r) => r.airecentral },
    { key: "luz", label: "Luz", getValue: (r) => r.luz },
    { key: "agua", label: "Agua", getValue: (r) => r.agua },
    { key: "gasciudad", label: "Gas Ciudad", getValue: (r) => r.gasciudad },
    { key: "chimenea", label: "Chimenea", getValue: (r) => r.chimenea },
    { key: "depoagua", label: "Deposito Agua", getValue: (r) => r.depoagua ?? r.deposito_agua },
    { key: "barbacoa", label: "Barbacoa", getValue: (r) => r.barbacoa },
    { key: "tv", label: "T.V.", getValue: (r) => r.tv },
    { key: "apartseparado", label: "Apart. Separado", getValue: (r) => r.apartseparado ?? r.apartamento_separado },
    { key: "todoext", label: "Exterior", getValue: (r) => r.todoext === 1 || r.todoext === 2 || r.todoext === "1" || r.todoext === "2" },
    { key: "jardin", label: "Jardín", getValue: (r) => r.jardin },
    { key: "bombafriocalor", label: "Bomba Frío Y Calor", getValue: (r) => r.bombafriocalor },
    { key: "luminoso", label: "Luminoso", getValue: (r) => r.luminoso },
    { key: "esquina", label: "Esquina", getValue: (r) => r.esquina },
    { key: "vistasdespejadas", label: "Vistas Despejadas", getValue: (r) => r.vistasdespejadas },
    { key: "parques", label: "Zonas Verdes", getValue: (r) => r.parques ?? r.zonasverdes },
    { key: "urbanizacion", label: "Urbanización", getValue: (r) => r.urbanizacion },
    { key: "arboles", label: "Arboles", getValue: (r) => r.arboles },
    { key: "hospitales", label: "Hospitales", getValue: (r) => r.hospitales },
    { key: "golf", label: "Golf", getValue: (r) => r.golf },
    { key: "montana", label: "Montaña", getValue: (r) => r.montana },
    { key: "costa", label: "Zona De Costa", getValue: (r) => r.costa },
    { key: "colegios", label: "Colegios", getValue: (r) => r.colegios },
    { key: "supermercados", label: "Supermercados", getValue: (r) => r.supermercados },
    { key: "centrosalud", label: "Centros Médicos", getValue: (r) => r.centrosalud ?? r.centros_medicos },
    { key: "centrico", label: "Céntrico", getValue: (r) => r.centrico },
    { key: "centros_comerciales", label: "Centros Comerciales", getValue: (r) => r.centros_comerciales },
    { key: "autobuses", label: "Autobuses", getValue: (r) => r.autobuses },
    { key: "tren", label: "Tren", getValue: (r) => r.tren },
    { key: "metro", label: "Metro", getValue: (r) => r.metro },
    { key: "tranvia", label: "Tranvía", getValue: (r) => r.tranvia },
    { key: "zonasinfantiles", label: "Zonas Infantiles", getValue: (r) => r.zonasinfantiles },
    { key: "cerca_de_universidad", label: "Cerca de Universidad", getValue: (r) => r.cerca_de_universidad ?? r["Cerca de Universidad"] },
    { key: "zona_de_paso", label: "Zona de Paso", getValue: (r) => r.zona_de_paso ?? r["zona de paso"] },
    { key: "rural", label: "Rural", getValue: (r) => r.rural },
    { key: "primera_linea", label: "Primera Línea", getValue: (r) => r.primera_linea ?? r.primera_line },
    { key: "vistasalmar", label: "Vistas al Mar", getValue: (r) => r.vistasalmar },
    { key: "piscina_prop", label: "Piscina Privada", getValue: (r) => r.piscina_prop ?? r.piscina_privada },
    { key: "piscina_com", label: "Piscina Comunitaria", getValue: (r) => r.piscina_com },
    { key: "parking", label: "Parking", getValue: (r) => r.parking ?? r.plaza_gara },
    { key: "garajedoble", label: "Garaje Doble", getValue: (r) => r.garajedoble },
    { key: "trastero", label: "Trastero", getValue: (r) => r.trastero },
    { key: "ascensor", label: "Ascensor", getValue: (r) => r.ascensor },
    { key: "montacargas", label: "Montacargas", getValue: (r) => r.montacargas },
    { key: "puertasauto", label: "Puertas Automáticas", getValue: (r) => r.puertasauto },
    { key: "puerta_blin", label: "Puerta Blindada", getValue: (r) => r.puerta_blin },
    { key: "alarma", label: "Alarma", getValue: (r) => r.alarma },
    { key: "alarmarobo", label: "Alarma de Robo", getValue: (r) => r.alarmarobo },
    { key: "alarmaincendio", label: "Alarma de Incendio", getValue: (r) => r.alarmaincendio },
    { key: "vigilancia_24", label: "Vigilancia 24h", getValue: (r) => r.vigilancia_24 },
    { key: "cajafuerte", label: "Caja Fuerte", getValue: (r) => r.cajafuerte },
    { key: "satelite", label: "Satélite", getValue: (r) => r.satelite },
    { key: "jacuzzi", label: "Jacuzzi", getValue: (r) => r.jacuzzi },
    { key: "sauna", label: "Sauna", getValue: (r) => r.sauna },
    { key: "hidromasaje", label: "Hidromasaje", getValue: (r) => r.hidromasaje },
    { key: "gimnasio", label: "Gimnasio", getValue: (r) => r.gimnasio },
    { key: "tenis", label: "Tenis", getValue: (r) => r.tenis ?? r.teniscom },
    { key: "balcon", label: "Balcón", getValue: (r) => r.balcon },
    { key: "terraza", label: "Terraza", getValue: (r) => r.terraza },
    { key: "terrazaacris", label: "Terraza Acristalada", getValue: (r) => r.terrazaacris },
    { key: "solarium", label: "Solárium", getValue: (r) => r.solarium },
    { key: "mirador", label: "Mirador", getValue: (r) => r.mirador },
    { key: "pergola", label: "Pérgola", getValue: (r) => r.pergola },
    { key: "sotano", label: "Sótano", getValue: (r) => r.sotano },
    { key: "altillo", label: "Altillo", getValue: (r) => r.altillo },
    { key: "despensa", label: "Despensa", getValue: (r) => r.despensa },
    { key: "galeria", label: "Galería", getValue: (r) => r.galeria },
    { key: "lavanderia", label: "Lavandería", getValue: (r) => r.lavanderia },
    { key: "diafano", label: "Diáfano", getValue: (r) => r.diafano },
    { key: "vallado", label: "Vallado", getValue: (r) => r.vallado },
    { key: "riegoauto", label: "Riego Automático", getValue: (r) => r.riegoauto },
    { key: "descalcificador", label: "Descalcificador", getValue: (r) => r.descalcificador },
    { key: "hilomusical", label: "Hilo Musical", getValue: (r) => r.hilomusical ?? r.preinsthmusi },
    { key: "preinstaacc", label: "Preinstalación A/A", getValue: (r) => r.preinstaacc },
    { key: "trifasica", label: "Trifásica", getValue: (r) => r.trifasica },
    { key: "video_port", label: "Videoportero", getValue: (r) => r.video_port },
    { key: "electro", label: "Electrodomésticos", getValue: (r) => r.electro },
    { key: "salida_humos", label: "Salida de Humos", getValue: (r) => r.salida_humos },
    { key: "banyo_suite", label: "Baño en Suite", getValue: (r) => r.banyo_suite },
    { key: "adaptadominus", label: "Adaptado Minusválidos", getValue: (r) => r.adaptadominus },
    { key: "habjuegos", label: "Habitación de Juegos", getValue: (r) => r.habjuegos },
    { key: "ojobuey", label: "Ojos de Buey", getValue: (r) => r.ojobuey },
    { key: "vestuarios", label: "Vestuarios", getValue: (r) => r.vestuarios },
    { key: "exclu", label: "Exclusiva", getValue: (r) => r.exclu ?? r.exclusiva },
    { key: "opcioncompra", label: "Opción a Compra", getValue: (r) => r.opcioncompra },
    { key: "comunidadincluida", label: "Comunidad Incluida", getValue: (r) => r.comunidadincluida },
  ];

  const baseCharacteristics: PropertyCharacteristic[] =
    characteristicDefinitions.map(({ key, label, getValue }) => {
      const sourceValue = getValue ? getValue(raw) : raw[key];
      return {
        key,
        label,
        value: toBooleanFlag(sourceValue),
      };
    });

  // Integración de x_entorno oficial de Inmovilla
  const xEntornoItems = parseXEntorno(raw, normLocale);
  const xEntornoKeySet = new Set(xEntornoItems.map((item) => item.key));

  const mergedCharacteristics: PropertyCharacteristic[] = baseCharacteristics.map(
    (char) => {
      if (xEntornoKeySet.has(char.key)) {
        return {
          ...char,
          value: true,
        };
      }
      return char;
    }
  );

  const existingKeys = new Set(mergedCharacteristics.map((c) => c.key));
  for (const item of xEntornoItems) {
    if (!existingKeys.has(item.key)) {
      mergedCharacteristics.push({
        key: item.key,
        label: item.label,
        value: true,
      });
    }
  }

  const characteristics: PropertyCharacteristic[] =
    raw.characteristics &&
    Array.isArray(raw.characteristics) &&
    raw.characteristics.length > 0 &&
    typeof raw.characteristics[0].value === "boolean" &&
    !raw.buardilla &&
    !raw.todoext &&
    !raw.vistasdespejadas &&
    !raw.x_entorno
      ? raw.characteristics
      : mergedCharacteristics;

  const cleanDescription = ((): string => {
    let text = "";
    if (normLocale === "en") {
      text = raw.descripcionen || raw.descripen || "";
    } else if (normLocale === "ca") {
      text = raw.descripcionca || raw.descripca || "";
    } else if (normLocale === "fr") {
      text = raw.descripcionfr || raw.descripfr || "";
    }

    if (!text) {
      text =
        raw.descripciones ||
        raw.description ||
        raw.descripcion ||
        raw.descrip ||
        raw.observaciones ||
        "";
    }

    if (!text) return "Sin descripción disponible.";

    return text
      .replace(/~{2,}/g, "\n\n")
      .replace(/~/g, "\n\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  })();

  return {
    id,
    reference,
    title,
    description: cleanDescription,
    descripciones: cleanDescription,
    descrip: cleanDescription,
    location,
    locationDetail,
    price,
    transferPrice,
    rentalPrice,
    image: images[0],
    images,
    category,
    beds,
    baths,
    toilets,
    area,
    usefulArea,
    builtArea,
    plotArea,
    terraceArea,
    propertyType,
    propertyTypeCode,
    conservation,
    orientation,
    heating,
    floorType,
    kitchenType,
    views,
    interiorCarpentry,
    exteriorCarpentry,
    commercialActivity,
    hasSmokeVent,
    floorNumber,
    yearBuilt,
    communityFees,
    energyRating,
    emissionsRating,
    garagePlaces,
    city,
    zone,
    distMar,
    operationType,
    operationTypeCode,
    date: raw.date || raw.fechaact || raw.fecha || new Date().toISOString(),
    characteristics,
    agency: raw.agency || raw.agencia || "RE/MAX Viven",
    agencyPhone: extractedPhone,
    agencyEmail: extractedEmail,
    agent,
    alarmarobo: toBooleanFlag(raw.alarmarobo),
  };
}
