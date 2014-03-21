var http = require('http'),
static = require('node-static'),
io = require('socket.io');

var server = http.createServer(handler);
var fileServer = new static.Server('./html');

function handler(request, response) {
	request.addListener('end', function() {
		// if no filepath, serves cvisual.html by default
		console.log("----" + request.url);
		fileServer.serve(request, response, function(e, resp) {
			var filePath = request.url;
			console.log("===" + filePath);
			if (e && e.status == 404) {
				if (filePath == '/') {
					httpcode = 200;
					filePath = 'cliente.html';
				} else if (filePath == '/servidor') {
					httpcode = 200;
					filePath = 'ecra.html';
				} else {
					httpcode = 404;
					filePath = 'errorWorld.html';
				}
			}
			fileServer.serveFile(filePath, httpcode, {}, request, response);
		});
	});
	request.resume();
}

var connectedClients = new Array();
var cor= ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
'silver', 'teal','yellow'];
var id = 0;
var x = 0;
var y = 0;
var aux = 0;

var socketio = io.listen(server);

socketio.sockets.on('connection', function(client) {
	connectedClients.push(client);
	count = connectedClients.length;
	
	client.on('novoJogador', function(){
	client.emit("logged", {"id":id, "x":x, "y":y, "cor":cor[aux]});
	socketio.sockets.emit('desenha', {"id":id, "x":x, "y":y, "cor":cor[aux]});
	id++;
	aux++;
	});

	client.on('disconnect', function() {
		connectedClients.splice(connectedClients.indexOf(client), 1);
		count = connectedClients.length;
	});

	client.on("click", function(data) {
		var comando;
		var id = data.id;
		var code = data.code;
		switch(code) {
			case 83:
				comando = "down";
				break;
			case 87:
				comando = "up";
				break;
			case 68:
				comando = "right";
				break;
			case 65:
				comando = "left";
				break;
		}
		msg = {
			"comando" : comando,
			"id" : id
		};
		//mKeyP(msg);
		socketio.sockets.emit('dados', {"comando":comando, "id":id});
		//socketio.sockets.emit("click",data);
	});

	return;

});

var port = process.env.PORT || 5000;
server.listen(port);
