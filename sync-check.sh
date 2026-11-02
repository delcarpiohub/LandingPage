#!/usr/bin/env bash
# sync-check.sh
#
# Corre esto ANTES de abrir Codex, Claude Code o Antigravity (o pégalo como
# primer comando dentro de la sesión). Imprime un resumen de "qué pasó desde
# la última vez que esta IA trabajó aquí", para que el code review cruzado
# sea automático en vez de depender de que el agente se acuerde de leer
# el log.
#
# Uso:
#   ./sync-check.sh claude       # si vas a abrir Claude Code
#   ./sync-check.sh codex        # si vas a abrir Codex
#   ./sync-check.sh antigravity  # si vas a abrir Antigravity
#
# No requiere nada fuera de git + bash (ya los tienes instalados).

set -euo pipefail

AGENTE="${1:-}"
if [[ "$AGENTE" != "claude" && "$AGENTE" != "codex" && "$AGENTE" != "antigravity" ]]; then
  echo "Uso: ./sync-check.sh [claude|codex|antigravity]"
  exit 1
fi

echo "════════════════════════════════════════════════════════"
echo " SYNC CHECK — preparando sesión de: $AGENTE"
echo "════════════════════════════════════════════════════════"

echo ""
echo "── Rama actual vs. rama productiva real (origin) ──"
BRANCH_ACTUAL="$(git branch --show-current 2>/dev/null || echo "(detached)")"
echo "Rama actual: $BRANCH_ACTUAL"
if git fetch origin --quiet 2>/dev/null; then
  RAMA_PROD="$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's#^origin/##')"
  if [[ -z "$RAMA_PROD" ]]; then
    echo "⚠ No se pudo determinar la rama productiva (origin/HEAD) — revisar remoto manualmente."
  else
    echo "Rama productiva (origin/HEAD): $RAMA_PROD"
    if [[ "$BRANCH_ACTUAL" == "$RAMA_PROD" ]]; then
      DETRAS=0
    else
      DETRAS="$(git rev-list --count "HEAD..origin/$RAMA_PROD" 2>/dev/null || echo "?")"
    fi
    if [[ "$DETRAS" != "0" && "$DETRAS" != "?" ]]; then
      echo ""
      echo "🚨🚨🚨 ALERTA: esta rama está $DETRAS commit(s) DETRÁS de origin/$RAMA_PROD 🚨🚨🚨"
      echo "   Esto es EXACTAMENTE lo que causó la confusión del 2026-11-02 (488 commits"
      echo "   de diferencia, 'la página cambió y no sé por qué'). NO sigas construyendo"
      echo "   sobre esta rama sin decidir primero: ¿creo rama nueva desde origin/$RAMA_PROD"
      echo "   y traigo mi trabajo con cherry-pick, o actualizo esta rama? Avisa al usuario"
      echo "   antes de escribir código."
    elif [[ "$DETRAS" == "0" ]]; then
      echo "✓ Esta rama está al día con origin/$RAMA_PROD (o es la misma rama)."
    fi
    # Commits propios sin pushear (en la rama actual, respecto a su upstream o a origin/RAMA_PROD)
    UPSTREAM="$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null || true)"
    if [[ -n "$UPSTREAM" ]]; then
      ADELANTE="$(git rev-list --count "$UPSTREAM..HEAD" 2>/dev/null || echo "?")"
    else
      ADELANTE="$(git rev-list --count "origin/$RAMA_PROD..HEAD" 2>/dev/null || echo "?")"
      UPSTREAM="(sin upstream configurado — comparando contra origin/$RAMA_PROD)"
    fi
    if [[ "$ADELANTE" != "0" && "$ADELANTE" != "?" ]]; then
      echo ""
      echo "⚠ Hay $ADELANTE commit(s) locales SIN PUSHEAR en esta rama (respecto a $UPSTREAM)."
      echo "   Si esta máquina se pierde o se corrompe, ese trabajo se pierde. Pushear pronto."
    fi
  fi
else
  echo "⚠ No se pudo hacer 'git fetch origin' (¿sin red?) — este chequeo quedó incompleto."
fi

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
