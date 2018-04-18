// var moment = require("moment");
var socket = io();

     socket.on("connect", function() {
      console.log("Connected to server");
      socket.emit("createEmail", {
        to: "sathish@brillio.com",
        text: "Hope you are doing great!"
      });
    //   socket.emit("createMessage", {
    //     from: "sathish@brillio.com",
    //     text: "Hi, How are you?"
    //   });
    });
     socket.on("disconnect", function() {
      console.log("Disconnected from server");
     });
     socket.on("newEmail", function(email) {
        console.log("New Email", email);
       });

       socket.on("newMessage", function(message) {
       var formatedTime = moment(message.createdAt).format("h:mm a");    
        console.log("Got new message!", message);
        var li = jQuery("<li></li>");
        li.text(`${message.from} ${formatedTime} : ${message.text}`);
        jQuery("#messages").append(li);
       });

       socket.on("newLocationMessage", function(message) {
        var formatedTime = moment(message.createdAt).format("h:mm a"); 
        console.log("Got new message!", message);
        var li = jQuery("<li></li>");
        var a = jQuery("<a target=\"_blank\">My current location</a>");

        li.text(`${message.from} ${formatedTime}: `);
        a.attr("href",message.url);
        li.append(a);
        jQuery("#messages").append(li);
       });


       jQuery("#message-form").on("submit", function(e) {
        e.preventDefault();
       
        var messagebox = jQuery("[name=message]");
        socket.emit("createMessage", {
            from : "User",
            text : messagebox.val()
        }, function() {
            messagebox.val("");
     });
     
    });

    var locationButton = jQuery("#send-location");
    locationButton.on("click", function() {
      if(!navigator.geolocation) {
          return alert("Geolocation not supported by your browser");
      }
      locationButton.attr("disabled", "disabled").text("Sending location....");
      navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr("disabled").text("Sending location"); 
       socket.emit("createLocationMessage", {
           latitude : position.coords.latitude,
           longitude : position.coords.longitude
       })
      }, function() {
        locationButton.removeAttr("disabled").text("Sending location");
          alert("Unable to fetch the location")
      })
    });