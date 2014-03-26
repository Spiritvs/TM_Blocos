$(document).ready(function() {
	
	document.ontouchmove = function(e) {
          e.preventDefault();
	}
	
	
	function updateOrientation(){ 
	var temp = (window.innerHeight / 2) - 10;  
    var orientation=window.orientation;
    switch(orientation){
		case 0:
			document.getElementById("esquerda").setAttribute("style", "width:" + 100 + "%");
			document.getElementById("direita").setAttribute("style", "width:" + 100 + "%");
			document.getElementById("baixo").setAttribute("style", "width:" + 100 + "%");
			document.getElementById("cima").setAttribute("style", "width:" + 100 + "%");
			//alert("Portrait");
			break;  

        case 90:
			document.getElementById("esquerda").setAttribute("style", "height:" + temp + "px");
			document.getElementById("direita").setAttribute("style", "height:" + temp + "px");
			document.getElementById("baixo").setAttribute("style", "height:" + temp + "px");
			document.getElementById("cima").setAttribute("style", "height:" + temp + "px");
			//alert("Landscape 90");
			break;

        case -90:   
			document.getElementById("esquerda").setAttribute("style", "height:" + temp + "px");
			document.getElementById("direita").setAttribute("style", "height:" + temp + "px");
			document.getElementById("baixo").setAttribute("style", "height:" + temp + "px");
			document.getElementById("cima").setAttribute("style", "height:" + temp + "px");
			//alert("Landscape -90");
			break;
	}
}
	/*document.ontouchmove = function showContextMenu(e){
  		e.preventDefault();
  // code to show custom context menu
}*/
	//alert(window.innerHeight);
	
	//alert(window.innerWidth);
	//document.getElementById("myTable").
	var myID = -1, pX = -1, pY = -1, pCor = '';
	var socket = io.connect();
	socket.on('connect', function(data) {
		window.addEventListener('keydown', keyPressed, false);
		updateOrientation();
		window.onorientationchange=updateOrientation;
		
		$('myBody').on('contextmenu', 'img', function(e){ return false; });
		//$("#esquerda").bind( "tap", tapHandler );
		$('#esquerda').tap(function() {
			socket.emit('click', {
				"id" : myID,
				"code" : 65
			});
		});
		$('#baixo').tap(function() {
			socket.emit('click', {
				"id" : myID,
				"code" : 83
			});
		});
		$('#direita').tap(function() {
			socket.emit('click', {
				"id" : myID,
				"code" : 68
			});
		});
		$('#cima').tap(function() {
			socket.emit('click', {
				"id" : myID,
				"code" : 87
			});
		});
		/*document.getElementById('esquerda').onclick=function(){socket.emit('click', {"id" : myID,"code" : 65});};
		 document.getElementById('baixo').onclick=function(){socket.emit('click', {"id" : myID,"code" : 83});};
		 document.getElementById('direita').onclick=function(){socket.emit('click', {"id" : myID,"code" : 68});};
		 document.getElementById('cima').onclick=function(){socket.emit('click', {"id" : myID,"code" : 87});};*/
	});
	socket.emit('novoJogador');
	/*	$(document).bind("mobileinit", function(event) {
	 $.extend($.mobile.zoom, {
	 locked : true,
	 enabled : false
	 });
	 });*/
	function tapHandler(event) {
		alert("lol");
	}


	socket.on('logged', function(data) {
		myID = data.id;
		pX = data.x;
		pY = data.y;
		pCor = data.cor;
		document.getElementById("myBody").style.backgroundColor = pCor;
		//document.getElementById("myid").innerHTML = data;
	});

	function keyPressed(e) {
		//alert(e.keyCode);
		socket.emit('click', {
			"id" : myID,
			"code" : e.keyCode
		});
	}

	function tapSeta(code) {
		alert(code);
		socket.emit('click', {
			"id" : myID,
			"code" : code
		});
	}

});
