export interface Property {
  id: string;            // Mapeado desde 'cod_ofer'
  reference: string;     // Mapeado desde 'ref'
  title: string;         // Mapeado desde 'tituloes'
  description: string;   // Mapeado desde 'descripciones'
  location: string;      // Nombre o Zona (derivado de CP/Calle o hardcoded)
  locationDetail: string;// Combinación de Calle, Número, etc.
  price: number;         // Mapeado desde 'precioinmo' o 'precio' convertido a número
  image: string;         // Imagen principal (o placeholder si no hay)
  images: string[];      // Array completo de imágenes reconstituido
  beds: number;          // Mapeado desde 'habitaciones' o 'habdobles'
  baths: number;         // Mapeado desde 'banyos'
  area: number;          // Mapeado desde 'm_cons' (Metros construidos)
  operationType: string; // Tipo de operación (Venta / Alquiler)
  date: string;          // Mapeado desde 'fechaact' para que la ordenación funcione
  features: string[];    // Array dinámico basado en los flags (piscina_prop, jardin...)
  agency: string;
  agencyPhone: string;
  agencyEmail: string;
}