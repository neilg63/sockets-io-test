var socket = io();

socket.on("connect", function(e){
	console.log("connected to socket.io server");
});


socket.on("message", function(message){
	console.log(message.text);
});