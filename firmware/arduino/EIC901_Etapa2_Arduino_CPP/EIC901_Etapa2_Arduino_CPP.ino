
const int PIN_A = 2;
const int PIN_B = 3;
const int PIN_C = 4;
const int MOTOR = 8;
const int LED = 9;

void setup() {
  pinMode(PIN_A, INPUT);
  pinMode(PIN_B, INPUT);
  pinMode(PIN_C, INPUT);
  pinMode(MOTOR, OUTPUT);
  pinMode(LED, OUTPUT);

  Serial.begin(115200);
}

void loop() {
  int A = digitalRead(PIN_A);
  int B = digitalRead(PIN_B);
  int C = digitalRead(PIN_C);

  int F = (A && B) || (!C && (A || B));

  digitalWrite(MOTOR, F);
  digitalWrite(LED, F);

  Serial.print("A=");
  Serial.print(A);
  Serial.print(" B=");
  Serial.print(B);
  Serial.print(" C=");
  Serial.print(C);
  Serial.print(" F=");
  Serial.println(F);

  delay(500);
}
