var socket = io();

socket.on("connect", function(e){
	var name = getQueryVariable("name"), room = getQueryVariable("room");
	
	if (typeof name == "string") {
		name = jQuery.trim(name);
	} else {
		name = "Anonymous";
	}
	var msg = "Welcome " + name;
	if (typeof room == "string") {
		msg += " to " + room;
	} else {
		room = " no room";
	}
	jQuery("#top-h1").html(msg);
	var joinedMsg = name + " joined " + room;
	socket.emit("message", {
		text: joinedMsg,
		type: "joined"
	});
});


socket.on("message", function(message){

	jQuery("#message-pane").append('<p class="'+message.type+'"><em>'+moment.utc(parseInt(message.timestamp)).local().format("h:mma DD/MM/YYYY")+'</em> <span class="text">'+message.text+'</span></p>');
});

var $form = jQuery('#message-form');

$form.on("submit", function(e){
	e.preventDefault();
	var msg = $(this).find("input[name=message]"), txt = $.trim(msg.val());
	socket.emit("message", {
		text: txt
		type: "comment"
	});
	msg.val("");
})