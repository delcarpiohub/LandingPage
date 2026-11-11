export type Testimonial = {
  id: string;
  quote: string;
  fullText?: string[];
  name: string;
  initials: string;
  role: string;
  organization: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "vidal-synthon",
    quote:
      "Nuestra experiencia con Del Carpio en estos últimos 3 años es muy buena, tanto en la coordinación de servicios, cotizaciones, gestión de compras y exportaciones, etc.",
    fullText: [
      "Nuestra experiencia con Del Carpio en estos últimos 3 años es muy buena, tanto en la coordinación de servicios, cotizaciones, gestión de compras y exportaciones, etc. Han sido muy buenas, resaltando el apoyo de parte de Del Carpio, ante emergencias y contingencias que hemos tenido en Synthon y la rapidez en la respuesta ante solicitudes de compra e importaciones de repuestos para que nuestros equipos se mantengan constantemente operativos.",
      "Adicionalmente comentar que el trabajo en terreno de los técnicos es muy bueno, cumpliendo plazos y horarios, demostrando su conocimiento y experiencia en el trabajo realizado, además del buen trato y cordialidad de los mismos.",
    ],
    name: "Álvaro Vidal",
    initials: "AV",
    role: "Técnico en Calificaciones, Área de Operaciones Analíticas",
    organization: "Synthon",
  },
  {
    id: "herrera-idt",
    quote:
      "Excelente la gestión del área de proyecto. La comunicación es rápida y la atención por parte de Claudia es excepcional. Estos 2 años hemos realizado un par de proyectos con Del Carpio y estamos muy contentos con la atención previa y post servicio, 100% recomendado.",
    name: "Carla Patricia Herrera Cantera",
    initials: "CH",
    role: "Coordinadora de Laboratorios",
    organization: "IDT (Universidad Tecnológica)",
  },
  {
    id: "osorio-unab",
    quote:
      "Nuestra experiencia con Del Carpio ha sido excelente. Gracias a su eficiente respuesta, pudimos contar con agua purificada de calidad.",
    name: "Camilo Osorio Rodríguez",
    initials: "CO",
    role: "Administrador | Lab Manager, Plant Genome Regulation Lab",
    organization: "Universidad Andrés Bello (UNAB)",
  },
  {
    id: "encalada-ucn",
    quote:
      "¡Excelente experiencia con Del Carpio! Quiero destacar no solo la calidad de la compra, sino especialmente la atención de su servicio al cliente.",
    fullText: [
      "¡Excelente experiencia con Del Carpio! Quiero destacar no solo la calidad de la compra, sino especialmente la atención de su servicio al cliente. Fueron súper amables, atentos y me guiaron en todo el proceso para asegurarnos de que el equipo satisficiera las necesidades de los análisis que realizamos.",
    ],
    name: "Olga Encalada Matamoros",
    initials: "OE",
    role: "Encargado de Laboratorio Instrumentación CBAR",
    organization: "Universidad Católica del Norte (UCN)",
  },
  {
    id: "munoz-sqm",
    quote:
      "Durante la prestación de estos servicios, hemos podido constatar un alto nivel de competencia técnica, profesionalismo y compromiso por parte de su equipo.",
    fullText: [
      "Quisiera expresar formalmente nuestro reconocimiento por la calidad del servicio técnico que Del Carpio ha brindado en las actividades de mantenimiento y soporte de nuestros cromatógrafos, equipos de absorción atómica e ICP.",
      "Durante la prestación de estos servicios, hemos podido constatar un alto nivel de competencia técnica, profesionalismo y compromiso por parte de su equipo. Asimismo, destacamos especialmente su flexibilidad para atender nuestros requerimientos y su capacidad para identificar, abordar y resolver oportunamente los distintos inconvenientes técnicos que se presentan en los equipos.",
      "Esta capacidad de respuesta constituye un aporte relevante para mantener la confiabilidad, disponibilidad y continuidad operacional de nuestros equipos analíticos, aspectos fundamentales para el adecuado funcionamiento del laboratorio.",
      "En consideración a lo anterior, nuestra evaluación del servicio técnico proporcionado por Del Carpio es satisfactoria, destacándose por la calidad de sus intervenciones, disposición, capacidad técnica y orientación a la solución de problemas.",
      "Agradecemos sinceramente el profesionalismo y compromiso demostrado.",
    ],
    name: "Manuel Muñoz S.",
    initials: "MM",
    role: "Jefe de Laboratorios Nitratos Yodo",
    organization: "SQM",
  },
  {
    id: "vergara-cosayach",
    quote:
      "Quiero hacerles llegar mi agradecimiento a la empresa Del Carpio por siempre estar atentos y disponibles a todas nuestras solicitudes, siempre ustedes entregando un buen servicio para nuestro laboratorio.",
    name: "Daniela Vergara Bavestrello",
    initials: "DV",
    role: "Jefa Laboratorio Químico",
    organization: "COSAYACH",
  },
  {
    id: "beltran-eula",
    quote:
      "En Del Carpio Análisis hemos encontrado mucho más que un proveedor de servicios: un socio estratégico que comprende nuestras necesidades y contribuye activamente al desarrollo de nuestras capacidades analíticas.",
    fullText: [
      "En Del Carpio Análisis hemos encontrado mucho más que un proveedor de servicios: un socio estratégico que comprende nuestras necesidades y contribuye activamente al desarrollo de nuestras capacidades analíticas. Su compromiso, disposición y respuesta oportuna, tanto en la incorporación de tecnología de punta como en la asesoría técnica y los servicios de mantención, han permitido construir una relación comercial basada en la confianza y la colaboración de largo plazo.",
    ],
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
      "Mi experiencia con Del Carpio es excelente. Destacan por su magnífica atención al cliente, la profesionalidad y calidez humana de todo su equipo, así como por su amplio conocimiento y experiencia en la venta de equipos.",
    fullText: [
      "Mi experiencia con Del Carpio es excelente. Destacan por su magnífica atención al cliente, la profesionalidad y calidez humana de todo su equipo, así como por su amplio conocimiento y experiencia en la venta de equipos.",
      "Su servicio postventa es excepcional: siempre están dispuestos a ayudarte y buscar soluciones. Además, cuentan con disponibilidad de consumibles y hacen todo lo posible por conseguir aquello que necesitas.",
      "Don Leonardo y su equipo transmiten confianza, compromiso y cercanía. Estoy muy satisfecho con su trabajo y, cada vez que necesito un equipo, servicio o cualquier solución, Del Carpio es siempre mi primera opción.",
      "Porque una buena empresa no solo vende equipos, construye confianza, ofrece soluciones y gana clientes para toda la vida. ¡Gracias por ser así!",
    ],
    name: "Mauricio Adasme Rocha",
    initials: "MA",
    role: "Jefe Laboratorio",
    organization: "Las Garzas",
  },
];
