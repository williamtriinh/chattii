var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen(5000, "0.0.0.0", function() {
    console.log("Listening on port 5000");
});

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
});
app.use(express.static("public"));

var io = socket(server);

io.on("connection", function(socket) {
    console.log("New connection made: " + new Date());


    /// Check for nickname;
    socket.on("check-for-nickname", (data) => {
        var badChar = "*|,\":<>[]{}`\';()@&$#%";

        if (data.nickname.length == 0) {
            socket.emit("invalid-nickname", {error: "empty-nickname"});
            return;
        }

        for (let i=0; i<data.nickname.length; i++) {
            if (badChar.indexOf(data.nickname.charAt(i)) != -1) {
                socket.emit("invalid-nickname", {error: "invalid-characters"});
                return;
            }
        }

        /// Good nickname.
        socket.emit("valid-nickname");
    
    });


    /// On disconnect
    socket.on("disconnect", function() {
        console.log("Disconnection at: " + new Date());
    });
});
