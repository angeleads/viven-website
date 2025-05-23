import type { Property } from "@/types/property"

export const properties: Property[] = [
  {
    id: 1,
    title: "Ático de lujo con terraza panorámica",
    description:
      "Espectacular ático con vistas panorámicas al mar y a la ciudad. Terraza de 50m² con zona chill-out y jacuzzi. Acabados de alta calidad.",
    price: 850000,
    location: "Salamanca, Madrid",
    area: 150,
    beds: 3,
    baths: 2,
    type: "Ático",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Terraza", "Piscina", "Garaje", "Ascensor", "Calefacción", "Aire acondicionado"],
    agent: {
      id: 1,
      name: "Ana García",
      phone: "+34 612 345 678",
      email: "ana.garcia@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-15",
  },
  {
    id: 2,
    title: "Chalet con piscina en La Moraleja",
    description:
      "Impresionante chalet independiente en una de las mejores zonas de La Moraleja. Parcela de 1500m² con piscina, jardín y zona de barbacoa.",
    price: 1250000,
    location: "La Moraleja, Madrid",
    area: 350,
    beds: 5,
    baths: 4,
    type: "Chalet",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Jardín", "Piscina", "Garaje", "Seguridad 24h", "Calefacción", "Aire acondicionado"],
    agent: {
      id: 2,
      name: "Carlos Martínez",
      phone: "+34 623 456 789",
      email: "carlos.martinez@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-10",
  },
  {
    id: 3,
    title: "Piso reformado en el centro histórico",
    description:
      "Precioso piso completamente reformado en el corazón del centro histórico. Conserva elementos originales como techos altos con vigas de madera.",
    price: 495000,
    location: "Eixample, Barcelona",
    area: 95,
    beds: 2,
    baths: 2,
    type: "Piso",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Reformado", "Ascensor", "Calefacción", "Aire acondicionado", "Balcón"],
    agent: {
      id: 3,
      name: "Laura Fernández",
      phone: "+34 634 567 890",
      email: "laura.fernandez@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-20",
  },
  {
    id: 4,
    title: "Apartamento con vistas al mar",
    description:
      "Moderno apartamento en primera línea de mar con impresionantes vistas. Comunidad con piscina, gimnasio y acceso directo a la playa.",
    price: 675000,
    location: "Diagonal Mar, Barcelona",
    area: 120,
    beds: 3,
    baths: 2,
    type: "Apartamento",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Vistas al mar", "Piscina", "Gimnasio", "Garaje", "Seguridad 24h", "Aire acondicionado"],
    agent: {
      id: 4,
      name: "David López",
      phone: "+34 645 678 901",
      email: "david.lopez@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-05",
  },
  {
    id: 5,
    title: "Casa adosada con jardín privado",
    description:
      "Acogedora casa adosada en urbanización tranquila con jardín privado, piscina comunitaria y zonas infantiles.",
    price: 580000,
    location: "Pozuelo de Alarcón, Madrid",
    area: 220,
    beds: 4,
    baths: 3,
    type: "Adosado",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Jardín", "Piscina comunitaria", "Garaje", "Trastero", "Calefacción", "Aire acondicionado"],
    agent: {
      id: 5,
      name: "Elena Sánchez",
      phone: "+34 656 789 012",
      email: "elena.sanchez@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-18",
  },
  {
    id: 6,
    title: "Loft industrial renovado",
    description:
      "Espectacular loft de estilo industrial completamente renovado. Espacios diáfanos, techos altos y grandes ventanales.",
    price: 425000,
    location: "Poblenou, Barcelona",
    area: 85,
    beds: 1,
    baths: 1,
    type: "Loft",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Estilo industrial", "Techos altos", "Ventanales", "Ascensor", "Calefacción"],
    agent: {
      id: 1,
      name: "Ana García",
      phone: "+34 612 345 678",
      email: "ana.garcia@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-22",
  },
  {
    id: 7,
    title: "Piso de diseño en zona exclusiva",
    description:
      "Elegante piso de diseño en una de las zonas más exclusivas. Reformado por arquitecto de renombre con materiales de primera calidad.",
    price: 780000,
    location: "Chamberí, Madrid",
    area: 140,
    beds: 3,
    baths: 2,
    type: "Piso",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Diseño exclusivo", "Ascensor", "Domótica", "Calefacción", "Aire acondicionado"],
    agent: {
      id: 2,
      name: "Carlos Martínez",
      phone: "+34 623 456 789",
      email: "carlos.martinez@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-12",
  },
  {
    id: 8,
    title: "Villa de lujo con vistas panorámicas",
    description:
      "Impresionante villa de lujo con vistas panorámicas al mar y a la montaña. Parcela de 2000m² con piscina infinita y jardines.",
    price: 1950000,
    location: "Sitges, Barcelona",
    area: 450,
    beds: 6,
    baths: 5,
    type: "Villa",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Vistas panorámicas", "Piscina infinita", "Jardín", "Garaje", "Domótica", "Seguridad 24h"],
    agent: {
      id: 3,
      name: "Laura Fernández",
      phone: "+34 634 567 890",
      email: "laura.fernandez@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-08",
  },
  {
    id: 9,
    title: "Dúplex con terraza en zona tranquila",
    description:
      "Luminoso dúplex con amplia terraza en zona residencial tranquila. Perfecto para familias, cerca de colegios y parques.",
    price: 520000,
    location: "Sant Cugat, Barcelona",
    area: 180,
    beds: 4,
    baths: 3,
    type: "Dúplex",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Terraza", "Zona comunitaria", "Piscina", "Garaje", "Trastero", "Calefacción"],
    agent: {
      id: 4,
      name: "David López",
      phone: "+34 645 678 901",
      email: "david.lopez@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-25",
  },
  {
    id: 10,
    title: "Apartamento de lujo en edificio histórico",
    description:
      "Exclusivo apartamento en edificio histórico completamente restaurado. Combina elementos originales con todas las comodidades modernas.",
    price: 890000,
    location: "Barrio Gótico, Barcelona",
    area: 110,
    beds: 2,
    baths: 2,
    type: "Apartamento",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Edificio histórico", "Ascensor", "Domótica", "Aire acondicionado", "Balcón"],
    agent: {
      id: 5,
      name: "Elena Sánchez",
      phone: "+34 656 789 012",
      email: "elena.sanchez@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-16",
  },
  {
    id: 11,
    title: "Chalet independiente con gran parcela",
    description:
      "Amplio chalet independiente con parcela de 1200m². Ideal para familias que buscan tranquilidad sin renunciar a la proximidad de la ciudad.",
    price: 920000,
    location: "Majadahonda, Madrid",
    area: 320,
    beds: 5,
    baths: 4,
    type: "Chalet",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Parcela grande", "Piscina", "Jardín", "Garaje", "Calefacción", "Aire acondicionado"],
    agent: {
      id: 1,
      name: "Ana García",
      phone: "+34 612 345 678",
      email: "ana.garcia@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-14",
  },
  {
    id: 12,
    title: "Piso con encanto en el casco antiguo",
    description:
      "Encantador piso en pleno casco antiguo. Conserva elementos originales como suelos hidráulicos y carpintería de madera.",
    price: 380000,
    location: "Casco Antiguo, Sevilla",
    area: 90,
    beds: 2,
    baths: 1,
    type: "Piso",
    status: "En venta",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: ["Elementos originales", "Balcón", "Aire acondicionado", "Calefacción"],
    agent: {
      id: 2,
      name: "Carlos Martínez",
      phone: "+34 623 456 789",
      email: "carlos.martinez@viven.es",
      photo: "/placeholder.svg?height=200&width=200",
    },
    createdAt: "2025-04-19",
  },
]
