import type { Metadata } from "next";
import { LegalDocument } from "../legal-document";

const content = `
Política de Privacidad
1. Introducción

En Del Carpio valoramos y respetamos la privacidad de nuestros visitantes. Esta política de privacidad describe cómo recopilamos, usamos y protegemos la información personal que nos proporcionas al visitar nuestro sitio web y cómo puedes acceder, actualizar o eliminar tus datos personales.

2. Datos personales que recopilamos

Al visitar nuestro sitio web, podemos recopilar información personal sobre ti, como tu dirección IP, ubicación geográfica, tipo de dispositivo, páginas visitadas, tiempo de permanencia en el sitio y otros datos que herramientas de análisis, como Google Analytics, puedan proporcionar. También recopilamos tu nombre y correo electrónico cuando te registras en nuestro formulario de contacto.

3. Uso de cookies

Utilizamos cookies y tecnologías similares para mejorar la experiencia de nuestros visitantes, personalizar el contenido y analizar el comportamiento de los usuarios. Al continuar utilizando nuestro sitio web, aceptas el uso de cookies y tecnologías similares de acuerdo con esta política de privacidad.

4. Uso de la información recopilada

Utilizamos la información recopilada para comprender las preferencias e intereses de nuestros visitantes, mejorar la experiencia del usuario, optimizar nuestro contenido y estrategia de marketing, y enviar comunicaciones relacionadas con nuestros servicios, productos y promociones.

5. Compartir datos con terceros

Podemos compartir tus datos personales con terceros con el fin de personalizar tu experiencia y ofrecerte productos y servicios que estén alineados con tus intereses. Aseguramos que estos terceros cumplan con nuestras políticas de privacidad y protección de datos.

6. Almacenamiento de datos

Los datos recopilados se almacenarán en los servidores de las herramientas de análisis y almacenamiento que utilizamos, como Google Analytics y ConvertKit, y estarán sujetos a sus políticas de privacidad y seguridad.

7. Seguridad de los datos

Tomamos medidas adecuadas para proteger tus datos personales, como el cifrado de datos, el uso de contraseñas seguras y la contratación de servicios de seguridad confiables. Sin embargo, ninguna medida de seguridad es infalible, y no podemos garantizar la seguridad absoluta de tus datos.

8. Acceso, actualización y eliminación de datos

Tienes derecho a acceder, corregir, actualizar o eliminar tus datos personales en cualquier momento. Para hacerlo, puedes seguir el enlace proporcionado en los correos electrónicos que te enviamos o ponerte en contacto con nosotros a través de marketing@delcarpio.cl

9. Usuarios menores de edad

Nuestro sitio web está dirigido a personas mayores de 14 años. Si eres menor de 14 años, debes obtener el consentimiento de tus padres o tutores antes de proporcionarnos tus datos personales.

10. Cambios en la política de privacidad

Podemos actualizar esta política de privacidad en cualquier momento. Te notificaremos sobre cualquier cambio significativo en nuestra política de privacidad mediante la publicación de la nueva versión en nuestro sitio web y/o enviándote una notificación por correo electrónico. Te recomendamos revisar periódicamente esta política de privacidad para estar informado sobre cómo protegemos tu información.

11. Jurisdicción y aplicabilidad

Esta política de privacidad está dirigida principalmente a visitantes de países de habla hispana o aquellos que tienen una gran cantidad de población que habla español. Sin embargo, nos esforzamos por cumplir con las leyes y regulaciones de privacidad aplicables en todas las jurisdicciones en las que operamos.

12. Contacto

Si tienes preguntas o inquietudes sobre esta política de privacidad o el manejo de tus datos personales, no dudes en ponerte en contacto con nosotros:

Camila Andrea Del Carpio Parra
Av. Sucre 2596, Ñuñoa. Santiago, Chile
marketing@delcarpio.cl
`;

export const metadata: Metadata = {
  title: "Política de Privacidad | Del Carpio",
  description: "Política de privacidad de Del Carpio.",
};

export default function PrivacidadPage() {
  return <LegalDocument content={content} />;
}
