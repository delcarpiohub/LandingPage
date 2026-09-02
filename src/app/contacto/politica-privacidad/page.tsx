import type { Metadata } from "next";
import { LegalDocument } from "../legal-document";

const content = `
Política de Privacidad
1. Introducción

Del Carpio Análisis y Asesorías Ltda. es el responsable del tratamiento de los datos personales recopilados a través de este sitio. Esta política describe cómo recopilamos, usamos y protegemos la información que nos proporcionas y cómo puedes acceder, actualizar o eliminar tus datos personales.

2. Datos personales que recopilamos

Cuando completas un formulario de contacto, recopilamos tu nombre, empresa, correo electrónico, teléfono y mensaje. Según el tipo de solicitud, también puedes entregar voluntariamente información sobre tu sector, área de interés, proyecto, servicio requerido o antecedentes técnicos necesarios para responderla.

3. Uso de cookies

Utilizamos cookies y tecnologías similares para recordar tus preferencias y habilitar funcionalidades no esenciales solo cuando las aceptas. Puedes revisar el detalle en nuestra Política de Cookies.

4. Uso de la información recopilada

Utilizamos la información recopilada exclusivamente para recibir, enrutar y responder tu solicitud de contacto.

5. Compartir datos con terceros

Los datos entregados en formularios se procesan mediante los servicios necesarios para recibir y responder la solicitud. No los compartimos para personalizar tu experiencia ni para fines de marketing.

6. Almacenamiento de datos

Actualmente este sitio no utiliza Google Analytics ni ConvertKit para recopilar o almacenar datos personales. Las solicitudes de contacto se envían al equipo responsable mediante el servicio de correo utilizado por el sitio.

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
};

export default function PrivacidadPage() {
  return <LegalDocument content={content} />;
}
