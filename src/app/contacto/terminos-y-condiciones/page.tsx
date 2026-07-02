import type { Metadata } from "next";
import { LegalDocument } from "../legal-document";

const content = `
Términos y Condiciones
1. Introducción

Al acceder y utilizar www.delcarpio.cl (el «Sitio Web»), propiedad de Del Carpio Análisis y Asesorías Ltda. («Nosotros», «Nuestro», «la Empresa»), usted («Usuario») acepta cumplir y estar sujeto a los siguientes términos y condiciones.

2. Contenido del Sitio Web

La información contenida en este sitio web es solo para fines generales de información y referencia. Aunque nos esforzamos por mantener la información actualizada y correcta, no ofrecemos ninguna garantía de ningún tipo, explícita o implícita, acerca de la integridad, exactitud, confiabilidad, idoneidad o disponibilidad con respecto al sitio web o la información, productos, servicios o gráficos relacionados contenidos en el sitio web para cualquier propósito.

3. Uso del Sitio Web

Al utilizar nuestro sitio web, usted acuerda:

No utilizar el sitio web de manera que pueda dañar, inutilizar, sobrecargar o perjudicar el sitio web.
No intentar obtener acceso no autorizado a ninguna parte del sitio web.
4. Política de comentarios del blog

El sitio web permite la publicación de comentarios en las entradas de nuestro blog. Al publicar, usted acuerda:

Abstenerse de publicar comentarios que sean discriminatorios, ofensivos, obscenos, abusivos o que promuevan el odio de cualquier tipo.
No publicar contenido que infrinja cualquier derecho de propiedad intelectual, incluyendo sin limitación los derechos de autor, patentes o marcas comerciales de cualquier tercero.
Nos reservamos el derecho de eliminar cualquier comentario que no cumpla con estas condiciones.

5. Enlaces a sitios web de terceros

Nuestro sitio web puede contener enlaces a sitios web de terceros. Sin embargo, una vez que haya utilizado estos enlaces para abandonar nuestro sitio, debe tener en cuenta que no tenemos ningún control sobre ese otro sitio web. No nos hacemos responsables de la protección y privacidad de cualquier información que proporcione al visitar dichos sitios y dichos sitios no se rigen por esta declaración de privacidad. Debe tener precaución y mirar la declaración de privacidad aplicable al sitio web en cuestión.

6. Modificaciones

Nos reservamos el derecho de cambiar estos términos y condiciones en cualquier momento. Cualquier cambio será efectivo inmediatamente después de la publicación de la versión revisada de estos términos y condiciones en el sitio web. Es responsabilidad del usuario revisar estos términos y condiciones periódicamente.

7. Jurisdicción y Leyes Aplicables

Cualquier disputa que surja de la interpretación o cumplimiento de los presentes términos y condiciones se regirá por las leyes de Chile.

8. Contacto

Si tiene alguna pregunta sobre estos términos y condiciones, por favor póngase en contacto con Camila Del Carpio en marketing@delcarpio.cl
`;

export const metadata: Metadata = {
  title: "Términos y Condiciones | Del Carpio",
  description: "Términos y condiciones de uso de Del Carpio.",
};

export default function TerminosPage() {
  return <LegalDocument content={content} />;
}
