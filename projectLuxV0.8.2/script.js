// Function to control LEDs
    $(function() {
    	$('.ledButton1').click(function() { //when the button is clicked...
    		$('#lamp').css("background-color", "white");
    		$('#lamp').css("color", "black");
        	clicked_id = $(this).attr('pin-id'); //gets the pin-id from the html
        	state = $(this).attr('state'); //gets the state id from the html
        	lamp = $(this).attr('lamp');// gets the lamp attr. from the html
        	new_state = state === '0'?1:0;//whether the light is on or off
        	console.log('first lightVal ',lightVal);
        	$.get( "digicurl.php", {
        	pin: clicked_id, state: new_state} ); //gets the php to actually turn the lights on or off
        	
        	$(this).attr('state',new_state); //assigns the new state of the button
        	
        	if (state === '0'){
        		$(this).text('Light On');
        	}
        	else{
        		$(this).text('Light Off');
        	}

			/////////////////////////////////////////////
			//REAL TIME LIGHT CHECKS
			if(lamp === '1' && new_state != 0){ //if the light is looking for photo difference and the state is not off...
			var poll = function(){
			setTimeout(function(){
				$.ajax({url:"http://192.168.2.46/", success: function(data){ //go to the database
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
					$('#lamp').css("background-color", "Tomato");
					$('#lamp').css("color", "white");
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
var logged = false;

var lochash = null;
var loc = null;
var roomP = window.location.origin + "/#rooms";
var brightP = window.location.origin + "/#bright";
var livroomP = window.location.origin + "/#livroomlight";
var bedroomP = window.location.origin + "/#bedroomlight";
var dinroomP = window.location.origin + "/#dinroomlight";

//console.log(logged);

function logcheck(){
	
	lochash = window.location.hash;
	loc = window.location.origin + "/" + lochash;
	console.log(loc);
	
	
	if (logged == false && loc == roomP){
		
    	window.location.href = window.location.origin + "/#login";
    	console.log("you need to login!");
    }
    else if(logged === true && loc == roomP){
    		
    	 window.location.origin + "/#rooms";
    		
    }
    
    if (logged == false && loc == brightP){
		
    	window.location.href = window.location.origin + "/#login";
    	console.log("you need to login!");
    }
    else if(logged === true && loc == brightP){
    		
    	 window.location.origin + "/#bright";
    		
    }
    
    if (logged == false && loc == livroomP){
		
    	window.location.href = window.location.origin + "/#login";
    	console.log("you need to login!");
    }
    else if(logged === true && loc == livroomP){
    		
    	 window.location.origin + "/#livroomlight";
    		
    }
    
    if (logged == false && loc == bedroomP){
		
    	window.location.href = window.location.origin + "/#login";
    	console.log("you need to login!");
    }
    else if(logged === true && loc == bedroomP){
    		
    	 window.location.origin + "/#bedroomlight";
    		
    }
    
    if (logged == false && loc == dinroomP){
		
    	window.location.href = window.location.origin + "/#login";
    	console.log("you need to login!");
    }
    else if(logged === true && loc == dinroomP){
    		
    	 window.location.origin + "/#dinroomlight";
    		
    }
	
}

var checked = setInterval(function(){
	logcheck()
},1000);


var lightCheck = function(){// gets the light data before the button was pressed
	$.ajax({url:"http://192.168.2.46/", success: function(data){
				
	lightVal = data.variables.lamp; //assign the new light value
								
	}, dataType: "json"});	
			      	
 }

lightCheck();//get that light data!



//////////////////////////////////////////////////////////////////////////////
//REGISTER FUNCTION 
$(function() {
		$('#regitrue').hide();
		$('#regiErr').hide();
    	$('#regiBtn').click(function() { //when the button is clicked...
        	
        	var username = $("#username").val();
        	var prodid = $("#prodid").val();
        	var pass = $("#password").val();
        	
        	
			$.ajax({url:"http://192.168.2.46/", success: function(data){
			console.log(data.name);
        	
			if(data.id === prodid) 
				{ 
					
					url = "http://192.168.2.46/username?params=" + username;
					
					$.ajax({url:url, success: function(data){
						console.log(data);
					}
    				});
    				
    				url = "http://192.168.2.46/password?params=" + pass;
					
					$.ajax({url:url, success: function(data1){
						console.log(data1);
					}
    				});
					
					window.location.href = window.location.origin + "/#login";
					$("#username").val('');
					$("#prodid").val('');
					$("#password").val('');
					$('#regiErr').hide();
        			$('#logErr').hide();
        			$('#regitrue').show();
					console.log("success!");
					//console.log(data.name);
				}else{
        			console.log("Try registering again...");
        			$('#regiErr').show();
        			//$('#regiErr').hide(2500);
        			
        		}			
				
				
				
			}, dataType: "json"});		
        	}
        		
     	);
	});



//////////////////////////////////////////////////////////////////////////////
//LOGIN FUNCTION 
$(function login() {
		$('#logErr').hide();
    	$('#logBtn').on("click",function() { //when the button is clicked...
        	
        	 var username = $("#loguser").val();
         	 var pass = $("#pass").val();
	    	 logged = true;
 			 window.location.href = window.location.origin + "/#rooms";
        	
			$.ajax({url:'http://192.168.2.46/', success: function(data){
			
			
			//console.log(data.name);
			if(data.id === pass && data.name === username) 
				{ 
					
					logged = true;
					window.location.href = window.location.origin + "/#rooms";
					$("#loguser").val('');
					$("#pass").val('');
					$('#regiErr').hide();
        			$('#logErr').hide();
        			$('#regitrue').hide();
					console.log("success!");
					console.log(logged);
				}else{
        			console.log("Try logging in again...");
        			$('#logErr').show();
        			//$('#logErr').hide(2500);
        			
        			
        		}			
				
				
				
			}, dataType: "json"});
		
        	}
        		
     	);
	});
	
//////////////////////////////////////////////////////////////////////////////
//MOBILE LOGIN FUNCTION 
// $(function() {
//     	$('#logBtn').on("tap",function() { //when the button is clicked...
//         	
//         	 var username = $("#loguser").val();
//          	 var pass = $("#pass").val();
//          	 console.log("button pressed");
//          	 
//          	 $.get( "login.php", {
//         	user: username, password: pass} );
//     	
//         	
//         	
// 		
//         	}
//         		
//      	);
// 	});

	
	
	
////////////////////////////////////////////////////////////////////////////////////
//LOGOUT FUNCTION 
$(function() {
    	$('.logout').click(function() { //when the button is clicked...
        	
        	logged = false;
			window.location.href = window.location.origin + "/#login";
			console.log("success!");
			console.log(logged);
		})
	});
	
	
	
////////////////////////////////////////////////////////////////////////////////////
//PAGE NAVI BUTTON FUNCTION 
$(function() {
    	$('.rpg').click(function() { //when the button is clicked...
        	
        	if(logged == true){
        		$("#username").val('');
				$("#prodid").val('');
				$("#password").val('');
        		$("#loguser").val('');
				$("#pass").val('');
        		$('#regiErr').hide();
        		$('#logErr').hide();
        		$('#regitrue').hide();
        		window.location.href = window.location.origin + "/#rooms";
        	}
        	else{
        		
        		$("#username").val('');
				$("#prodid").val('');
				$("#password").val('');
        		$("#loguser").val('');
				$("#pass").val('');
        		$('#regiErr').hide();
        		$('#logErr').hide();
        		$('#regitrue').hide();
        		window.location.href = window.location.origin + "/#login";
        		$('#logErr').show();
        	}
		});
		
		
		$('.welc').click(function() { //when the button is clicked...
        	
        	
        	$("#username").val('');
			$("#prodid").val('');
			$("#password").val('');
        	$("#loguser").val('');
			$("#pass").val('');
        	$('#regiErr').hide();
        	$('#logErr').hide();
        	$('#regitrue').hide();
        	window.location.href = window.location.origin + "/#welcome";
		});
		
		$('.log').click(function() { //when the button is clicked...
        	
        	$("#username").val('');
			$("#prodid").val('');
			$("#password").val('');
        	$("#loguser").val('');
			$("#pass").val('');
        	$('#regiErr').hide();
        	$('#logErr').hide();
        	$('#regitrue').hide();
        	window.location.href = window.location.origin + "/#login";
		});
		
		
		$('.regi').click(function() { //when the button is clicked...
        	
        	$("#username").val('');
			$("#prodid").val('');
			$("#password").val('');
        	$("#loguser").val('');
			$("#pass").val('');
        	$('#regiErr').hide();
        	$('#logErr').hide();
        	$('#regitrue').hide();
        	window.location.href = window.location.origin + "/#regi";
		});
		
		$('#dright').click(function() { //when the button is clicked...
        	
        	$('#regiErr').hide();
        	$('#logErr').hide();
        	$('#regitrue').hide();
        	window.location.href = window.location.origin + "/#bright";
		});
		
		$('.bck').click(function() { //when the button is clicked...
        	
        	$('#regiErr').hide();
        	$('#logErr').hide();
        	$('#regitrue').hide();
        	window.location.href = window.location.origin + "/#rooms";
		});
		
		$('#dBck').click(function() { //when the button is clicked...
        	
        	$('#regiErr').hide();
        	$('#logErr').hide();
        	$('#regitrue').hide();
        	window.location.href = window.location.origin + "/#dinroomlight";
		});
		
		$('#livroom').click(function() { //when the button is clicked...
        	
        	$('#regiErr').hide();
        	$('#logErr').hide();
        	$('#regitrue').hide();
        	window.location.href = window.location.origin + "/#livroomlight";
		});
		$('#bedroom').click(function() { //when the button is clicked...
        	
        	$('#regiErr').hide();
        	$('#logErr').hide();
        	$('#regitrue').hide();
        	window.location.href = window.location.origin + "/#bedroomlight";
		});
		$('#dineroom').click(function() { //when the button is clicked...
        	
        	$('#regiErr').hide();
        	$('#logErr').hide();
        	$('#regitrue').hide();
        	window.location.href = window.location.origin + "/#dinroomlight";
		});
		
	});

	
	
////////////////////////////////////////////////////////////////////////////////////
//ADD NEW ROOMS BUTTON FUNCTION 
$(function() {
		$("#lamp").hide();
		$("#lit2").hide();
		$("#dim").hide();
		//$("#lroom").hide();
		//$("#broom").hide();
		//$("#droom").hide();
		$("#dright").hide();
		$(".motion").hide();
		$(".light").hide();
		$("#pbreak1").hide();
		$("#pbreak2").hide();
		$("#pbreak3").hide();
		$("#livroom").hide();
		$("#bedroom").hide();
		$("#dineroom").hide();
		
    	$('#setRoom1').click(function() { //when the button is clicked...
        	
        	console.log("Room1 added");
        	$("#setRoom1").hide();
        	$("#livroom").show();
        	$("#lit2").show();
        	//$("#lroom").show();
        	$(".light").show();
        	$("#pbreak2").show();
        
		});
		
		$('#setRoom2').click(function() { //when the button is clicked...
        	
        	console.log("Room2 added");
        	$("#setRoom2").hide();
        	$("#bedroom").show();
        	$("#lamp").show();
        	//$("#broom").show();
        	$(".motion").show();
        	$("#pbreak1").show();
        
		});
		
		$('#setRoom3').click(function() { //when the button is clicked...
        	
        	console.log("Room3 added");
        	$("#setRoom3").hide();
        	$("#dineroom").show();
        	$("#dim").show();
        	//$("#droom").show();
        	$("#dright").show();
        	$("#pbreak3").show();
        
		});
		
		
	});
	
	
	
// Control the brightness of a light and updates the on/off button of it's state
function Slider(val){
	if ($('#points1').attr('value') >= val){ //the slide bar has not moved?
		$('#dim').attr('state', '0'); //the light must be off
		$('#dim').text('Light Off'); //tell the button
		
		
	}
	else{
		$('#dim').attr('state', '1'); //the light must be dimmed or fully on
 		$('#dim').text('Light On'); //tell the button
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
        	
        	state = $(this).attr('state'); //gets whether the button is on or off
        	clicked_id = $(this).attr('l-id'); //gets the pin-id from the html
        	
        	new_state = state === '0'?1:0; //checks to see if it's on or off
        	$(this).attr('state',new_state); //assigns the new state of the button
        	
        	if (state === '0'){
        		$(this).text('Motion Detection On'); //the button has been pressed
        	}
        	else{
        		$(this).text('Motion Detection Off'); //nope
        	}
        	
        	var poll = function(){ //this function will look into the server every 3 sec. to see if there is motion
			setTimeout(function(){
				$.ajax({url:"http://192.168.2.46/", success: function(data){ //if the connection to the server is successful...
				
				if(data.variables.motion === 1 && new_state === 1) //see if motion has been detected and that the button is on
				{ //if there is motion, target the light and turn it on
					$.get( "digicurl.php", {
        				pin: clicked_id, state: new_state} ); //gets the php to actually turn the lights on or off
        			$('#motionb').attr('state', '1');
        			$('#lamp').attr('state', '1');
					$('#lamp').text('Light On');
					$('.motion').text('Motion Detection Off'); // turns off the button that looks for motion
					$('.motion').attr('state', '0'); //switches it's state to off
					
					
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
        	clicked_id = $(this).attr('l-id'); //gets the pin-id from the html
        	new_state = state === '0'?1:0; //if it's on or off...
        	$(this).attr('state',new_state); //get the new state
        	
        	if (state === '0'){ //if it's on
        		$(this).text('Power Saver On');
        	}
        	else{
        		$(this).text('Power Saver Off'); // if it's off
        	}
        	
        	//once this button has been pressed, every 3 sec. the client will check the server to see if the light is too dim to see
        	var poll = function(){
			setTimeout(function(){
				$.ajax({url:"http://192.168.2.46/", success: function(data){ //if a connection to the server is successful
				if(data.variables.lightVal >= 1000 && new_state === 1) //checks to see if the light level is too dim and that the button is on
				{
					
					$.get( "digicurl.php", {
        				pin: clicked_id, state: new_state} ); //gets the php to actually turn the lights on or off
					$('#lit2').attr('state', '1');
					$('#lit2').text('Light On');
					$('#litb').text('Power Saver Off');// turns off the button to check for the light of the room
					$('#litb').attr('state', '0'); //switches it's state to off
				
				}else {
					poll();
				}
				
			}, dataType: "json"});		
			}, 3000);
			}
			poll();

    	});
	});