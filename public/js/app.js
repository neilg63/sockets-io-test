var socket = io();

socket.on("connect", function(e){
	console.log("connected to socket.io server");
});


socket.on("message", function(message){
	//console.log(message.text);
	console.log(message.timestamp);
	jQuery("#message-pane").append('<p><em>'+moment.utc(parseInt(message.timestamp)).local().format("h:mma DD/MM/YYYY")+'</em> <span class="text">'+message.text+'</span></p>');
});

var $form = jQuery('#message-form');

$form.on("submit", function(e){
	e.preventDefault();
	var msg = $(this).find("input[name=message]"), txt = $.trim(msg.val());
	socket.emit("message", {
		text: txt
	});
	msg.val("");
})