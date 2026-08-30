import type { PropertyCategory } from "@/lib/inmovilla-dict";

export interface Agent {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export interface PropertyCharacteristic {
  key: string;
  label: string;
  value: boolean;
}

export interface Property {
  id: string;            // Mapeado desde 'cod_ofer'
  reference: string;     // Mapeado desde 'ref'
  title: string;         // Título descriptivo
  description: string;   // Descripción completa
  location: string;      // Ciudad / Zona
  locationDetail: string;// Calle, Número
  price: number | string;// Precio principal
  displayPrice?: string; // Precio con etiqueta (ej: "36.000 € Traspaso")
  transferPrice?: number; // Precio de traspaso si aplica
  rentalPrice?: number;  // Precio de alquiler mensual si aplica
  image: string;         // Imagen principal
  images: string[];      // Array de imágenes
  category: PropertyCategory; // 'residential' | 'commercial' | 'land' | 'garage_storage'
  beds: number;          // Habitaciones / dormitorios
  baths: number;         // Baños completos
  toilets?: number;      // Aseos
  area: number;          // Metros principales
  usefulArea?: number;   // Metros útiles (m_utiles)
  builtArea?: number;    // Metros construidos (m_cons)
  plotArea?: number;     // Metros de parcela (m_parcela)
  terraceArea?: number;  // Metros de terraza (m_terraza)
  propertyType?: string; // Tipo de inmueble (Piso, Chalet, Local comercial, Bar, Solar...)
  propertyTypeCode?: number; // Código numérico key_tipo
  conservation?: string; // Estado de conservación
  orientation?: string;  // Orientación (Norte, Sur, etc.)
  heating?: string;      // Calefacción (Bomba de calor, Gas natural, etc.)
  floorType?: string;    // Tipo de suelo (Parquet, Gres, Cerámico...)
  kitchenType?: string;  // Tipo de cocina (Con isla, Independiente, Americana...)
  views?: string;        // Vistas (Al mar, Montaña, Despejadas...)
  interiorCarpentry?: string; // Carpintería interior
  exteriorCarpentry?: string; // Carpintería exterior
  commercialActivity?: string;// Actividad comercial (Cafetería, Bar, etc.)
  hasSmokeVent?: boolean;// Salida de humos
  floorNumber?: number | string; // Planta / Número de planta
  yearBuilt?: number;    // Año de construcción / antigüedad
  communityFees?: number;// Gastos de comunidad
  energyRating?: string; // Letra certificación energética (A-G)
  emissionsRating?: string; // Letra emisiones (A-G)
  garagePlaces?: number; // Plazas de parking
  city?: string;         // Ciudad
  zone?: string;         // Zona / Barrio
  distMar?: string | null; // Distancia al mar
  operationType: string; // Venta / Alquiler / Traspaso
  operationTypeCode?: number; // Código keyacci
  date: string;          // Fecha actualización
  characteristics?: PropertyCharacteristic[]; // Flags booleanos del inmueble
  agency: string;
  agencyPhone: string;
  agencyEmail: string;
  agent?: Agent;         // Agente asignado
  alarmarobo?: boolean;
  destacado?: number;    // Nivel destacado Inmovilla (2 = Estrella / Outstanding, 1 = Destacado, 0 = Normal)
  descrip: string;
  descripciones?: string;
  observaciones?: string;
}