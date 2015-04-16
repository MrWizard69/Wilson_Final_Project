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
	
	
// $(function() {
//     	$('.motion').click(function() {
//         	//clicked_id = $(this).attr('lit-id');
//         	//state = $(this).attr('state');
//         	
//         	
//         	// $.ajax({
// 			//   dataType: "json",
// 			//   url: 'http://192.168.2.3/',
// 			//   data: data,
// 			//   success: success
// 			// });
//         	
//         	
//         	//$.get( "pinPrime.php", {
//         	//pin: clicked_id, state: state} ); 
//         	
// 
//     	});
// 	});


$(function() {
    	$('.motion').click(function() {
        	//clicked_id = $(this).attr('lit-id');
        	//state = $(this).attr('state');
        	
        	state = $(this).attr('state');
        	$(this).text('On');
        	
        	
        	
        	console.l
        	var poll = function(){
			setTimeout(function(){
				$.ajax({url:"http://192.168.2.3/", success: function(data){
				console.log(data.variables.motion);
				if(data.variables.motion === 1)
				{
					for(var i = 7; i <= 9; i++)
					{
						$.get('http://192.168.2.3/digital/' + i +'/1');
						console.log($('.ledButton1'));
						$('.ledButton1').attr('state', '1');
						$('.ledButton1').text('On');
						$('.motion').text('Off');
        	
        				
					}
				}else {
					poll();
				}
				
			}, dataType: "json"});		
			}, 5000);
			}
			poll();
        	
        	
        	//$.get( "motionDetect.php", {
        	//pin: clicked_id, state: state} ); 
        	

    	});
	});
	
	

// var poll = function(){
// 	setTimeout(function(){
// 		$.ajax({url:"http://192.168.2.3/", success: function(data){
// 			chat.addMsg(data.value);
// 			poll();
// 		}, dataType: "json"});		
// 	}, 30000);
// }
// poll();
	
	