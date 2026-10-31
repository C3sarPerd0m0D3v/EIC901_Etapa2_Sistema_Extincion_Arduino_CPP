@echo off
chcp 65001 >nul
title EIC901 - Diagramas del Sistema de Extincion
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: falta Node.js. Instala la version LTS desde https://nodejs.org/
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm no esta disponible. Reinstala Node.js LTS.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Instalando dependencias por primera vez...
  call npm install
  if errorlevel 1 (
    echo No se pudieron instalar las dependencias. Revisa tu conexion.
    pause
    exit /b 1
  )
)
echo Abriendo aplicacion local en http://localhost:5173
call npm run dev
pause
