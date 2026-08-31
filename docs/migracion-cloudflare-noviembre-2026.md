# Migración a Cloudflare — noviembre de 2026

## Estado actual

- El sitio público `delcarpio.cl` continúa en WordPress.
- Cloudflare está creado como cuenta, pero el dominio **no debe conectarse ni
  cambiar sus nameservers antes de la ventana de migración**.
- No editar registros DNS ni activar proxy de Cloudflare mientras WordPress
  siga siendo el sitio de producción.

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
