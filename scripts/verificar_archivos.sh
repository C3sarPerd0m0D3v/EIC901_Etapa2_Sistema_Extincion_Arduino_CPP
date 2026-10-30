#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "=== Archivos importantes de EIC901 Etapa 2 ==="
for archivo in \
  "firmware/arduino/EIC901_Etapa2_Arduino_CPP/EIC901_Etapa2_Arduino_CPP.ino" \
  "circuitos/cirkit_designer/EIC901_Etapa2_Cirkit_V2_Corregido.ckt" \
  "circuitos/cirkit_designer/EIC901_Etapa2_Cirkit_V2_Corregido.png" \
  "circuitos/tinkercad/enlace_proyecto.md" \
  "pruebas/tabla_verdad.md"; do
  if [[ -f "$archivo" ]]; then printf 'OK       %s\n' "$archivo"; else printf 'FALTA    %s\n' "$archivo"; fi
done
printf '\nEstado Git:\n'
if command -v git >/dev/null 2>&1 && [[ -d .git ]]; then git status --short; else echo 'Git aún no inicializado.'; fi
