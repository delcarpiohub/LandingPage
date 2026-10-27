import { z } from "zod";

// Agenda de laboratorio (Pieza B, flag agendaEventos en
// src/config/features.ts). Editable a mano: cada entrada debe ser un evento
// real y verificado, nunca una fecha inventada. El componente que consume
// esto filtra por fecha actual y se oculta por completo si no queda ninguno
// a futuro — no mostrar "próximamente" ni placeholders.
export const eventoSchema = z.object({
  id: z.string(),
  fechaInicio: z.string().date(),
  fechaFin: z.string().date().optional(),
  titulo: z.string(),
  lugar: z.string(),
  tipo: z.enum(["Feria", "Seminario", "Webinar"]),
  enlace: z.string().url().optional(),
});

export type Evento = z.infer<typeof eventoSchema>;

const eventosRaw: Evento[] = [
  {
    id: "inofood-2026",
    fechaInicio: "2026-10-26",
    fechaFin: "2026-10-27",
    titulo: "INOFOOD 2026",
    lugar:
      "Centro de Convenciones Le Méridien, Av. Libertador Bernardo O'Higgins 136, Santiago",
    tipo: "Feria",
  },
];

export const eventos: Evento[] = eventosRaw.map((evento) => eventoSchema.parse(evento));
