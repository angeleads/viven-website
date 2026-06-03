export interface Property {
  id: string;
  title: string;
  date: string;
  location: string;
  province: string;
  town: string;
  locationDetail?: string;
  price: number;
  priceFreq: string;
  image: string; // Imagen principal
  images: string[]; // Lista de todas las imágenes
  beds: number;
  baths: number;
  area: number;
  plotArea?: number;
  type: string;
  operationType: string;
  reference: string;
  agency: string;
  agencyPhone?: string;
  agencyEmail?: string;
  description: string;
  features: string[];
}