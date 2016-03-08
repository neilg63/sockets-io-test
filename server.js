const PORT = process.env.PORT || 3000;
var express = require("express"),
	app = express(),
	http = require("http").Server(app),
	io = require("socket.io")(http),
	moment = require("moment");
var clientInfo = {};

app.use(express.static(__dirname + "/public"));

io.on("connection", function(socket) {
	console.log("User connected via socket.io");

	socket.on("disconnect", function() {
		var userData = clientInfo[socket.id];
		if (typeof  userData !== 'undefined') {
			socket.leave(userData);
			io.to(userData.room).emit("message",{
				name: "System",
				type: "disconnect",
				text: userData.name + " has left",
				timestamp: moment().valueOf()
			});
		}

	});

	socket.on("joinRoom",function(req) {
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit("message",{
			type: "join",
			name: "System",
			text: req.name + " has joined ",
			timestamp: moment().valueOf()
		});
	});

	socket.on("message",function(message) {
		if (message.text) {
			console.log("Message received: " + message.text);
		}
		message.timestamp = moment().valueOf();
		if (!message.type) {
			message.type = "notice";
		}
		if (clientInfo[socket.id]) {
			io.to(clientInfo[socket.id].room).emit("message", message);
		}
	});

	socket.emit("message",{
		text: "Welcome to the chat application",
		type: "welcome",
		name: "System",
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function(){
	console.log("Server started");
});

