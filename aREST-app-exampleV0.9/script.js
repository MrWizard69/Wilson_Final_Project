// Function to control LEDs
    $(function() {
    	$('.ledButton1').click(function() {
        	clicked_id = $(this).attr('pin-id');
        	state = $(this).attr('state');
        	lamp = $(this).attr('lamp');
        	new_state = state === '0'?1:0;
        	//console.log(lamp);
        	console.log(val);
        	$.get( "digicurl.php", {
        	pin: clicked_id, state: new_state} ); 
        	
        	$(this).attr('state',new_state);
        	
        	if (state === '0'){
        		$(this).text('On');
        	}
        	else{
        		$(this).text('Off');
        	}
        	
        	// if(lamp === '1' && new_state === 1){
//         		console.log('works');
//         	$.ajax({url:"http://192.168.2.3/", success: function(data){
//         	
// 				//console.log("light in room: " + data.variables.lightVal + " " + "lamp light: " + data.variables.lamp);
// 				//console.log("light difference: " + (data.variables.lamp - data.variables.lightVal));
// 				
// 				var roomLight = data.variables.lightVal;
// 				var lampLight = data.variables.lamp;
// 				
// 				//console.log(roomLight);
// 				console.log(lampLight);
// 				
// 			}, dataType: "json"});		
//         	}


			// if(lamp === '1' && new_state === 1){
// 			var poll = function(){
// 			setTimeout(function(){
// 				$.ajax({url:"http://192.168.2.3/", success: function(data){
// 				var lampLight = data.variables.lamp;
// 				var roomLight = lampLight + 4;
// 				var dimLight = lampLight - 4;
// 				console.log(lampLight);
// 				console.log(roomLight);
// 				if(lampLight === 1 && new_state === 1)
// 				{
// 					console.log(lampLight);
// 				}else {
// 					poll();
// 				}
// 				
// 			}, dataType: "json"});		
// 			}, 2000);
// 			}
// 			poll();
// 			}
// 

			//console.log(lightCheck);
     	});
	});
	
// $( document ).ready(function() {
//      console.log( "ready!" );
//      lightCheck();
//  });



// var lightCheck = function() {
// 
// 		state = $('.ledButton1').attr('state');
//         lamp = $('.ledButton1').attr('lamp');
//         new_state = state === '0'?1:0;
// 	
// 		if(lamp === '1' && new_state === 1){
//         		console.log('works');
//         	$.ajax({url:"http://192.168.2.3/", success: function(data){
// 				
// 				
// 				var val = data.variables.lamp;
// 				
// 
// 				
// 				console.log(val);
// 				
// 				return val;
// 				
// 			}, dataType: "json"});		
//         	}
// 	
// 		
// 	};

	



var val = null;
var lightCheck = function(){
	$.ajax({url:"http://192.168.2.3/", success: function(data){
				
	val = data.variables.lamp;
								
	}, dataType: "json"});	
			
	setTimeout(lightCheck, 2000);	      	
 }

lightCheck();
console.log(val);







 

// Control the brightness
function Slider(val){
	if ($('#points1').attr('value') >= val){
		$('#dim').attr('state', '0');
		$('#dim').text('Off');
		
		
	}
	else{
		$('#dim').attr('state', '1');
 		$('#dim').text('On');
	}
	
	$.get("anacurl.php",{
		pin: "9", state: val} );
}

// Prime the pins to receive power
$(function() {
    	$('.ledButton').click(function() {
        	clicked_id = $(this).attr('lit-id');
        	state = $(this).attr('state');
        	
        	$.get( "pinPrime.php", {
        	pin: clicked_id, state: state} ); 
        	
    	});
	});

// A function that will look into the server for motion
$(function() {
    	$('.motion').click(function() {
        	
        	state = $(this).attr('state');
        	new_state = state === '0'?1:0;
        	$(this).attr('state',new_state);
        	
        	if (state === '0'){
        		$(this).text('On');
        	}
        	else{
        		$(this).text('Off');
        	}
        	
        	var poll = function(){
			setTimeout(function(){
				$.ajax({url:"http://192.168.2.3/", success: function(data){
				if(data.variables.motion === 1 && new_state === 1)
				{
					for(var i = 7; i <= 9; i++)
					{
						$.get('http://192.168.2.3/digital/' + i +'/1');
						$('.ledButton1').attr('state', '1');
						$('.ledButton1').text('On');
						$('.motion').text('Off');
						$('.motion').attr('state', '0');
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
	
// A function that will look at the brightness of the room	
$(function() {
    	$('.light').click(function() {
        	
        	state = $(this).attr('state');
        	new_state = state === '0'?1:0;
        	$(this).attr('state',new_state);
        	
        	if (state === '0'){
        		$(this).text('On');
        	}
        	else{
        		$(this).text('Off');
        	}
        	
        	var poll = function(){
			setTimeout(function(){
				$.ajax({url:"http://192.168.2.3/", success: function(data){
				if(data.variables.lightVal >= 1010 && new_state === 1)
				{
					for(var i = 7; i <= 9; i++)
					{
						$.get('http://192.168.2.3/digital/' + i +'/1');
						$('.ledButton1').attr('state', '1');
						$('.ledButton1').text('On');
						$('.light').text('Off');
						$('.light').attr('state', '0');
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
	