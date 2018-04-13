const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

const port = process.env.PORT || 3000 ;
const publicPath = path.join(__dirname, "../public");
var app = express();

var server = http.createServer(app);
var io = socketIO(server);    
app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connection");
    socket.emit("newEmail", {
        from : "sathish.nagappa@gmail.com",
        text : "Hi, How are you?",
        createdAt : 1231231
    });

    socket.emit("newMessage", {
        from : "sathish.nagappa@gmail.com",
        text : "Whatsuppp??",
        createdAt : 1231231
    });

    socket.on("createEmail", (newEmail) => {
       console.log("create Email", newEmail);
    });
    socket.on("createMessage", (newMessage) => {
        console.log("create Message", newMessage);
     });
    socket.on("disconnect", () => {
        console.log("User was Disconnected");
       });
})

server.listen(port, () => {
 console.log("Server is up at " + port);
});