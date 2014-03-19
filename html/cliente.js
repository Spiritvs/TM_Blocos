$(document).ready(function() {
	var myID = -1, pX = -1, pY = -1;
	var socket = io.connect();
	
	socket.on('connect', function(data) {
		window.addEventListener('keydown',keyPressed,false);
	});

	socket.on('logged', function(data) {
		myID = data.id;
		pX = data.x;
		pY = data.y;
		document.getElementById("myid").innerHTML = data;
	});

	function keyPressed(e) {
		socket.emit('click', {"id" : myID,"code" : e.keyCode});
	}
});

