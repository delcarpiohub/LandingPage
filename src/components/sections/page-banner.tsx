import Image from "next/image";

// Dimensiones reales de los banners de public/banners/ (2576×453). Se pasan a
// next/image para que el navegador reserve la proporción antes de cargar
// (sin salto de layout).
const BANNER_WIDTH = 2576;
const BANNER_HEIGHT = 453;

type PageBannerProps = {
  src: string;
  alt: string;
};

/**
 * Franja de banner a ancho completo, con el título grabado en la imagen, que
 * va bajo el header (el espaciador ya lo pone <Navigation />) y antes del
 * contenido de la página. Sin overlay, animación ni texto encima.
 *
 * ≥640px: conserva la proporción natural de la imagen.
 * <640px: altura mínima de 7.5rem con object-cover centrado, para que la
 * palabra grabada no quede diminuta en pantallas angostas.
 */
export function PageBanner({ src, alt }: PageBannerProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={BANNER_WIDTH}
      height={BANNER_HEIGHT}
      priority
      sizes="100vw"
      className="block h-auto min-h-[7.5rem] w-full object-cover object-center sm:min-h-0"
    />
  );
}
