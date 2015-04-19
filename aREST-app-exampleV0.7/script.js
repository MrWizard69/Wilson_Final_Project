// Function to control LEDs
    $(function() {
    	$('.ledButton1').click(function() {
        	clicked_id = $(this).attr('pin-id');
        	state = $(this).attr('state');
        	new_state = state === '0'?1:0;
        	
        	$.get( "digicurl.php", {
        	pin: clicked_id, state: new_state} ); 
        	
        	$(this).attr('state',new_state);
        	
        	if (state === '0'){
        		$(this).text('On');
        	}
        	else{
        		$(this).text('Off');
        		//Slider(0);
        	}

    	});
	});
 

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
				if(data.variables.lightVal >= 1020 && new_state === 1)
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
	