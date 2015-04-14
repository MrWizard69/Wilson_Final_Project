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
        	}

    	});
	});
	
	$(function() {
    	$('.ledButton').click(function() {
        	$(this).attr('id', '1');
        	$(this).attr('class', 'ledButton1');
    	});
	});
 

// Control the brightness
function Slider(val){
	if (val == val){
		$.get("anacurl.php",{
		pin: "9", state: val} );
	}
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