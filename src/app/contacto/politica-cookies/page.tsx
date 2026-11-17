import type { Metadata } from "next";
import { LegalDocument } from "../legal-document";

const content = `
Política de Cookies
Última actualización: noviembre de 2026

1. Qué son las cookies

Las cookies son pequeños archivos de texto que un sitio web guarda en su navegador cuando usted lo visita. Sirven para recordar sus preferencias, mantener el funcionamiento del sitio y, en algunos casos, recopilar información sobre cómo se usa la página.

2. Cookies necesarias

Se guardan en su navegador para recordar su decisión sobre el uso de cookies. No requieren consentimiento porque son indispensables para respetar su elección.

| Nombre | Finalidad | Duración |
| delcarpio_cookie_consent | Registra si usted aceptó o rechazó el uso de cookies | Permanente hasta que la borre |
| delcarpio_cookie_consent_date | Registra la fecha de su decisión | Permanente hasta que la borre |

3. Cookies de funcionalidad

Se activan solo si usted acepta el uso de cookies.

| Nombre | Origen | Finalidad | Duración |
| googtrans | Google Translate | Recuerda el idioma seleccionado para la traducción del sitio | Sesión |
| site-language | Del Carpio | Respaldo del idioma elegido | Permanente hasta que la borre |

Al activar el traductor, Google puede establecer sus propias cookies desde su dominio (translate.google.com). Estas cookies son responsabilidad de Google y se rigen por su política de privacidad.

4. Contenido incrustado de terceros

La página de contacto incluye un mapa de Google Maps. Si usted acepta el uso de cookies, Google puede establecer cookies propias desde su dominio al cargar el mapa. Si rechaza, el mapa no se carga y en su lugar se muestra la dirección con un enlace externo.

5. Cookies analíticas (Google Tag Manager y Google Analytics)

Si usted acepta el uso de cookies, el sitio carga Google Tag Manager, un administrador de etiquetas de Google, y con él Google Analytics, que nos permite medir cómo se usa la página (qué secciones y productos se visitan) para mejorarla. Si rechaza, no se carga ningún script de Google Tag Manager ni de Google Analytics y no se envía ninguna información a Google con este fin.

| Nombre | Origen | Finalidad | Duración |
| _ga | Google Analytics | Distingue a los visitantes únicos mediante un identificador aleatorio | Hasta 2 años |
| _ga_<ID de la propiedad> | Google Analytics | Mantiene el estado de la sesión de medición | Hasta 2 años |

Google Analytics recopila datos estadísticos de la visita: páginas vistas, fecha y hora, duración de la sesión, sitio o enlace de origen, tipo de dispositivo, navegador y sistema operativo, idioma y ubicación aproximada (ciudad y país). No usamos estos datos para identificarlo ni para responder sus solicitudes de contacto. Google LLC actúa como proveedor del servicio y puede procesar la información en servidores fuera de Chile, incluido Estados Unidos, según su propia política de privacidad.

Próximamente el sitio incorporará ConvertKit para gestionar comunicaciones por correo electrónico. Se activará solo si usted acepta el uso de cookies, y esta política será actualizada cuando entre en funcionamiento.

6. Cómo gestionar sus preferencias

Al ingresar por primera vez, verá un aviso donde puede aceptar o rechazar el uso de cookies no esenciales. Si rechaza, no se cargarán el traductor, el mapa de Google ni Google Tag Manager / Google Analytics, y se borrarán las cookies de medición que existieran.

Puede cambiar su decisión en cualquier momento borrando los datos del sitio desde la configuración de su navegador: el aviso volverá a aparecer y podrá elegir de nuevo. También puede bloquear o eliminar cookies directamente desde ahí, aunque algunas funcionalidades podrían dejar de estar disponibles.

Para impedir que Google Analytics mida su actividad en cualquier sitio web, Google ofrece un complemento de inhabilitación para navegadores: https://tools.google.com/dlpage/gaoptout

7. Consultas

Para consultas sobre esta política o sobre el tratamiento de sus datos personales, escríbanos a contacto@delcarpio.cl

Del Carpio Análisis y Asesorías Ltda.
Av. Sucre 2596, Ñuñoa, Santiago, Chile
`;

export const metadata: Metadata = {
  title: "Política de Cookies | Del Carpio",
  description: "Política de cookies de Del Carpio.",
  alternates: { canonical: "/contacto/politica-cookies" },
};

export default function CookiesPage() {
  return <LegalDocument content={content} />;
}
