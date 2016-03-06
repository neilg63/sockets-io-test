const PORT = process.env.PORT || 3000;
var express = require("express"),
	app = express(),
	http = require("http").Server(app),
	io = require("socket.io")(http),
	moment = require("moment");

app.use(express.static(__dirname + "/public"));

io.on("connection", function(socket) {
	console.log("User connected via socket.io");

	socket.on("message",function(message) {
		console.log("Message received: " + message.text);
		message.timestamp = moment().valueOf();
		socket.broadcast.emit("message", message);
	});

	socket.emit("message",{
		text: "Welcome to the chat application",
		timestamp: moment().format("x")
	});
});

http.listen(PORT, function(){
	console.log("Server started");
});

