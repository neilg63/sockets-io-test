var socket = io();

socket.on("connect", function(e){
	console.log("connected to socket.io server");
});