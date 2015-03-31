/*
  Web client
 
 This sketch connects to a website (http://www.google.com)
 using an Arduino Wiznet Ethernet shield. 
 
 Circuit:
 * Ethernet shield attached to pins 10, 11, 12, 13
 
 created 18 Dec 2009
 by David A. Mellis
 modified 9 Apr 2012
 by Tom Igoe, based on work by Adrian McEwen
 
 */

#include <SPI.h>
#include <Ethernet.h>

#include "TemperatureTMP.h"

TemperatureTMP Temperature;
float temp;




// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
byte mac[] = { 0x90, 0xA2, 0xDA, 0x0F, 0x99, 0x3B };
// if you don't want to use DNS (and reduce your sketch size)
// use the numeric IP instead of the name for the server:
//IPAddress server(74,125,232,128);  // numeric IP for Google (no DNS)
char server[] = "data.sparkfun.com";    // name address for Google (using DNS)

// Set the static IP address to use if the DHCP fails to assign
//IPAddress ip(192,168,0,177);<-

// Initialize the Ethernet client library
// with the IP address and port of the server 
// that you want to connect to (port 80 is default for HTTP):
EthernetClient client;

unsigned long lastConnectionTime = 0;          // last time you connected to the server, in milliseconds
boolean lastConnected = false;                 // state of the connection last time through the main loop
//const unsigned long postingInterval = 30*1000;// delay between updates, in milliseconds
const unsigned long postingInterval = 1000UL;
//const unsigned long postingInterval = 1 Data Logging Activity Data Logging Activity0*1000; //testing code


void setup() {
 // Open serial communications and wait for port to open:
  Serial.begin(9600);
  Ethernet.begin(mac);
  
  Temperature.begin(A0);
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(4, OUTPUT);
}

void loop()
{
 if (client.available()) {
    char c = client.read();
    Serial.print(c);
  }

  // if there's no net connection, but there was one last time
  // through the loop, then stop the client:
  if (!client.connected() && lastConnected) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
  }

  // if you're not connected, and ten seconds have passed since
  // your last connection, then connect again and send data:
  if(!client.connected() && (millis() - lastConnectionTime > postingInterval)) {
    httpRequest();
  }
  // store the state of the connection for next time through
  // the loop:
  lastConnected = client.connected();
}

  
  
  void httpRequest() {
    // 
    
     float temperature = Temperature.getTemperatureCelcius();
     float tempF = temperature * 9/5 + 32;
     Serial.print("Temperature: ");
     Serial.println(tempF,1);

      
  // if there's a successful connection:
 if (client.connect(server, 80)) {
    Serial.println("connected");
    // Make a HTTP request:
    
    client.print("GET /input/roO0EXVg69sOVvKYgygZ?private_key=jk6ql1pYEKsEG9wyeYeA&temp=");
    client.print(tempF);
    client.println(" HTTP/1.1");
    client.println("Host: data.sparkfun.com");
    client.println("User-Agent: arduino-ethernet");
    client.println("Connection: close");
    client.println();

    // note the time that the connection was made:
    lastConnectionTime = millis();
  } 
  else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
    Serial.println("disconnecting.");
    client.stop();
  }
  
  delay(500);
  
  if(tempF <= 60){
     digitalWrite(13,LOW);
     digitalWrite(12,LOW); 
     digitalWrite(8,LOW); 
     digitalWrite(7,LOW); 
     digitalWrite(4,HIGH); 
  }
  
  else if(tempF <= 65){
     digitalWrite(13,LOW);
     digitalWrite(12,LOW); 
     digitalWrite(8,LOW); 
     digitalWrite(7,HIGH); 
     digitalWrite(4,HIGH); 
  }
  
  else if(tempF <= 70){
     digitalWrite(13,LOW);
     digitalWrite(12,LOW); 
     digitalWrite(8,HIGH); 
     digitalWrite(7,HIGH); 
     digitalWrite(4,HIGH); 
  }
  
  else if(tempF <= 75){
     digitalWrite(13,LOW);
     digitalWrite(12,HIGH); 
     digitalWrite(8,HIGH); 
     digitalWrite(7,HIGH); 
     digitalWrite(4,HIGH); 
  }
  
  else if(tempF <= 80){
     digitalWrite(13,HIGH);
     digitalWrite(12,HIGH); 
     digitalWrite(8,HIGH); 
     digitalWrite(7,HIGH); 
     digitalWrite(4,HIGH); 
  }
  
  }
  
  


