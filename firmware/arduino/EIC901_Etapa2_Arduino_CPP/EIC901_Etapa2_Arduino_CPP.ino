#include <Arduino.h>

const uint8_t PIN_A = 2;
const uint8_t PIN_B = 3;
const uint8_t PIN_C = 4;
const uint8_t PIN_MOTOR = 8; // D8 -> resistencia 1 kΩ -> base 2N2222
const uint8_t PIN_LED = 9;   // D9 -> resistencia 300 Ω -> ánodo LED

bool A = false, B = false, C = false, F = false;

void leerEntradas() {
  A = (digitalRead(PIN_A) == HIGH);
  B = (digitalRead(PIN_B) == HIGH);
  C = (digitalRead(PIN_C) == HIGH); // C=1 normal; C=0 alarma/cable abierto
}

bool calcularF() {
  return (A && B) || ((!C) && (A || B));
}

void accionarSalidas() {
  digitalWrite(PIN_MOTOR, F ? HIGH : LOW);
  digitalWrite(PIN_LED, F ? HIGH : LOW);
}

void enviarEstadoSerial() {
  Serial.print("A="); Serial.print(A);
  Serial.print(" B="); Serial.print(B);
  Serial.print(" C="); Serial.print(C);
  Serial.print(" F="); Serial.println(F);
}

void setup() {
  pinMode(PIN_A, INPUT);
  pinMode(PIN_B, INPUT);
  pinMode(PIN_C, INPUT);
  pinMode(PIN_MOTOR, OUTPUT);
  pinMode(PIN_LED, OUTPUT);
  digitalWrite(PIN_MOTOR, LOW);
  digitalWrite(PIN_LED, LOW);
  Serial.begin(115200);
}

void loop() {
  leerEntradas();
  F = calcularF();
  accionarSalidas();
  enviarEstadoSerial();
  delay(150);
}