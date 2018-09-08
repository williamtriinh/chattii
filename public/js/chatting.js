var sidebar = document.getElementById("chat__sidebar");
var sidebarHandle = document.getElementById("chat__sidebar__resize-handle");

var chatMain = document.getElementById("chat__main");

var mouse = {
    dragging: undefined,
}

chatMain.style.left = sidebar.offsetWidth + "px";
chatMain.style.width = document.body.offsetWidth - sidebar.offsetWidth + "px";

sidebarHandle.addEventListener("mousedown", function(event) {
    if (event.button === 0) {
        mouse.dragging = sidebar;
    }
})

window.addEventListener("mouseup", function(event) {
    if (event.button === 0) {
        mouse.dragging = undefined;
    }
})

window.addEventListener("mousemove", function(event) {
    if (mouse.dragging !== undefined) {
        mouse.dragging.style.width = event.clientX + "px";
        chatMain.style.left = mouse.dragging.offsetWidth + "px";
        chatMain.style.width = document.body.offsetWidth - sidebar.offsetWidth + "px";
    }
});

window.addEventListener("resize", function() {
    chatMain.style.left = sidebar.offsetWidth + "px";
    chatMain.style.width = document.body.offsetWidth - sidebar.offsetWidth + "px";
});

socket.on("user-connected-chat", (data) => {
    /// Add user to end of user list if they're already connected.
    var className = "chat__sidebar__user-list__users";

    let userItem = document.createElement("li");
    userItem.className = className;
    userItem.id = data.userId;
    if (socketId === -1) {
        socketId = data.userId;
        userItem.innerHTML = data.onlineUsers[data.userId].name + " - You";
    } else {
        userItem.innerHTML = data.onlineUsers[data.userId].name;
    }
    document.getElementById("chat__sidebar__user-list").appendChild(userItem);
});

socket.on("acquire-online-users", (data) => {
    var className = "chat__sidebar__user-list__users";
    for (let user in data.onlineUsers) {
        if (data.userId !== user) {
            let userItem = document.createElement("li");
            userItem.className = className;
            userItem.id = user;
            userItem.innerHTML = data.onlineUsers[user].name;
            document.getElementById("chat__sidebar__user-list").appendChild(userItem);
        }
    }
});

socket.on("user-disconnect-chat", (data) => {
    /// Delete li by socket.id;
    var userItem = document.getElementById(data.userId);
    if (userItem !== null) userItem.remove();
});


