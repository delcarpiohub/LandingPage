# Migración a Cloudflare — noviembre de 2026

## Estado actual

- El sitio público `delcarpio.cl` continúa en WordPress.
- Turnstile es independiente del DNS: puede activarse ahora con una cuenta
  Cloudflare, una *site key* y una *secret key*, sin mover el sitio de Vercel
  ni cambiar nameservers. El código conserva las claves de prueba hasta que se
  entreguen las claves reales.
- El dominio **no debe conectarse ni cambiar sus nameservers antes de la
  ventana de migración de noviembre**.
- No editar registros DNS ni activar proxy de Cloudflare mientras WordPress
  siga siendo el sitio de producción.

## Turnstile — activación independiente

1. Crear el widget de Turnstile en la cuenta Cloudflare para los dominios que
   se usarán en el formulario.
2. Entregar la *site key* y la *secret key* reales para reemplazar las claves
   de prueba mediante variables de entorno.
3. Verificar el envío del formulario con Turnstile antes y después del cambio.

Esta activación no requiere conectar `delcarpio.cl` a Cloudflare ni modificar
los DNS actuales de WordPress.

## Orden de ejecución acordado

1. Confirmar el proyecto y dominio de producción en Vercel, y validar la
   versión Next.js en un subdominio temporal.
2. Inventariar los registros DNS vigentes, incluidos `A`/`CNAME` del sitio,
   `MX` y registros `TXT` de SPF, DKIM y DMARC.
3. Conectar `delcarpio.cl` a Cloudflare con el plan Free y revisar
   manualmente el resultado del escaneo DNS.
4. Configurar y comprobar los registros que Vercel indique para el dominio.
5. Cambiar los nameservers en el registrador solamente después de validar el
   inventario y una ventana de cambio aprobada.
6. Validar resolución, HTTPS, formulario, correo entrante/saliente y la
   redirección prevista antes de considerar cerrada la migración.
7. Activar gradualmente proxy, WAF y reglas de seguridad tras la validación
   del sitio en producción.

## Riesgo a evitar

Cambiar nameservers sin una copia verificada de los registros puede dejar el
sitio inaccesible o interrumpir el correo corporativo.
