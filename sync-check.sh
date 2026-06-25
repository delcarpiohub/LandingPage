#!/usr/bin/env bash
# sync-check.sh
#
# Corre esto ANTES de abrir Codex o Claude Code (o pégalo como primer
# comando dentro de la sesión). Imprime un resumen de "qué pasó desde la
# última vez que esta IA trabajó aquí", para que el code review cruzado
# sea automático en vez de depender de que el agente se acuerde de leer
# el log.
#
# Uso:
#   ./sync-check.sh claude     # si vas a abrir Claude Code
#   ./sync-check.sh codex      # si vas a abrir Codex
#
# No requiere nada fuera de git + bash (ya los tienes instalados).

set -euo pipefail

AGENTE="${1:-}"
if [[ "$AGENTE" != "claude" && "$AGENTE" != "codex" ]]; then
  echo "Uso: ./sync-check.sh [claude|codex]"
  exit 1
fi

echo "════════════════════════════════════════════════════════"
echo " SYNC CHECK — preparando sesión de: $AGENTE"
echo "════════════════════════════════════════════════════════"

echo ""
echo "── Últimos 10 commits (quién tocó qué) ──"
git log --oneline -10 --format="%h  %an  %s" 2>/dev/null || echo "(repo sin commits todavía)"

echo ""
echo "── Último commit en detalle ──"
git log -1 --format="Autor: %an%nFecha: %ad%nMensaje: %s" 2>/dev/null || echo "(sin commits)"

echo ""
echo "── Archivos modificados sin commitear (si los hay) ──"
git status --short 2>/dev/null || true

echo ""
echo "── Últimas 2 entradas del log de sesiones ──"
if [[ -f .agent-log/sessions.md ]]; then
  tail -n 20 .agent-log/sessions.md
else
  echo "(.agent-log/sessions.md no existe todavía — créalo desde la plantilla)"
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo " Recordatorio: si el último commit o la última entrada del"
echo " log NO es de '$AGENTE', haz code review de ese cambio antes"
echo " de escribir código nuevo encima. No corrijas en silencio:"
echo " si algo contradice AGENTS.md, dilo"
echo "════════════════════════════════════════════════════════"
