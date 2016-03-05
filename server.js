const PORT = process.env.PORT || 3000;
var express = require("express"),
	app = express(),
	http = require("http").Server(app);

app.use(express.static(__dirname + "/public"));


http.listen(PORT, function(){
	console.log("Server started");
});
