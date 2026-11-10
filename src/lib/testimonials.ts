export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  initials: string;
  role: string;
  organization: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "vidal-synthon",
    quote:
      "La gestión de compras, importaciones y la respuesta ante emergencias ha sido excelente. El apoyo de Del Carpio nos permite mantener nuestros equipos constantemente operativos y cumplir con los plazos del laboratorio.",
    name: "Álvaro Vidal",
    initials: "AV",
    role: "Técnico en Calificaciones, Área de Operaciones Analíticas",
    organization: "Synthon",
  },
  {
    id: "herrera-idt",
    quote:
      "Excelente la gestión del área de proyectos; la comunicación es rápida y la atención es excepcional. Tras dos años trabajando juntos, estamos muy contentos con el servicio previo y posterior. ¡100% recomendado!",
    name: "Carla Patricia Herrera Cantera",
    initials: "CH",
    role: "Coordinadora de Laboratorios",
    organization: "IDT (Universidad Tecnológica)",
  },
  {
    id: "osorio-unab",
    quote:
      "Nuestra experiencia con Del Carpio ha sido excelente. Gracias a su eficiente respuesta, pudimos contar con agua purificada de calidad de forma oportuna.",
    name: "Camilo Osorio Rodríguez",
    initials: "CO",
    role: "Administrador | Lab Manager, Plant Genome Regulation Lab",
    organization: "Universidad Andrés Bello (UNAB)",
  },
  {
    id: "encalada-ucn",
    quote:
      "Quiero destacar la calidad de la compra y, especialmente, la atención del servicio al cliente. Fueron súper amables y nos guiaron en todo el proceso para asegurar que el equipo satisficiera exactamente las necesidades de nuestros análisis.",
    name: "Olga Encalada Matamoros",
    initials: "OE",
    role: "Encargado de Laboratorio Instrumentación CBAR",
    organization: "Universidad Católica del Norte (UCN)",
  },
  {
    id: "munoz-sqm",
    quote:
      "Nuestra evaluación del servicio técnico de Del Carpio es completamente satisfactoria. Su rigurosidad, excelente disposición y orientación a la solución de problemas garantizan la confiabilidad de nuestro laboratorio.",
    name: "Manuel Muñoz S.",
    initials: "MM",
    role: "Jefe de Laboratorios Nitratos Yodo",
    organization: "SQM",
  },
  {
    id: "vergara-cosayach",
    quote:
      "Quiero hacer llegar mi agradecimiento a Del Carpio por estar siempre atentos y disponibles a todas nuestras solicitudes, entregando constantemente un servicio excelente para nuestro laboratorio.",
    name: "Daniela Vergara Bavestrello",
    initials: "DV",
    role: "Jefa Laboratorio Químico",
    organization: "COSAYACH",
  },
  {
    id: "beltran-eula",
    quote:
      "En Del Carpio hemos encontrado un socio estratégico que comprende nuestras necesidades. Su compromiso, tecnología de punta, asesoría técnica y oportuna mantención han construido una relación basada en la confianza.",
    name: "Johanna Beltrán Concha",
    initials: "JB",
    role: "Jefe Laboratorio de Ensayo",
    organization: "Centro EULA - Chile (Universidad de Concepción)",
  },
  {
    id: "ponce-abbott",
    quote:
      "Del Carpio ha sido un aliado confiable en la mantención y calibración de nuestro equipo TOC, entregando siempre un servicio profesional y oportuno.",
    name: "María Cristina Ponce",
    initials: "MP",
    role: "Jefe de Control de Calidad",
    organization: "Abbott (Puerto Varas)",
  },
  {
    id: "adasme-las-garzas",
    quote:
      "Mi experiencia con Del Carpio es excelente. Destacan por su magnífica atención, profesionalismo y un servicio postventa excepcional. Don Leonardo y su equipo transmiten total confianza y son siempre mi primera opción.",
    name: "Mauricio Adasme Rocha",
    initials: "MA",
    role: "Jefe Laboratorio",
    organization: "Las Garzas",
  },
];
