/*
  Arduino Starter Kit example
 Modified Project 6  - Light Theremin

 Parts required:
 photoresistor
 10 kilohm resistor
 piezo

 http://arduino.cc/starterKit

 This example code is part of the public domain
*/

// variable to hold sensor value
int sensorValue;
// variable to calibrate low value
int sensorLow = 1023;
// variable to calibrate high value
int sensorHigh = 0;

void setup() {
  Serial.begin(9600);

  // calibrate for the first five seconds after program runs
  while (millis() < 5000) {
    // record the maximum sensor value
    
    sensorValue = analogRead(A0);
    if (sensorValue > sensorHigh) {
      sensorHigh = sensorValue;
    }
    // record the minimum sensor value
    if (sensorValue < sensorLow) {
      sensorLow = sensorValue;
    }
  }
  // turn the LED off, signaling the end of the calibration period
  //digitalWrite(ledPin, LOW);
  Serial.println("done");
}

void loop() {
  //read the input from A0 and store it in a variable
  sensorValue = analogRead(A0);

  // Shows the light value/intensity
  Serial.println(sensorValue);

  // wait for a moment
  delay(10);
}

