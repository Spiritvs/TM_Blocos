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

	var tempo = 15;
	var nJogadores = 0;
	var auxJogadores = 0;
	var pontos = 0;
	var counter = setInterval(timer, 1000);	//1 em 1 segundo
	
	var update = setInterval(updateCheck, 10000);
	
	var socket = io.connect();

	function init(){
	for (var x = 2; x < 10; x++) {
			figuras[x] = new Array();
			for (var y = 0; y < 10; y++) {
				figuras[x][y] = 0;
			}
		}
	figuras[2][0] = {"figura":[{x:0,y:0},{x:1,y:1}],"offset":{"x":1.5,"y":1.5}}; 
	figuras[2][1] = {"figura":[{x:0,y:0},{x:2,y:0}],"offset":{"x":1,"y":2}}; 
	figuras[2][2] = {"figura":[{x:0,y:0},{x:0,y:1}],"offset":{"x":2,"y":1.5}}; 
	figuras[2][3] = {"figura":[{x:0,y:0},{x:1,y:0}],"offset":{"x":1.5,"y":2}}; 
	figuras[2][4] = {"figura":[{x:0,y:0},{x:0,y:2}],"offset":{"x":2,"y":1}};
	figuras[2][5] = {"figura":[{x:0,y:0},{x:2,y:2}],"offset":{"x":1,"y":1}}; 
	figuras[2][6] = {"figura":[{x:0,y:0},{x:4,y:0}],"offset":{"x":0,"y":2}};
	figuras[2][7] = {"figura":[{x:0,y:0},{x:2,y:4}],"offset":{"x":1,"y":0}}; 
	figuras[2][8] = {"figura":[{x:0,y:0},{x:2,y:3}],"offset":{"x":1,"y":0.5}};
	figuras[2][9] = {"figura":[{x:0,y:0},{x:2,y:1}],"offset":{"x":1,"y":1.5}};
	
	figuras[3][0] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2}],"offset":{"x":1,"y":1}}; 
	figuras[3][1] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0}],"offset":{"x":1,"y":2}}; 
	figuras[3][2] = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2}],"offset":{"x":2,"y":1}}; 
	figuras[3][3] = {"figura":[{x:0,y:0},{x:1,y:1},{x:0,y:2}],"offset":{"x":1.5,"y":1}}; 
	figuras[3][4] = {"figura":[{x:0,y:0},{x:0,y:2},{x:2,y:2}],"offset":{"x":1,"y":1}};
	figuras[3][5] = {"figura":[{x:0,y:0},{x:0,y:1},{x:1,y:1}],"offset":{"x":1.5,"y":1.5}};
	figuras[3][6] = {"figura":[{x:0,y:0},{x:1,y:0},{x:1,y:1}],"offset":{"x":1.5,"y":1.5}};
	figuras[3][7] = {"figura":[{x:0,y:0},{x:1,y:1},{x:3,y:1}],"offset":{"x":0.5,"y":1.5}}; 
	figuras[3][8] = {"figura":[{x:0,y:0},{x:2,y:0},{x:3,y:0}],"offset":{"x":0.5,"y":1.5}}; 
	figuras[3][9] = {"figura":[{x:0,y:0},{x:2,y:2},{x:4,y:4}],"offset":{"x":0,"y":0}};
	
	figuras[4][0] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:0,y:2}],"offset":{"x":1,"y":1}}; 
	figuras[4][1] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:1}],"offset":{"x":1,"y":1.5}}; 
	figuras[4][2] = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:0,y:3}],"offset":{"x":2,"y":0.5}}; 
	figuras[4][3] = {"figura":[{x:0,y:0},{x:1,y:1},{x:0,y:2},{x:0,y:4}],"offset":{"x":1.5,"y":0}}; 
	figuras[4][4] = {"figura":[{x:0,y:0},{x:0,y:2},{x:2,y:2},{x:2,y:0}],"offset":{"x":1,"y":1}};
	figuras[4][5] = {"figura":[{x:0,y:0},{x:1,y:1},{x:0,y:2},{x:0,y:3}],"offset":{"x":1.5,"y":0.5}};
	figuras[4][6] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:1},{x:3,y:0}],"offset":{"x":0.5,"y":1.5}};
	figuras[4][7] = {"figura":[{x:0,y:0},{x:2,y:1},{x:1,y:1},{x:1,y:0}],"offset":{"x":1,"y":1.5}}; 
	figuras[4][8] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:3}],"offset":{"x":0.5,"y":0.5}}; 
	figuras[4][9] = {"figura":[{x:0,y:0},{x:0,y:4},{x:2,y:2},{x:4,y:4}],"offset":{"x":0,"y":0}};
	
	figuras[5][0] = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:1}],"offset":{"x":1,"y":1}}; 
	figuras[5][1] = {"figura":[{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:0},{x:2,y:1}],"offset":{"x":1,"y":1.5}}; 
	figuras[5][2] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0}],"offset":{"x":0,"y":1}}; 
	figuras[5][3] = {"figura":[{x:0,y:0},{x:0,y:2},{x:1,y:1},{x:2,y:0},{x:2,y:2}],"offset":{"x":1,"y":1}}; 
	figuras[5][4] = {"figura":[{x:0,y:0},{x:2,y:1},{x:1,y:1},{x:1,y:2},{x:1,y:0}],"offset":{"x":1,"y":1}};
	figuras[5][5] = {"figura":[{x:0,y:0},{x:2,y:1},{x:1,y:1},{x:2,y:2},{x:1,y:0}],"offset":{"x":1,"y":1}};
	figuras[5][6] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:0},{x:3,y:1},{x:4,y:0}],"offset":{"x":0,"y":1.5}};
	figuras[5][7] = {"figura":[{x:0,y:0},{x:0,y:1},{x:1,y:0},{x:1,y:1},{x:2,y:0}],"offset":{"x":1,"y":1.5}}; 
	figuras[5][8] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:2,y:1},{x:2,y:2}],"offset":{"x":1,"y":1}}; 
	figuras[5][9] = {"figura":[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:2,y:2}],"offset":{"x":1,"y":1}};
	
	figuras[6][0] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:2,y:3},{x:3,y:3},{x:4,y:2}],"offset":{"x":0,"y":0}};
	figuras[6][1] = {"figura":[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:2,y:2},{x:1,y:3},{x:0,y:2}],"offset":{"x":1,"y":0.5}};
	figuras[6][2] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:1,y:1},{x:0,y:2},{x:2,y:2}],"offset":{"x":1,"y":1}};
	figuras[6][3] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:1,y:3},{x:3,y:3}],"offset":{"x":0.5,"y":0.5}};
	figuras[6][4] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:3},{x:3,y:4},{x:4,y:3}],"offset":{"x":0,"y":0}};
	figuras[6][5] = {"figura":[{x:0,y:0},{x:1,y:1},{x:0,y:2},{x:1,y:2},{x:1,y:3},{x:2,y:4}],"offset":{"x":1,"y":0}};
	figuras[6][6] = {"figura":[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:1,y:3},{x:2,y:3}],"offset":{"x":1,"y":0.5}};
	figuras[6][7] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:1,y:3},{x:3,y:3},{x:4,y:4}],"offset":{"x":0,"y":0}};
	figuras[6][8] = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:1},{x:2,y:2}],"offset":{"x":1,"y":1}};
	figuras[6][9] = {"figura":[{x:0,y:0},{x:1,y:1},{x:0,y:2},{x:2,y:2},{x:1,y:3},{x:2,y:4}],"offset":{"x":1,"y":0}};
	
	figuras[7][0] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:3},{x:4,y:4},{x:4,y:3},{x:3,y:4}],"offset":{"x":0,"y":0}};
	figuras[7][1] = {"figura":[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:0,y:3},{x:1,y:1},{x:1,y:2},{x:2,y:2}],"offset":{"x":1,"y":0.5}};
	figuras[7][2] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0},{x:2,y:3},{x:2,y:4}],"offset":{"x":0,"y":0}};
	figuras[7][3] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:0},{x:2,y:1},{x:2,y:2},{x:0,y:2},{x:1,y:2}],"offset":{"x":1,"y":1}};
	figuras[7][4] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:0,y:1},{x:1,y:1},{x:0,y:2}],"offset":{"x":0.5,"y":1}};
	figuras[7][5] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:1,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}],"offset":{"x":1,"y":1}};
	figuras[7][6] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:1},{x:3,y:1},{x:4,y:1},{x:0,y:2},{x:1,y:2}],"offset":{"x":0,"y":1}};
	figuras[7][7] = {"figura":[{x:0,y:0},{x:0,y:1},{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:3,y:3},{x:3,y:4}],"offset":{"x":0.5,"y":0}};
	figuras[7][8] = {"figura":[{x:0,y:0},{x:0,y:1},{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:0},{x:4,y:1}],"offset":{"x":0,"y":1}};
	figuras[7][9] = {"figura":[{x:0,y:0},{x:0,y:1},{x:1,y:2},{x:2,y:2},{x:2,y:3},{x:2,y:4},{x:1,y:4}],"offset":{"x":1,"y":0}};
	
	figuras[8][0] = {"figura":[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:2,y:2},{x:2,y:3},{x:3,y:3},{x:3,y:4},{x:4,y:4}],"offset":{"x":0,"y":0}};
	figuras[8][1] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}],"offset":{"x":1,"y":1}};
	figuras[8][2] = {"figura":[{x:0,y:0},{x:0,y:1},{x:1,y:0},{x:2,y:0},{x:2,y:1},{x:2,y:2},{x:2,y:3},{x:3,y:1},{x:3,y:3}],"offset":{"x":0.5,"y":0.5}};
	figuras[8][3] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0},{x:1,y:3},{x:0,y:4},{x:3,y:3},{x:4,y:4}],"offset":{"x":0,"y":0}};
	figuras[8][4] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2}],"offset":{"x":0.5,"y":1}};
	figuras[8][5] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:1,y:3},{x:0,y:4},{x:3,y:2},{x:4,y:1},{x:4,y:2},{x:4,y:3}],"offset":{"x":0,"y":0}};
	figuras[8][6] = {"figura":[{x:0,y:0},{x:2,y:0},{x:4,y:0},{x:1,y:1},{x:3,y:1},{x:0,y:2},{x:2,y:2},{x:4,y:2},{x:2,y:4}],"offset":{"x":0,"y":0}};
	figuras[8][7] = {"figura":[{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:2,y:1},{x:2,y:2},{x:1,y:2},{x:3,y:3},{x:4,y:2},{x:4,y:3}],"offset":{"x":0,"y":0}};
	figuras[8][8] = {"figura":[{x:0,y:0},{x:2,y:0},{x:1,y:1},{x:0,y:2},{x:2,y:2},{x:3,y:3},{x:4,y:2},{x:2,y:4},{x:4,y:4}],"offset":{"x":0,"y":0}};
	figuras[8][9] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0},{x:4,y:1},{x:4,y:2},{x:4,y:3},{x:4,y:4}],"offset":{"x":0,"y":0}};
	
	figuras[9][0] = {"figura":[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:2,y:2},{x:2,y:3},{x:3,y:3},{x:3,y:4},{x:4,y:4}],"offset":{"x":0,"y":0}};
	figuras[9][1] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}],"offset":{"x":1,"y":1}};
	figuras[9][2] = {"figura":[{x:0,y:0},{x:0,y:1},{x:1,y:0},{x:2,y:0},{x:2,y:1},{x:2,y:2},{x:2,y:3},{x:3,y:1},{x:3,y:3}],"offset":{"x":0.5,"y":0.5}};
	figuras[9][3] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0},{x:1,y:3},{x:0,y:4},{x:3,y:3},{x:4,y:4}],"offset":{"x":0,"y":0}};
	figuras[9][4] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2}],"offset":{"x":0.5,"y":1}};
	figuras[9][5] = {"figura":[{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:1,y:3},{x:0,y:4},{x:3,y:2},{x:4,y:1},{x:4,y:2},{x:4,y:3}],"offset":{"x":0,"y":0}};
	figuras[9][6] = {"figura":[{x:0,y:0},{x:2,y:0},{x:4,y:0},{x:1,y:1},{x:3,y:1},{x:0,y:2},{x:2,y:2},{x:4,y:2},{x:2,y:4}],"offset":{"x":0,"y":0}};
	figuras[9][7] = {"figura":[{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:2,y:1},{x:2,y:2},{x:1,y:2},{x:3,y:3},{x:4,y:2},{x:4,y:3}],"offset":{"x":0,"y":0}};
	figuras[9][8] = {"figura":[{x:0,y:0},{x:2,y:0},{x:1,y:1},{x:0,y:2},{x:2,y:2},{x:3,y:3},{x:4,y:2},{x:2,y:4},{x:4,y:4}],"offset":{"x":0,"y":0}};
	figuras[9][9] = {"figura":[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0},{x:4,y:1},{x:4,y:2},{x:4,y:3},{x:4,y:4}],"offset":{"x":0,"y":0}};
	};
	
	function timer() {
		if(tempo == 15){
			mc.width = mc.width;
			aTestar = Math.floor((Math.random()*10));
			if (nJogadores < 2) {nJogadores=2;};
			if (nJogadores > 9) {nJogadores=9;};
			auxJogadores = nJogadores;
			desenhaFigura(figuras[nJogadores][aTestar]);
		}
		tempo--;
		if (tempo <= 0) {
			if (testaFigura(figuras[auxJogadores][aTestar])) {
				pontos = pontos + 5;
				document.getElementById("pontos").innerHTML = pontos;
			} else {
				pontos = pontos - 5;
				if(pontos < 0 ){pontos = 0;};
				document.getElementById("pontos").innerHTML = pontos;
			}
		tempo = 15;
		}
		document.getElementById("txt").innerHTML = tempo;
	}
	
	function updateCheck(){
		socket.emit('update');
		//alert("checking");
	}		

	function desenhaFigura(fig) {
		for (var j = 0; j < fig.figura.length; j++) {
			var x = (fig.figura[j].x + fig.offset.x) * larg;
			var y = (fig.figura[j].y + fig.offset.y) * larg;
			mctx.fillStyle = "white";
			mctx.fillRect(x, y, larg, larg);
			mctx.strokeStyle = "black";
			mctx.lineWidth = 2;
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
		//ctx.strokeStyle = "black";
		//ctx.lineWidth = 1;
		//ctx.strokeRect(x, y, larg, larg);
		//document.getElementById('txt').innerHTML = JSON.stringify(f);
	};

	function clearCanvas(x, y, w, h) {
		f[x][y] = 0;
		//c.width = c.width;
		x = x * larg;
		y = y * larg;
		ctx.clearRect(x, y, larg, larg);
	}
	
	socket.on('apaga', function(data) {
		clearCanvas(boxes[data.id].x, boxes[data.id].y, larg, larg);
	});
	
	function testaFigura(fig) {
		//debugger;
		// figura conseguida
		var testaf = false;
		
		// para cada jogador
		for(var i=0; i < boxes.length; i++) {
			// testa figura iniciada no jogador corrente
			var testaj = true;
			
			var cp = boxes[i];
			
			for(var j=0; j<fig.figura.length; j++) {
				var xx = fig.figura[j].x+cp.x;
				var yy = fig.figura[j].y+cp.y;
				if (xx >= xMax || yy >= yMax) {
					testaj = false;
					break;
				}
				else if(f[xx][yy] == 0) {
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

