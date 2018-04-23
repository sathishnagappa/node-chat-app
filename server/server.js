const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
const {isRealString} = require("./utils/validation");
const {generateMessage , generateLocationMessage} = require("./utils/message");
const port = process.env.PORT || 3000 ;
const publicPath = path.join(__dirname, "../public");
const {Users} = require("./utils/users");
var app = express();

var users = new Users();
var server = http.createServer(app);
var io = socketIO(server);    
app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connection");
    socket.emit("newEmail", generateMessage("sathish.nagappa@gmail.com",  "Hi, How are you?"));

    socket.on("join", (param, callback) => {
        if(!isRealString(param.name) || ! isRealString(param.room)) {
            return callback("Name and Room Name are required");
        }

 
        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);
        io.to(param.room).emit("updateUserList",users.getUserList(param.room));
        socket.emit("newMessage", generateMessage("Admin", "Welcome to Chat App"));
        socket.broadcast.to(param.room).emit("newMessage", generateMessage("Admin", `${param.name} has joined`));

         
        callback();

    });

    socket.on("createEmail", (newEmail) => {
       console.log("create Email", newEmail);
    });

   
    socket.on("createMessage", (newMessage, callback) => {
        console.log("create Message", newMessage);  
        io.emit("newMessage", generateMessage(newMessage.from,newMessage.text));
        callback("");      
        
     });

     socket.on("createLocationMessage", (coords) => { 
        io.emit("newLocationMessage", generateLocationMessage("Admin",coords.latitude, coords.longitude));
     });


    socket.on("disconnect", () => {
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left`));
        } 

       });
})

server.listen(port, () => {
 console.log("Server is up at " + port);
});
