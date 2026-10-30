# EIC901 — Etapa 2 · Transferencia de Cirkit Designer a Tinkercad

## Archivos de origen
- EIC901_Etapa2_Cirkit_V2_Corregido.ckt: proyecto editable nativo de Cirkit Designer (contenedor ZIP con cirkitFile.json y otros archivos internos). NO es importable directamente en Tinkercad Circuits.
- sketch.ino: código Arduino completo generado por Cirkit AI y exportado por el estudiante.
- EIC901_Etapa2_Cirkit_V2_Corregido.png: plano visual de referencia.

## Validaciones realizadas al archivo .ckt
- 11 componentes en el proyecto.
- Arduino UNO, 3 SPDT, motor CC, fuente externa 5V, transistor NPN 2N2222, 1N4007, LED, resistencia base 1000 ohmios, resistencia LED 300 ohmios.
- D2/D3/D4 conectan al común de los SPDT A/B/C.
- D8 -> resistencia de 1000 ohmios -> base del 2N2222.
- D9 -> resistencia de 300 ohmios -> LED.
- Emisor -> GND común; colector -> terminal negativo del motor y ánodo del 1N4007.
- Positivo del motor -> +5V de fuente y cátodo del 1N4007.
- Los SPDT seleccionan entre 5V y GND.
- Código contiene F = (A && B) || ((!C) && (A || B)), monitor serie 115200.

Esto verifica la conectividad guardada en el archivo, no la simulación real de corrientes ni saturación del transistor.

## Precaución eléctrica importante
El archivo .ckt comparte el positivo de la fuente de 5V del motor con el pin 5V del Arduino. Para reconstrucción didáctica en Tinkercad y para evitar problemas si Arduino se alimenta por USB, recomendamos ALIMENTAR EL MOTOR CON UNA FUENTE SEPARADA y conectar SOLO LOS GND EN COMÚN; los SPDT pueden alimentarse desde los pines 5V/GND de Arduino. La fuente debe poder soportar la corriente de arranque del motor. No unir dos fuentes de 5V independientes de forma improvisada.

El BJT debe tener su pinout real E/B/C verificado en Tinkercad. La resistencia 1k limita la corriente de base; no garantiza saturación para motores de alto consumo. Verificar V_CE y corriente del motor bajo carga.

## Secuencia para construir en Tinkercad

1. Circuits -> Create new Circuit -> título EIC901_Etapa2_Arduino_V2_Interruptores.
2. Agregar Arduino UNO R3 y protoboard de tamaño suficiente.
3. Agregar 3 interruptores deslizantes SPDT (si están disponibles) como A/B/C, un 2N2222, un motor de 5V, diodo 1N4007, LED rojo, resistencias de 1000 y 300 ohmios, fuente de motor.
4. Conectar A COM->D2, B COM->D3, C COM->D4. Un extremo de cada SPDT a 5V Arduino, el otro a GND Arduino. No se necesitan resistencias pull-down si el SPDT conmuta explícitamente a ambos rieles.
5. D8 -> resistencia de 1000 ohmios -> base del BJT; emisor a GND común; colector a motor negativo; motor positivo a fuente de motor +5V.
6. Diodo flyback directamente en paralelo: cátodo/banda al motor positivo, ánodo al motor negativo/colector.
7. D9 -> resistencia de 300 ohmios -> ánodo LED; cátodo LED -> GND.
8. Alimentación del motor por fuente externa adecuada: motor+ a fuente+, fuente- a GND Arduino. Mantener los rieles +5V de Arduino y de la fuente del motor separados si están alimentados independientemente; compartir GND.
9. Code -> Text -> sustituir el ejemplo por el contenido completo de sketch.ino.
10. Start Simulation -> monitor serie 115200 -> mover los SPDT y anotar cada combinación; comprobar motor y LED.

## Tabla de verdad obligatoria (pruebas, no resultados de Tinkercad)
| A | B | C | F esperada |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

## Estado de pruebas
- Tinkered: monitor serie mostró 8/8 combinaciones correctas según las capturas y conversación, con simulación eléctrica no verificada por esta revisión.
- Arduinet: 8/8 combinaciones calculadas mediante programa independiente.
- Cirkit Designer: el servicio informó compilación exitosa, pero no ejecutó simulación con 2N2222.
- Tinkercad: PENDIENTE. No afirmar que sus ocho pruebas ni el motor fueron validados hasta ejecutarlas allí.
