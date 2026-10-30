# Decisiones técnicas

- **Lógica:** F = AB + C'(A+B). Arduino UNO sustituye AND/OR/NOT de la Etapa 1.
- **Entradas:** SPDT que seleccionan 5 V o GND; D2/D3/D4; sin entrada flotante.
- **Salidas:** D8 para transistor y D9 para LED.
- **Potencia:** 2N2222 en lado bajo, con resistencia de base de referencia 1 kΩ.
- **Protección:** 1N4007 en paralelo con motor, polaridad correcta.
- **Alimentación:** fuente del motor dimensionada para su corriente de arranque, tierras comunes.
- **Pendiente:** probar saturación, tensión VCE, corriente real del motor y capacidad de la fuente en la plataforma elegida.
