import type { Metadata } from "next";
import { LegalDocument } from "../legal-document";

const content = `
Política de Privacidad
1. Introducción

Del Carpio Análisis y Asesorías Ltda. es el responsable del tratamiento de los datos personales recopilados a través de este sitio. Esta política describe cómo recopilamos, usamos y protegemos la información que nos proporcionas y cómo puedes acceder, actualizar o eliminar tus datos personales.

2. Datos personales que recopilamos

Cuando completas un formulario de contacto, recopilamos tu nombre, empresa, correo electrónico, teléfono y mensaje. Según el tipo de solicitud, también puedes entregar voluntariamente información sobre tu sector, área de interés, proyecto, servicio requerido o antecedentes técnicos necesarios para responderla.

3. Uso de cookies

Utilizamos cookies y tecnologías similares para recordar tus preferencias, medir el uso del sitio y habilitar funcionalidades no esenciales solo cuando las aceptas. Puedes revisar el detalle, incluidas las cookies de Google Analytics, en nuestra Política de Cookies.

4. Uso de la información recopilada

Utilizamos la información recopilada exclusivamente para recibir, enrutar y responder tu solicitud de contacto.

5. Compartir datos con terceros

Los datos entregados en formularios se procesan mediante los servicios necesarios para recibir y responder la solicitud. No los compartimos para personalizar tu experiencia ni para fines de marketing. Si aceptas las cookies no esenciales, Google LLC recibe los datos de medición de uso descritos en la sección siguiente, como proveedor de Google Tag Manager y Google Analytics.

6. Almacenamiento de datos

Las solicitudes de contacto se envían al equipo responsable mediante el servicio de correo utilizado por el sitio.

Medición de uso (Google Tag Manager y Google Analytics). Solo si aceptas las cookies no esenciales en el aviso del sitio, cargamos Google Tag Manager y Google Analytics para conocer cómo se usa la página. Recopilan datos estadísticos de la visita: páginas vistas, fecha y hora, duración de la sesión, origen de la visita, tipo de dispositivo, navegador y sistema operativo, idioma, ubicación aproximada (ciudad y país) y un identificador aleatorio guardado en una cookie. Usamos esta información de forma agregada para mejorar el sitio, no para identificarte ni para responder tus solicitudes. Google LLC puede procesarla en servidores fuera de Chile, incluido Estados Unidos, según su política de privacidad.

Si rechazas las cookies, no se carga ningún script de Google Tag Manager ni de Google Analytics y no se envía información a Google con este fin. Puedes cambiar tu decisión borrando los datos del sitio en tu navegador, o impedir la medición con el complemento de inhabilitación de Google Analytics: https://tools.google.com/dlpage/gaoptout

Este sitio todavía no utiliza ConvertKit para recopilar o almacenar datos personales.

7. Seguridad de los datos

Tomamos medidas adecuadas para proteger tus datos personales, como el cifrado de datos, el uso de contraseñas seguras y la contratación de servicios de seguridad confiables. Sin embargo, ninguna medida de seguridad es infalible, y no podemos garantizar la seguridad absoluta de tus datos.

8. Acceso, actualización y eliminación de datos

Tienes derecho a acceder, corregir, actualizar o eliminar tus datos personales en cualquier momento. Para solicitarlo, puedes ponerte en contacto con nosotros a través de marketing@delcarpio.cl

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
  alternates: { canonical: "/contacto/politica-privacidad" },
};

export default function PrivacidadPage() {
  return <LegalDocument content={content} />;
}
