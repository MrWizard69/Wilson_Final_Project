/* 
  This is an example of the aREST Library for Arduino (Uno/Mega/Due/Teensy)
  using the Ethernet library (for example to be used with the Ethernet shield). 
 
  aREST Library- Written in 2014 by Marco Schwartz under a GPL license.
 Smarthome Prototype- Written in 2015 by Jordan Wilson. 
*/

//////////////////////////////
//aREST Library

// Libraries
#include <SPI.h>
#include <Ethernet.h>
#include <aREST.h>
#include <avr/wdt.h>

// Enter a MAC address for your controller below.
byte mac[] = { 0x90, 0xA2, 0xDA, 0x0F, 0x59, 0x6B };

// IP address in case DHCP fails
IPAddress ip(192,168,2,2);

// Ethernet server
EthernetServer server(80);

// Create aREST instance
aREST rest = aREST();

// Variables to be exposed to the API
int motion;
int lightValue;
int lampLight;
/////////////////////////////
//END aREST LIBRARY VARS

/////////////////////////////
//MOTON SENSOR VARS
//the time we give the sensor to calibrate (10-60 secs according to the datasheet)
int calibrationTime = 30;        

//the time when the sensor outputs a low impulse
long unsigned int lowIn;         

//the amount of milliseconds the sensor has to be low 
//before we assume all motion has stopped
long unsigned int pause = 5000;  

boolean lockLow = true;
boolean takeLowTime;  

int pirPin = 5;    //the digital pin connected to the PIR sensor's output
/////////////////////////////
//END MOTION SENSOR VARS

///////////////////////////
//Light Detect Vars


// variable to calibrate low value
int lightLow = 1023;
// variable to calibrate high value
int lightHigh = 0;



//////////End Light Detect Vars////////////////





void setup(void)
{  
  // Start Serial
  Serial.begin(9600);
  
  
 /////////////////////////////
//MOTION SENSOR SETUP

  pinMode(pirPin, INPUT);
  digitalWrite(pirPin, LOW);

  //give the sensor some time to calibrate
  Serial.print("calibrating sensor ");
    for(int i = 0; i < calibrationTime; i++){
      Serial.print(".");
      delay(1000);
      }
    Serial.println(" done");
    Serial.println("SENSOR ACTIVE");
    delay(50);
  
  ///////////END MOTION SENSOR SETUP///////////
  
  
  ////////////////////////////////
  //LIGHT DETECTION SETUP
  
  
  // calibrate for the first five seconds after program runs
  while (millis() < 5000) {
    // record the maximum sensor value
    
    lightValue = analogRead(A0);
    if (lightValue > lightHigh) {
      lightHigh = lightValue;
    }
    // record the minimum sensor value
    if (lightValue < lightLow) {
      lightLow = lightValue;
    }
  }

  Serial.println("Done Checking Lights...");
  delay(2000);
  
  
  //////////END LIGHT DETECTION SETUP////////////////
  
  
  /////////////////////////////////////
  //aREST LIBRARY SETUP
  
  // Init variables and expose them to REST API
  motion = 0;
  lampLight = 0;
  
  
  rest.variable("motion",&motion);
  rest.variable("lightVal",&lightValue);
  rest.variable("lamp",&lampLight);
 
 
 

  // Function to be exposed
  //rest.function("led",ledControl);
  
  // Give name and ID to device
  rest.set_id("007");
  rest.set_name("MrWizard69");

  // Start the Ethernet connection and the server
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // no point in carrying on, so do nothing forevermore:
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  }
  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());

  // Start watchdog
  wdt_enable(WDTO_4S);
}

//////////////END aREST LIBRARY SETUP//////////////////

void loop() {  
  
  // listen for incoming clients
  EthernetClient client = server.available();
  rest.handle(client);
  wdt_reset();
  
  
  ////////////////////////////
//MOTION SENSOR LOOP

  if(digitalRead(pirPin) == HIGH){
       if(lockLow){  
         //makes sure we wait for a transition to LOW before any further output is made:
         lockLow = false;            
         Serial.println("---");
         Serial.print("motion detected at ");
         Serial.print(millis()/1000);
         Serial.println(" sec");
         motion = 1; // sees motion
         delay(50);
         }         
         takeLowTime = true;
       }

     if(digitalRead(pirPin) == LOW){       
       if(takeLowTime){
        lowIn = millis();          //save the time of the transition from high to LOW
        takeLowTime = false;       //make sure this is only done at the start of a LOW phase
        }
       //if the sensor is low for more than the given pause, 
       //we assume that no more motion is going to happen
       if(!lockLow && millis() - lowIn > pause){  
           //makes sure this block of code is only executed again after 
           //a new motion sequence has been detected
           lockLow = true;                        
           Serial.print("motion ended at ");      //output
           Serial.print((millis() - pause)/1000); //wait for it...
           Serial.println(" sec");
           motion = 0;//motion has stopped
           delay(50);
           }
       }
  ///////////////////////
  //LIGHT DETECTION LOOP
  
   //read the input from A0 and store it in a variable
  lightValue = analogRead(A0);
  lampLight = analogRead(A1);

  // Shows the light value/intensity
  //Serial.println(sensorValue);

  // wait for a moment
  delay(10);
  
  
  
}

// Custom function accessible by the API
int ledControl(String command) {
  
  // Get state from command
  int state = command.toInt();
  
  digitalWrite(6,state);
  return 1;
}
