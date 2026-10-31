# EIC901 · Validación funcional — Etapa 2

La función de votación implementada en Arduino es `F = (A && B) || (!C && (A || B))`.

La salida `F` controla el LED (D9) y el transistor del motor (D8). Las ocho combinaciones fueron comprobadas en Tinkercad con el circuito completo.

| N.º | A | B | C | F esperada | F observada | LED | Motor | Evidencia | Resultado |
|---:|:-:|:-:|:-:|:-:|:-:|---|---|---|---|
| 1 | 0 | 0 | 0 | 0 | 0 | Apagado | Detenido | [000](../capturas/04_pruebas/01_Prueba_000_F0.png) | Correcto |
| 2 | 0 | 0 | 1 | 0 | 0 | Apagado | Detenido | [001](../capturas/04_pruebas/02_Prueba_001_F0.png) | Correcto |
| 3 | 0 | 1 | 0 | 1 | 1 | Encendido | Girando | [010](../capturas/04_pruebas/03_Prueba_010_F1.png) | Correcto |
| 4 | 0 | 1 | 1 | 0 | 0 | Apagado | Detenido | [011](../capturas/04_pruebas/04_Prueba_011_F0.png) | Correcto |
| 5 | 1 | 0 | 0 | 1 | 1 | Encendido | Girando | [100](../capturas/04_pruebas/05_Prueba_100_F1_Motor_Encendido.png) | Correcto |
| 6 | 1 | 0 | 1 | 0 | 0 | Apagado | Detenido | [101](../capturas/04_pruebas/06_Prueba_101_F0.png) | Correcto |
| 7 | 1 | 1 | 0 | 1 | 1 | Encendido | Girando | [110](../capturas/04_pruebas/07_Prueba_110_F1.png) | Correcto |
| 8 | 1 | 1 | 1 | 1 | 1 | Encendido | Girando | [111](../capturas/04_pruebas/08_Prueba_111_F1.png) | Correcto |

**Resultado: 8/8 combinaciones correctas.**

### Mediciones de la simulación

- Fuente regulada a 5,00 V.
- Motor apagado: aproximadamente 0,00 A y 0 rpm.
- Motor encendido: aproximadamente 79,3 mA; motor girando.

Nota: las lecturas son de simulación y no sustituyen verificaciones de corriente de arranque en un montaje real.
