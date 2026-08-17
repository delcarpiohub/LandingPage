import type { TestimonialAuthor } from "@/components/ui/testimonial-card";

export interface Testimonial {
  author: TestimonialAuthor;
  text: string;
}

// Contenido de ejemplo mientras se recopilan citas reales de clientes
// (aprobadas por Marketing). Sin nombres ni fotos hasta contar con
// testimonios verificados. Fuente única: la usan el marquee de home
// (`components/sections/testimonials.tsx`) y el slider de /nosotros
// (`app/nosotros/testimonials-slider.tsx`).
export const testimonials: Testimonial[] = [
  {
    author: { role: "Jefa de Laboratorio", sector: "Industria de Alimentos" },
    text: "El soporte técnico responde rápido cuando un HPLC se detiene en plena validación. Eso marca la diferencia en un laboratorio que no puede parar.",
  },
  {
    author: { role: "Superintendente de Calidad", sector: "Minería" },
    text: "La mantención preventiva programada para nuestros equipos de análisis de aguas de proceso ha evitado varias paradas no planificadas.",
  },
  {
    author: { role: "Químico Farmacéutico", sector: "Industria Farmacéutica" },
    text: "La capacitación en sitio al instalar el nuevo GC fue clave para que el equipo operara con los protocolos correctos desde el primer día.",
  },
  {
    author: { role: "Coordinador Ambiental", sector: "Sector Ambiental" },
    text: "Contar con un proveedor que entiende los métodos normados para monitoreo de aguas, y no solo vende equipos, hace la diferencia en el cumplimiento.",
  },
  {
    author: { role: "Investigador Asociado", sector: "Academia e Investigación" },
    text: "Nos ayudaron a definir la configuración correcta del sistema de preparación de muestras para nuestras líneas de investigación, no solo a cotizar un equipo.",
  },
  {
    author: { role: "Jefe de Mantención", sector: "Minería" },
    text: "La disponibilidad de repuestos y el conocimiento técnico del equipo de servicio reducen de forma real el tiempo de inactividad de nuestros instrumentos.",
  },
];
