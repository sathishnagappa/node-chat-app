const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
const {generateMessage} = require("./utils/message");
const port = process.env.PORT || 3000 ;
const publicPath = path.join(__dirname, "../public");
var app = express();

var server = http.createServer(app);
var io = socketIO(server);    
app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connection");
    socket.emit("newEmail", generateMessage("sathish.nagappa@gmail.com",  "Hi, How are you?"));
    // socket.emit("newMessage", {
    //     from : "sathish.nagappa@gmail.com",
    //     text : "Whatsuppp??",
    //     createdAt : 1231231
    // });

    socket.on("createEmail", (newEmail) => {
       console.log("create Email", newEmail);
    });

    socket.emit("newMessage", generateMessage("Admin", "Welcome to Chat App"));

    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));
    socket.on("createMessage", (newMessage, callback) => {
        console.log("create Message", newMessage);  
        io.emit("newMessage", generateMessage(newMessage.from,newMessage.text));
        callback("this is send from server");      
        
     });
    socket.on("disconnect", () => {
        console.log("User was Disconnected");
       });
})

server.listen(port, () => {
 console.log("Server is up at " + port);
});
