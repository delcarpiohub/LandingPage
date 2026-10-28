// Flags del experimento "firma científica" (rama exp/firma-cientifica).
// Cada flag en false debe dejar la pieza correspondiente sin rastro: sin DOM,
// sin request y sin JS de esa pieza cargado en el cliente.
export const features = {
  firmaCromatograma: false,
  agendaEventos: false,
  dolarReferencial: false,
} as const;

export type FeatureFlags = typeof features;
