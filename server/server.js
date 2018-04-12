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
    socket.on("disconnect", () => {
        console.log("User was Disconnected");
       });
})

server.listen(port, () => {
 console.log("Server is up at " + port);
});