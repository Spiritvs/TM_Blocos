$(document).ready(function() {
	var myID = -1;
	var pX = -1;
	var pY = -1;
	var socket = io.connect();

	console.log("A Conectar...");

	socket.on("connect", function(data) {
		$(document).keydown(keyPressed);
	});

	socket.on('logged', function(data) {
		myID = data.id;
		pX = data.x;
		pY = data.y;
		$("#myid").html(myID);
	});




	function keyPressed(e) {
		socket.emit('click', {
			"id" : myID,
			"code" : e.keyCode
		});
	}

});

