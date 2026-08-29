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
  title: string;         // Mapeado desde 'tituloes'
  description: string;   // Mapeado desde 'descripciones'
  location: string;      // Nombre o Zona
  locationDetail: string;// Calle, Número, etc.
  price: number | string;// Precio (número o "Consulte")
  image: string;         // Imagen principal
  images: string[];      // Array completo de imágenes
  beds: number;          // Habitaciones
  baths: number;         // Baños
  area: number;          // Metros construidos
  usefulArea?: number;   // Superficie útil (m_uties)
  builtArea?: number;    // Superficie construida (m_cons)
  propertyType?: string; // Tipo de inmueble (Piso, Casa, etc.)
  conservation?: string; // Estado (Entrar a vivir, etc.)
  city?: string;         // Ciudad
  zone?: string;         // Zona / Barrio
  distMar?: string | null; // Distancia al mar (ej: "20 m", "1.5 Km")
  operationType: string; // Venta / Alquiler / Traspaso
  date: string;          // Fecha actualización
  //features: string[];    // Array de características
  characteristics?: PropertyCharacteristic[]; // Flags booleanos del inmueble
  agency: string;
  agencyPhone: string;
  agencyEmail: string;
  agent?: Agent;         // Agente asignado dinámicamente desde Inmovilla
  alarmarobo?: boolean;
  descrip?: string;
  descripciones?: string;
  observaciones?: string;
}