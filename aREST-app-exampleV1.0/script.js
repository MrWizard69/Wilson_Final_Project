// Function to control LEDs
    $(function() {
    	$('.ledButton1').click(function() { //when the button is clicked...
        	clicked_id = $(this).attr('pin-id'); //gets the pin-id from the html
        	state = $(this).attr('state'); //gets the state id from the html
        	lamp = $(this).attr('lamp');// gets the lamp attr. from the html
        	new_state = state === '0'?1:0;//whether the light is on or off
        	console.log('first lightVal ',lightVal);
        	$.get( "digicurl.php", {
        	pin: clicked_id, state: new_state} ); //gets the php to actually turn the lights on or off
        	
        	$(this).attr('state',new_state); //assigns the new state of the button
        	
        	if (state === '0'){
        		$(this).text('On');
        	}
        	else{
        		$(this).text('Off');
        	}

			/////////////////////////////////////////////
			//REAL TIME LIGHT CHECKS
			
			if(lamp === '1' && new_state != 0){ //if the light is looking for photo difference and the state is not off...
			var poll = function(){
			setTimeout(function(){
				$.ajax({url:"http://192.168.2.10/", success: function(data){ //go to the database
				var lampLight = data.variables.lamp; //gets the new light information
				
				worklight = (lightVal) - lampLight; // subtracts the light value from the moment the user clicks and compares it to the light value after a second
				console.log(worklight);
				console.log('lamplight ',lampLight);
				console.log('lightVal ',lightVal);
				console.log('lightVal - lamplight = ',worklight);
				console.log('worklight', worklight);
				if(new_state === 0){// if the state changes from on to off...
					console.log('light is off');
				}
				
				else if(worklight <= 30)// if the compared difference is less than or equal to 30...
				{
					console.log('light needs replacing');//replace the light
					$('#lamp').text('Replace(tap to re-sync)');//make the button change it's text
					new_state = 0; //cut the power to the light for easy re-syncing
					$.get( "digicurl.php", { // sends the new information to the light
        				pin: clicked_id, state: new_state} ); 
					
					
				}else {
					poll();
				}
				
			}, dataType: "json"});		
			}, 1000);
			}
			poll();
			}

     	});
	});



var lightVal = null; //a blank global variable to hold the light data from the moment the button was pressed
var worklight = null; //a blank global variable to hold the light data a second after the button was pressed


var lightCheck = function(){// gets the light data before the button was pressed
	$.ajax({url:"http://192.168.2.10/", success: function(data){
				
	lightVal = data.variables.lamp; //assign the new light value
								
	}, dataType: "json"});	
			      	
 }

lightCheck();//get that light data!




// Control the brightness of a light and updates the on/off button of it's state
function Slider(val){
	if ($('#points1').attr('value') >= val){ //the slide bar has not moved?
		$('#dim').attr('state', '0'); //the light must be off
		$('#dim').text('Off'); //tell the button
		
		
	}
	else{
		$('#dim').attr('state', '1'); //the light must be dimmed or fully on
 		$('#dim').text('On'); //tell the button
	}
	
	$.get("anacurl.php",{ //sends the information to the arduino to update the light brightness
		pin: "9", state: val} );
}

// Prime the pins to receive power
$(function() {
    	$('.ledButton').click(function() { //when the button is clicked
        	clicked_id = $(this).attr('lit-id'); //pin points the button that was pressed
        	state = $(this).attr('state'); // get the state of the button
        	
        	$.get( "pinPrime.php", {
        	pin: clicked_id, state: state} ); //sends the lit-id and the state to the arduino to prime the right pins to receive power 
        	
    	});
	});

// A function that will look into the server for motion
$(function() {
    	$('.motion').click(function() { //when the button is clicked...
        	
        	state = $(this).attr('state'); //gets whether the light is on or off
        	new_state = state === '0'?1:0; //checks to see if it's on or off
        	$(this).attr('state',new_state); //assigns the new state of the button
        	
        	if (state === '0'){
        		$(this).text('On'); //the button has been pressed
        	}
        	else{
        		$(this).text('Off'); //nope
        	}
        	
        	var poll = function(){ //this function will look into the server every 3 sec. to see if there is motion
			setTimeout(function(){
				$.ajax({url:"http://192.168.2.10/", success: function(data){ //if the connection to the server is successful...
				if(data.variables.motion === 1 && new_state === 1) //see if motion has been detected and that the button is on
				{ //if there is motion, target all the lights and turn them all on
					for(var i = 7; i <= 9; i++)
					{
						$.get('http://192.168.2.10/digital/' + i +'/1'); //this is what tells the arduino what to do with the lights
						$('.ledButton1').attr('state', '1');
						$('.ledButton1').text('On');
						$('.motion').text('Off'); // turns off the button that looks for motion
						$('.motion').attr('state', '0'); //switches it's state to off
					}
				}else {
					poll();
				}
				
			}, dataType: "json"});		
			}, 3000);
			}
			poll();
        	
    	});
	});
	
// A function that will look at the brightness of the room AKA power saver	
$(function() {
    	$('.light').click(function() { //when the button is clicked...
        	
        	state = $(this).attr('state'); //gets the state of the button
        	new_state = state === '0'?1:0; //if it's on or off...
        	$(this).attr('state',new_state); //get the new state
        	
        	if (state === '0'){ //if it's on
        		$(this).text('On');
        	}
        	else{
        		$(this).text('Off'); // if it's off
        	}
        	
        	//once this button has been pressed, every 3 sec. the client will check the server to see if the light is too dim to see
        	var poll = function(){
			setTimeout(function(){
				$.ajax({url:"http://192.168.2.10/", success: function(data){ //if a connection to the server is successful
				if(data.variables.lightVal >= 1010 && new_state === 1) //checks to see if the light level is too dim and that the button is on
				{
					for(var i = 7; i <= 9; i++) //goes through all the lights and turns them all on
					{
						$.get('http://192.168.2.10/digital/' + i +'/1');
						$('.ledButton1').attr('state', '1');
						$('.ledButton1').text('On');
						$('.light').text('Off');// turns off the button to check for the light of the room
						$('.light').attr('state', '0'); //switches it's state to off
					}
				}else {
					poll();
				}
				
			}, dataType: "json"});		
			}, 3000);
			}
			poll();

    	});
	});
	

////////////////////////////////////////
//TIMER FUNCTION
//
// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);
// 
//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;
// 
//         display.textContent = minutes + ":" + seconds;
// 
//         if (--timer < 0) {
//             timer = duration;
//         }
//     }, 1000);
// }
// 
// window.onload = function () {
// 	var hours = 60 * 60;
//     var display = document.querySelector('#hours');
//     var minutes = 60 * 1;
//     var display1 = document.querySelector('#minutes');
//     startTimer(minutes, display1);
//     startTimer(hours, display);
// };
	