import { features } from "@/config/features";
import {
  ChromatogramLine,
  type ChromatogramLineProps,
} from "@/components/motion/chromatogram-line";

// Server Component: si el flag está en false, el import cliente de
// ChromatogramLine nunca se resuelve en el árbol de React, así que su chunk
// JS nunca llega al navegador (no es solo no renderizar DOM).
export function ChromatogramDivider(props: ChromatogramLineProps) {
  if (!features.firmaCromatograma) {
    return null;
  }
  return <ChromatogramLine {...props} />;
}
