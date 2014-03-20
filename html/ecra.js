$(document).ready(function() {
	var xMax = 40;
	var yMax = 24;
	var larg = 25;
	var f = new Array();
	var boxes = new Array();
	var socket = io.connect();

	geraArray();
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	socket.on("connect", function(data) {

	});

	function geraArray() {
		for (var x = 0; x < xMax; x++) {
			f[x] = new Array();
			for (var y = 0; y < yMax; y++) {
				f[x][y] = 0;
				//alert(f[x][y]);
			}
		}
	}


	socket.on('desenha', function(dados) {

		var rect = new Box(dados.id, dados.x, dados.y, larg, larg, dados.cor);
		boxes.push(rect);
		geraQuad(dados.x, dados.y, larg, larg, dados.cor);
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
		//alert(f[x][y]);
		x = x * larg;
		y = y * larg;
		ctx.fillStyle = fill;
		ctx.fillRect(x, y, w, h);
	};

	function clearCanvas(x, y, w, h) {
		f[x][y] = 0;
		//c.width = c.width;
		x = x * larg;
		y = y * larg;
		ctx.clearRect(x, y, larg, larg);
	}


	socket.on('teste', function(msg) {
		console.log(msg);
	});

	// {"comando":"up","id",3}
	socket.on('dados', function(msg) {
		var aux = 0;
		for(var x = 0 in boxes){
			if(msg.id == boxes[x].id){
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

