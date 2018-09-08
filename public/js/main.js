/// Connect to host.
var socket = io.connect("localhost:5000");

/// Submit name
document.getElementById("submit-name").addEventListener("click", function() {
    socket.emit("check-for-nickname", { nickname: document.getElementById("nickname").value });
});

/// Event listeners
socket.on("invalid-nickname", function(data) {
    var message = document.getElementById("login-section__container__message");

    if (data.error == "empty-nickname") {
        message.innerHTML = "Please enter a nickname!";
    } else if (data.error == "invalid-characters") {
        message.innerHTML = "Nickname may only contain A-z, 0-9, spaces, dashes and underscores!";
    }

    setTimeout(function() {
        /// Clear message
        document.getElementById("login-section__container__message").innerHTML = "";
    }, 6000);
});

socket.on("valid-nickname", function() {
    
});

