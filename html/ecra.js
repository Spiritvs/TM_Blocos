$(document).ready(function() {
	var xMax = 32;
	var yMax = 24;
	var larg = 25;
	var aTestar = 0;
	var f = new Array();
	var boxes = new Array();
	var figuras = new Array();
	init();
	geraArray();
	timer();
	
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	var mc = document.getElementById("canvasFigura");
	var mctx = mc.getContext("2d");

	var tempo = 10;
	var nJogadores = 0;
	var counter = setInterval(timer, 1000);	//1000 will  run it every 1 second
	
	var socket = io.connect();

	/*var dois0 = {"figura":[{x:0,y:0},{x:2,y:0}]};
	var dois1 = {"figura":[{x:0,y:0},{x:1,y:0}]};
	var dois2 = {"figura":[{x:0,y:0},{x:0,y:1}]};
	var dois3 = {"figura":[{x:0,y:0},{x:1,y:1}]};
	var dois4 = {"figura":[{x:0,y:0},{x:0,y:2}]};
	
	var tres0 = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2}]};
	var tres1 = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2}]};
	var tres2 = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0}]};
	var tres3 = {"figura":[{x:0,y:0},{x:1,y:1},{x:0,y:2}]};
	var tres4 = {"figura":[{x:0,y:0},{x:0,y:2},{x:2,y:2}]};
	
	var quatro0 = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}]};
	var quatro1 = {"figura":[{x:0,y:0},{x:2,y:0},{x:0,y:2},{x:2,y:2}]};
	var quatro2 = {"figura":[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:2,y:1}]};
	var quatro3 = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:0},{x:3,y:1}]};
	var quatro4 = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2}]};
	
	var cinco0 = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:0,y:2},{x:2,y:0}]};
	var cinco1 = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:1}]};
	var cinco2 = {"figura":[{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:0},{x:2,y:1}]};
	var cinco3 = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0}]};
	var cinco4 = {"figura":[{x:0,y:1},{x:1,y:0},{x:1,y:2},{x:1,y:3},{x:2,y:1}]}; */
	
	function init(){
	for (var x = 2; x < 6; x++) {
			figuras[x] = new Array();
			for (var y = 0; y < 5; y++) {
				figuras[x][y] = 0;
			}
		}
	figuras[2][0] = {"figura":[{x:0,y:0},{x:2,y:0}]};
	figuras[2][1] = {"figura":[{x:0,y:0},{x:1,y:0}]};
	figuras[2][2]= {"figura":[{x:0,y:0},{x:0,y:1}]};
	figuras[2][3] = {"figura":[{x:0,y:0},{x:1,y:1}]};
	figuras[2][4] = {"figura":[{x:0,y:0},{x:0,y:2}]};
	
	figuras[3][0] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2}]};
	figuras[3][1] = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2}]};
	figuras[3][2] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0}]};
	figuras[3][3] = {"figura":[{x:0,y:0},{x:1,y:1},{x:0,y:2}]};
	figuras[3][4] = {"figura":[{x:0,y:0},{x:0,y:2},{x:2,y:2}]};
	
	figuras[4][0] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}]};
	figuras[4][1] = {"figura":[{x:0,y:0},{x:2,y:0},{x:0,y:2},{x:2,y:2}]};
	figuras[4][2] = {"figura":[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:2,y:1}]};
	figuras[4][3] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:0},{x:3,y:1}]};
	figuras[4][4] = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2}]};
	
	figuras[5][0] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:0,y:2},{x:2,y:0}]};
	figuras[5][1] = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:1}]};
	figuras[5][2] = {"figura":[{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:0},{x:2,y:1}]};
	figuras[5][3] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0}]};
	figuras[5][4] = {"figura":[{x:0,y:1},{x:1,y:0},{x:1,y:2},{x:1,y:3},{x:2,y:1}]};
	};
	
	function timer() {
		if(tempo == 10){
			mc.width = mc.width;
			aTestar = Math.floor((Math.random()*5));
			if (nJogadores < 2) {nJogadores=2;};
			if (nJogadores > 5) {nJogadores=5;};
			desenhaFigura(figuras[nJogadores][aTestar]);
		}
		tempo--;
		if (tempo <= 0) {
			//clearInterval(counter);
			if (nJogadores < 2) {nJogadores=2;};
			if (nJogadores > 5) {nJogadores=5;};
			if (testaFigura(figuras[nJogadores][aTestar])) {
				alert("ok");
			} else {
				//alert("ko");
			}
			tempo = 10;
			//counter = setInterval(timer, 1000);
			//counter ended, do something here
			//return;
		}
		//Do code for showing the number of seconds here
		document.getElementById("txt").innerHTML = tempo + " secs";
	}


	function desenhaFigura(fig) {
		for (var j = 0; j < fig.figura.length; j++) {
			var x = fig.figura[j].x * larg;
			var y = fig.figura[j].y * larg;
			mctx.fillStyle = "orange";
			mctx.fillRect(x, y, larg, larg);
			mctx.strokeStyle = "black";
			mctx.lineWidth = 1;
			mctx.strokeRect(x, y, larg, larg);
		}
	}

	function geraArray() {
		for (var x = 0; x < xMax; x++) {
			f[x] = new Array();
			for (var y = 0; y < yMax; y++) {
				f[x][y] = 0;
			}
		}
	}

	socket.on('desenha', function(dados) {
		while (f[dados.x][dados.y] == 1) {
			dados.x++;
		}
		var rect = new Box(dados.id, dados.x, dados.y, larg, larg, dados.cor);
		boxes.push(rect);
		geraQuad(dados.x, dados.y, larg, larg, dados.cor);
	});


	socket.on('count', function(data) {
		nJogadores = data.count;
		document.getElementById("contador").innerHTML = data.count;
	}); 


	function Box(id, x, y, w, h, fill) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.fill = fill;
	}

	function geraQuad(x, y, w, h, fill) {
		f[x][y] = 1;
		x = x * larg;
		y = y * larg;
		ctx.fillStyle = fill;
		ctx.fillRect(x, y, w, h);
		//document.getElementById('txt').innerHTML = JSON.stringify(f);
	};

	function clearCanvas(x, y, w, h) {
		f[x][y] = 0;
		//c.width = c.width;
		x = x * larg;
		y = y * larg;
		ctx.clearRect(x, y, larg, larg);
	}
	
	function testaFigura(fig) {
		//debugger;
		// figura conseguida
		var testaf = false;
		
		// para cada jogador
		for(var i=0; i < boxes.length; i++) {
			// testa figura iniciada no jogador corrente
			var testaj = true;
			
			var cp = boxes[i];
			
			for(var j=1; j<fig.figura.length; j++) {
				if (f[fig.figura[j].x+cp.x][fig.figura[j].y+cp.y] == 0) {
					testaj = false;
					break;
				}
			}
			if (testaj == true) {
				testaf = true;
				break;
			}
		}
		return testaf;
	}


	socket.on('dados', function(msg) {
		var aux = 0;
		for (var x = 0 in boxes) {
			if (msg.id == boxes[x].id) {
				aux = x;
			}
		}
		//alert(boxes[msg.id].x);
		clearCanvas(boxes[aux].x, boxes[aux].y, boxes[aux].w, boxes[aux].h);
		switch(msg.comando) {
			case"up":
				if (boxes[aux].y > 0) {
					if (f[boxes[aux].x][boxes[aux].y - 1] == 0) {
						boxes[aux].y--;
					}
				}
				break;
			case"left":
				if (boxes[aux].x > 0) {
					if (f[boxes[aux].x - 1][boxes[aux].y] == 0) {
						boxes[aux].x--;
					}
				}
				break;
			case"down":
				if (boxes[aux].y < yMax) {
					if (f[boxes[aux].x][boxes[aux].y + 1] == 0) {
						boxes[aux].y++;
					}
				}
				break;
			case"right":
				if (boxes[aux].x < xMax - 1) {
					if (f[boxes[aux].x + 1][boxes[aux].y] == 0) {
						boxes[aux].x++;
					}
				}
				break;
		}
		geraQuad(boxes[aux].x, boxes[aux].y, boxes[aux].w, boxes[aux].h, boxes[aux].fill);
	});
});

