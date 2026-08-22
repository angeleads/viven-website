export interface EmployeeProfile {
  uid: string;
  email: string;
  fullName: string;
  // Pre-established fields (for when Inmovilla data arrives)
  inmovillaId?: string;
  jobTitle?: string;
  phone?: string;
  
  // Custom Employee Editable fields
  bio: string;
  languages: string[];
  hobbies: string[];
  avatarUrl?: string;
  galleryPhotos: string[];
  updatedAt: string;
}

export const ALLOWED_EMPLOYEE_EMAILS = [
  "cesar.sanjurjo@viven.es",
  "dug.fernandez@remax.es",
  "igor.zherebko@remax.es",
  "ingo.vonsundahl@remax.es",
  "jramirezfr79@gmail.com",
  "joseantonio.peycovich@remax.es",
  "jose.amp82@gmail.com",
  "viven@remax.es",
  "lorenafz1977@gmail.com",
  "luis.hernandez@remax.es",
  "michel.arquimbau@remax.es",
  "mariamenendez65@gmail.com",
  "ursulaceron@gmail.com",
  "ursulaceron@gmail.com",
  "yuri.solari@remax.es",
  "halouaneangel24@gmail.com",
];

export const isEmailAllowed = (email: string): boolean => {
  return ALLOWED_EMPLOYEE_EMAILS.map((e) => e.toLowerCase()).includes(email.trim().toLowerCase());
};