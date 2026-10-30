#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if ! command -v git >/dev/null 2>&1; then echo "No se encontró git. Abre Git Bash."; exit 1; fi
if [[ ! -d .git ]]; then
  git init -b main 2>/dev/null || { git init; git branch -M main; }
fi
if [[ -z "$(git config user.name || true)" || -z "$(git config user.email || true)" ]]; then
  echo 'Configura primero: git config --global user.name "TU_NOMBRE"'
  echo 'y: git config --global user.email "TU_CORREO_O_NOREPLY"'
  exit 0
fi
git add .gitignore README.md firmware circuitos documentacion capturas pruebas scripts
if ! git diff --cached --quiet; then git commit -m "chore: iniciar estructura Etapa 2 Arduino C++"; else echo "No hay archivos nuevos para commit."; fi
echo "Repositorio local listo. Para publicar: crea un repositorio privado en GitHub y configura git remote origin con su URL real."
