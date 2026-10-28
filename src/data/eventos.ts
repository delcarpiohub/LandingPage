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
    id: "gecamin-excelencia-operacional-2026",
    fechaInicio: "2026-11-24",
    fechaFin: "2026-11-26",
    titulo: "11ª Conferencia de Excelencia Operacional en Minería",
    lugar: "Santiago",
    tipo: "Seminario",
    enlace: "https://gecamin.com/",
  },
  {
    id: "iimch-convencion-2026",
    fechaInicio: "2026-11-29",
    fechaFin: "2026-12-02",
    titulo: "75ª Convención Anual IIMCH — Minería 5.0",
    lugar: "Hotel Antay Copiapó, Los Carrera 2440, Copiapó",
    tipo: "Seminario",
    enlace: "https://convencionesiimch.cl/",
  },
  {
    id: "expomin-2027",
    fechaInicio: "2027-04-20",
    fechaFin: "2027-04-24",
    titulo: "Expomin 2027",
    lugar: "Espacio Riesco, Av. El Salto 5000, Huechuraba, Santiago",
    tipo: "Feria",
    enlace: "https://www.expomin.cl/",
  },
  {
    id: "gecamin-medio-ambiente-2027",
    fechaInicio: "2027-05-05",
    fechaFin: "2027-05-07",
    titulo: "10º Congreso de Medio Ambiente y Responsabilidad Social en Minería",
    lugar: "Santiago",
    tipo: "Seminario",
    enlace: "https://gecamin.com/",
  },
  {
    id: "gecamin-geologia-2027",
    fechaInicio: "2027-06-09",
    fechaFin: "2027-06-11",
    titulo: "10ª Conferencia de Geología, Geomecánica y Planificación Minera",
    lugar: "Santiago",
    tipo: "Seminario",
    enlace: "https://gecamin.com/",
  },
];

export const eventos: Evento[] = eventosRaw.map((evento) => eventoSchema.parse(evento));
