# EIC901 · Diagramas del sistema de extinción

## Ejecutar en Windows

1. Instala Node.js LTS desde https://nodejs.org/ si no lo tienes.
2. Extrae todo el ZIP en una carpeta normal (no lo ejecutes desde dentro del ZIP).
3. Haz doble clic en `INICIAR_EN_WINDOWS.bat` (primera ejecución necesita Internet).
4. La página debería abrirse automáticamente; si no, entra en http://localhost:5173/ .
5. Deja la ventana de comandos abierta mientras uses la web.
6. Para detenerla, presiona Ctrl+C en esa ventana.

## Alternativa con Git Bash o PowerShell

```bash
node --version
npm --version
npm install
npm run dev
```

Abrir http://localhost:5173/ .

## Exportar para distribución

```bash
npm run build
```

La carpeta `dist/` contendrá el sitio compilado. Para previsualizarlo usa `npm run preview`.

## Archivos de origen

Los componentes `src/App.tsx` y `src/components/*Tab.tsx` provienen del ZIP original de LlamaCoder **sin modificación**. Se añadieron únicamente archivos de inicio Vite/Tailwind y componentes mínimos de interfaz que faltaban en la exportación.

## Precaución de validación

El diagrama eléctrico SVG es un borrador de documentación y **NO debe utilizarse como fuente de conexión eléctrica física** hasta revisar las uniones y los símbolos. En particular, debe verificarse la representación paralela del diodo al motor y la separación del positivo externo con el 5V de Arduino. La simulación validada permanece en Tinkercad.

No edita el firmware Arduino ni sustituye la simulación de Tinkercad.
