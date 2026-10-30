# EIC901 — Etapa 2: Sistema de Extinción por Votación 2 de 3 con Arduino y C++

**Universidad Don Bosco · Electrónica Aplicada al Internet de las Cosas · Ciclo 02-2026**

## Objetivo

Reemplazar las compuertas 74HC04, 74HC08 y 74HC32 de la Etapa 1 por un **Arduino UNO programado en C/C++**, conservando la función de votación 2 de 3 para activar una carga inductiva mediante un transistor BJT NPN.

## Función lógica

`F = (A && B) || ((!C) && (A || B));`

- `A=1`: detector A en alarma.
- `B=1`: detector B en alarma.
- `C=1`: tercer detector en condición normal; `C=0`: alarma o cable abierto.
- `F=1`: orden de activar el actuador.

## Pines y componentes previstos

| Componente | Conexión |
|---|---|
| Interruptor A | D2 |
| Interruptor B | D3 |
| Interruptor C | D4 |
| BJT 2N2222 | D8 → resistencia de base 1 kΩ → B |
| LED indicador | D9 → resistencia 300 Ω → LED |
| Motor de 5 V | Fuente adecuada, controlado por el colector del BJT |
| Diodo 1N4007 | En paralelo con el motor: cátodo al positivo, ánodo al colector |

Los interruptores SPDT seleccionan entre +5 V y GND mediante el terminal COM. No se necesitan pull-down externos si las dos posiciones ya definen el nivel. El emisor del BJT y todas las tierras deben estar en común; verificar orientación de terminales según el modelo del transistor.

**Precaución:** comprobar la corriente de arranque del motor, la capacidad de la fuente y la saturación del transistor. El cálculo de corriente de base ≈4,3 mA con 1 kΩ es una aproximación, no evidencia de conmutación correcta.

## Estado del proyecto

- **Tinkered:** las 8 combinaciones de la salida lógica F fueron observadas según la tabla; la etapa del motor requiere verificación eléctrica.
- **Arduinet:** prueba por código de las 8 combinaciones.
- **Cirkit Designer:** diagrama de referencia y firmware compilado; su modelo disponible no permitió simular el 2N2222.
- **Tinkercad:** montaje y validación eléctrica pendientes; es el entorno previsto para la entrega oficial.

## Dónde está cada cosa

- `firmware/arduino/EIC901_Etapa2_Arduino_CPP/`: **código principal `.ino`**; la carpeta y el archivo deben tener el mismo nombre para Arduino IDE.
- `circuitos/cirkit_designer/`: proyecto editable `.ckt` y diagrama PNG exportado.
- `circuitos/tinkered/`: exportaciones originales de Tinkered (`wiring.json`, `main.sch`, `main.cpp`, etc.) de cada versión, en subcarpetas separadas.
- `circuitos/tinkercad/`: enlace al circuito maestro de Tinkercad e instrucciones para reconstrucción.
- `pruebas/tabla_verdad.md`: resultados esperados y espacio para resultados nuevos de Tinkercad.
- `pruebas/evidencias/`: evidencias puntuales de pruebas.
- `capturas/`: capturas ordenadas por partes para el informe.
- `documentacion/requisitos/`: resúmenes sin datos personales de la Ruta y Tabla 2.
- `documentacion/diseno/`: esquemas, cálculos, justificaciones y decisiones.
- `documentacion/informe/`: informe de la Etapa 2, sin datos personales si el repositorio es público.
- `privado/`: documentos originales, archivos institucionales con nombres/carnés, claves y videos; **no se publican en Git**.

## Ejecución y validación

1. Crear el circuito en Tinkercad (Arduino UNO, entradas, etapa de potencia).
2. Pegar el código principal en **Código → Texto**.
3. Simular con los interruptores A/B/C y registrar las ocho filas.
4. Verificar el LED, D8 y la corriente del motor; no dar por validado el motor solo porque el monitor serial muestre F.
5. Completar `pruebas/tabla_verdad.md` y archivar las capturas correspondientes.

## Privacidad y publicación

No subir nombres completos, carnés, contraseñas, tokens, correos personales ni IP/direcciones internas que no sean necesarias. Para repositorios públicos, revisar el contenido del `.ckt`, imágenes y PDFs antes de hacer `git add`. Se recomienda crear primero el repositorio como **privado** en GitHub.

## Este paquete inicial

El paquete ZIP de inicio ya contiene **la versión de `sketch.ino` que compartiste**, copiada a la carpeta de Arduino con el mismo contenido y el nombre de la carpeta; el original se conserva en `firmware/originales_cirkit/sketch.ino`. También contiene el `.ckt` y el PNG que compartiste. La estructura se puede seguir alimentando con nuevas capturas y versiones.

Para iniciar Git tras extraer este ZIP, abre Git Bash en esta carpeta y ejecuta `bash scripts/inicializar_git.sh`. Si prefieres que un script cree la estructura desde cero en otra ubicación, descarga `crear_estructura_EIC901_Etapa2_GitBash.sh` por separado.
