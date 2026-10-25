export type EmployeeRole = "admin" | "employee";
export type EmployeeDepartment = "direccion" | "inmobiliaria" | "comunidades" | "inversion";

export interface EmployeeProfile {
  uid: string;
  email: string;
  fullName: string;
  role?: EmployeeRole;
  department?: EmployeeDepartment;
  isPublic?: boolean;
  order?: number;

  // Pre-established fields (for when Inmovilla data arrives)
  inmovillaId?: string;
  jobTitle?: string;
  phone?: string;
  whatsapp?: string;
  linkedin?: string;
  
  // Custom Employee Editable fields
  bio: string;
  languages: string[];
  hobbies: string[];
  avatarUrl?: string;
  galleryPhotos: string[];
  updatedAt: string;

  // Magic Link & Password Auth fields
  magicToken?: string;
  magicTokenExpiresAt?: string;
  passwordHash?: string;
}

export async function hashPassword(rawPassword: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(rawPassword);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return btoa(encodeURIComponent(rawPassword));
}

export type LeadStatus = "nuevo" | "contactado" | "en_seguimiento" | "cerrado";

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  subject?: string;
  message: string;
  propertyRef?: string;
  propertyTitle?: string;
  assignedAgentEmail?: string;
  assignedAgentName?: string;
  source: "contacto" | "propiedad" | "inversion" | "comunidades";
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ShowcaseSettings {
  heroPropertyRef?: string;
  featuredPropertyRefs?: string[];
  updatedAt?: string;
  updatedBy?: string;
}

export const ALLOWED_EMPLOYEE_EMAILS = [
  "cesar.sanjurjo@viven.es",
  "dug.fernandez@remax.es",
  "igor.zherebko@remax.es",
  "ingo.vonsundahl@remax.es",
  "jramirezfr79@gmail.com",
  "joseantonio.peycovich@remax.es",
  "jose.amp82@gmail.com",
  "jose.munoz@remax.es",
  "viven@remax.es",
  "hola@viven.es",
  "lorenafz1977@gmail.com",
  "lorena.fernandez@remax.es",
  "luis.hernandez@remax.es",
  "michel.arquimbau@remax.es",
  "mariamenendez65@gmail.com",
  "pepi.menendez@remax.es",
  "xavier.paradis@remax.es",
  "ursulaceron@gmail.com",
  "yuri.solari@remax.es",
  "halouaneangel24@gmail.com",
];

export const INITIAL_EMPLOYEES_SEED: EmployeeProfile[] = [
  {
    uid: "seed_cesar_sanjurjo",
    email: "cesar.sanjurjo@viven.es",
    fullName: "Cesar Sanjurjo",
    role: "admin",
    department: "direccion",
    isPublic: true,
    order: 1,
    jobTitle: "Broker - CEO VIVEN",
    phone: "+34 930 267 436",
    whatsapp: "https://wa.me/34930267436",
    linkedin: "https://www.linkedin.com/in/c%C3%A9sar-sanjurjo-10a7ab55/",
    avatarUrl: "",
    bio: "«Algunas personas quieren que algo ocurra, otras sueñan con que pase, otras hacen que suceda». – Michael Jordan",
    languages: ["🇪🇸 Español", "🇪🇸 Catalán", "🇬🇧 Inglés"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_merche_romero",
    email: "hola@viven.es",
    fullName: "Merche Romero",
    role: "employee",
    department: "comunidades",
    isPublic: true,
    order: 2,
    jobTitle: "Administradora",
    phone: "+34 930 267 436",
    avatarUrl: "",
    bio: "Subdirectora y responsable del equipo de Administración de Comunidades.",
    languages: ["🇪🇸 Español", "🇪🇸 Catalán"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_pilar_martin",
    email: "hola@viven.es",
    fullName: "Pilar Martín",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 3,
    jobTitle: "Recepción",
    phone: "+34 930 267 436",
    avatarUrl: "",
    bio: "Recepción y atención al cliente.",
    languages: ["🇪🇸 Español", "🇪🇸 Catalán"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_michel_arquimbau",
    email: "michel.arquimbau@remax.es",
    fullName: "Michel Arquimbau",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 4,
    jobTitle: "Responsable de reclutamiento",
    phone: "+34 641 173 416",
    whatsapp: "https://wa.me/34641173416",
    avatarUrl: "",
    bio: "Agente asociado.",
    languages: ["🇪🇸 Español", "🇪🇸 Catalán", "🇫🇷 Francés"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_agatha_jose_antonio",
    email: "jose.munoz@remax.es",
    fullName: "Agatha y Jose Antonio",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 5,
    jobTitle: "Agente asociado",
    phone: "+34 639 475 164",
    avatarUrl: "",
    bio: "Agente asociado.",
    languages: ["🇪🇸 Español", "🇪🇸 Catalán"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_ingo_von_sundahl",
    email: "ingo.vonsundahl@remax.es",
    fullName: "Ingo Von Sundahl",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 6,
    jobTitle: "Agente asociado",
    phone: "+34 605 678 642",
    whatsapp: "https://wa.me/34605678642",
    avatarUrl: "",
    bio: "Cuidados inmobiliarios",
    languages: ["🇪🇸 Español", "🇩🇪 Alemán", "🇬🇧 Inglés"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_jose_antonio_peycovich",
    email: "joseantonio.peycovich@remax.es",
    fullName: "Jose Antonio Peycovich",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 7,
    jobTitle: "Agente asociado",
    phone: "+34 688 804 497",
    avatarUrl: "",
    bio: "Agente asociado.",
    languages: ["🇪🇸 Español"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_yuri_solari",
    email: "yuri.solari@remax.es",
    fullName: "Yuri Solari",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 8,
    jobTitle: "Agente asociado",
    phone: "+34 611 526 298",
    whatsapp: "https://wa.me/34611526298",
    avatarUrl: "",
    bio: "Calafell - Vendrell - Baix Penedès",
    languages: ["🇪🇸 Español", "🇮🇹 Italiano"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_luis_hernandez",
    email: "luis.hernandez@remax.es",
    fullName: "Luis Hernandez",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 9,
    jobTitle: "Agente asociado",
    phone: "+34 624 883 432",
    whatsapp: "https://wa.me/34624883432",
    avatarUrl: "",
    bio: "Cunit - Cubelles - Vilanova i la Geltrú",
    languages: ["🇪🇸 Español", "🇪🇸 Catalán"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_igor_zherebko",
    email: "igor.zherebko@remax.es",
    fullName: "Igor Zherebko",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 10,
    jobTitle: "Asesor inmobiliario",
    phone: "+34 645 392 986",
    whatsapp: "https://wa.me/34645392986",
    avatarUrl: "",
    bio: "Agente asociado.",
    languages: ["🇪🇸 Español", "🇷🇺 Ruso", "🇬🇧 Inglés"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_xavier_paradis",
    email: "xavier.paradis@remax.es",
    fullName: "Xavier Paradis",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 11,
    jobTitle: "Agente asociado",
    phone: "+34 697 667 147",
    whatsapp: "https://wa.me/34697667147",
    avatarUrl: "",
    bio: "Agente asociado.",
    languages: ["🇪🇸 Español", "🇪🇸 Catalán", "🇫🇷 Francés"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_pepi_menendez",
    email: "pepi.menendez@remax.es",
    fullName: "Pepi Menendez",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 12,
    jobTitle: "Agente asociado",
    phone: "+34 614 756 837",
    whatsapp: "https://wa.me/34614756837",
    avatarUrl: "",
    bio: "Agente asociado.",
    languages: ["🇪🇸 Español", "🇪🇸 Catalán"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_jorge_ramirez",
    email: "jramirezfr79@gmail.com",
    fullName: "Jorge Ramírez",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 13,
    jobTitle: "Agente asociado",
    phone: "+34 615 146 941",
    avatarUrl: "",
    bio: "Vilanova i la Geltrú",
    languages: ["🇪🇸 Español", "🇪🇸 Catalán"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_lorena_fernandez",
    email: "lorena.fernandez@remax.es",
    fullName: "Lorena Fernandez",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 14,
    jobTitle: "Agente asociado",
    phone: "+34 681 954 043",
    whatsapp: "https://wa.me/34681954043",
    avatarUrl: "",
    bio: "Agente asociado.",
    languages: ["🇪🇸 Español"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    uid: "seed_duglaiska",
    email: "dug.fernandez@remax.es",
    fullName: "Duglaiska",
    role: "employee",
    department: "inmobiliaria",
    isPublic: true,
    order: 15,
    jobTitle: "Agente asociado",
    phone: "+34 664 841 885",
    whatsapp: "https://wa.me/34664841885",
    avatarUrl: "",
    bio: "Agente asociado.",
    languages: ["🇪🇸 Español"],
    hobbies: [],
    galleryPhotos: [],
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export const isEmailAllowed = (email: string, extraAllowedEmails: string[] = []): boolean => {
  const combined = [...ALLOWED_EMPLOYEE_EMAILS, ...extraAllowedEmails].map((e) =>
    e.trim().toLowerCase()
  );
  return combined.includes(email.trim().toLowerCase());
};