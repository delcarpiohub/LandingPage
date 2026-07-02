import type { Metadata } from "next";
import { LegalDocument } from "../legal-document";

const content = `
Política de Cookies
1. Introducción

En Del Carpio Análisis y Asesorías Ltda., con domicilio en Avenida Sucre 2596, Ñuñoa, Santiago, Chile, valoramos tu privacidad. Esta Política de Cookies explica cómo utilizamos las cookies y tecnologías similares en nuestro sitio web. Si tienes cualquier pregunta sobre nuestra Política de Cookies, puedes contactarnos en marketing@delcarpio.cl o al número 225819500.

2. ¿Qué son las cookies?

Las cookies son pequeños archivos de texto que se almacenan en tu navegador cuando visitas un sitio web. Estos archivos contienen datos que nos permiten recordar tus preferencias para mejorar tu experiencia de navegación.

3. Uso de Cookies en nuestro sitio

Nuestro sitio web utiliza cookies de terceros como Google Analytics y ConvertKit, entre otros servicios. Estas cookies son utilizadas para analizar la información de los usuarios y enviar campañas de marketing con información relevante y pertinente. Las cookies que utilizamos son persistentes, técnicas, de personalización, de análisis y publicitarias.

Utilizamos estas cookies para mejorar tu experiencia de navegación, obtener datos que nos permitan entregarte información relevante a través de campañas por correo electrónico y ajustar la información que mostramos en nuestro sitio de acuerdo a las preferencias generales de nuestros usuarios.

No utilizamos cookies propias en este momento, pero si decidimos implementarlas en el futuro, actualizaremos esta política de cookies para reflejarlo.

4. Cómo gestionar y desactivar estas cookies

Si deseas bloquear, permitir, eliminar o configurar las cookies en tu navegador, puedes hacerlo a través de las opciones de configuración de tu navegador. Aquí tienes enlaces a las guías de configuración de cookies de los navegadores más comunes:

Google Chrome: https://support.google.com/chrome/answer/95647
Mozilla Firefox: https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias
Microsoft Edge: https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d
Safari: https://support.apple.com/es-es/guide/safari/sfri11471/mac
Ten en cuenta que deshabilitar o eliminar algunas cookies puede afectar la funcionalidad del sitio web y tu experiencia de usuario.

5. Consentimiento y cambios en la Política de Cookies

Al utilizar nuestro sitio web, aceptas el uso de cookies. En caso de cambios en nuestra Política de Cookies, te notificaremos por correo electrónico si estás registrado en nuestro sitio y a través de un aviso en nuestro sitio web. Te recomendamos revisar esta Política de Cookies periódicamente para estar informado de cualquier cambio.

Si tienes alguna pregunta o comentario sobre nuestra Política de Cookies, por favor, no dudes en ponerte en contacto con nosotros a través de marketing@delcarpio.cl
`;

export const metadata: Metadata = {
  title: "Política de Cookies | Del Carpio",
  description: "Política de cookies de Del Carpio.",
};

export default function CookiesPage() {
  return <LegalDocument content={content} />;
}
