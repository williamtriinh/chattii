/// Connect to host.
var socket = io.connect("localhost:5000");
var socketId = -1;

/// Submit name
document.getElementById("nickname").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        socket.emit("check-for-nickname", { nickname: this.value });
    }
});

document.getElementById("submit-name").addEventListener("click", function() {
    socket.emit("check-for-nickname", { nickname: document.getElementById("nickname").value });
});

/// Event listeners
socket.on("invalid-nickname", function(data) {
    var message = document.getElementById("login-section__container__message");

    if (data.error === "empty-nickname") {
        message.innerHTML = "Please enter a nickname!";
    } else if (data.error === "invalid-characters") {
        message.innerHTML = "Nickname may only contain A-z, 0-9, spaces, dashes and underscores!";
    }

    setTimeout(function() {
        /// Clear message
        document.getElementById("login-section__container__message").innerHTML = "";
    }, 6000);
});

socket.on("valid-nickname", function(data) {
    /// Make http request.
    httpRequest = new XMLHttpRequest();

    httpRequest.open("GET", "chatting.html");
    httpRequest.send();

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var content = document.getElementById("login-section");
                content.id = "chat";
                content.innerHTML = httpRequest.responseText;

                var chattingScript = document.createElement("script");
                chattingScript.src = "/js/chatting.js";
                document.body.appendChild(chattingScript);
            } else {
                console.log("error");
            }
        }
    };
});

