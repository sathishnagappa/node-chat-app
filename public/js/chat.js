// var moment = require("moment");
var socket = io();

   function scrollToBottom() {
   var messages = jQuery("#messages");
   var newMessage =messages.children("li:last-child");

   var clientHeight = messages.prop("clientHeight");
   var scrollTop = messages.prop("scrollTop");
   var scrollHeight = messages.prop("scrollHeight");
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();
    // console.log(clientHeight + " " + scrollTop + " " + scrollHeight + " " + newMessageHeight + " " + lastMessageHeight);
   if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
       messages.scrollTop(scrollHeight);
    // console.log("Should Scroll");
   }
   }

     socket.on("connect", function() {
      console.log("Connected to server");
      var param = jQuery.deparam(window.location.search);
      socket.emit("join", param, function(err) {
         if(err) {
            alert(err);
            window.location.href = "/";    
         } else
         {
            console.log("No error");
         }
      });
        });
  
        

     socket.on("disconnect", function() {
      console.log("Disconnected from server");
     });    
     socket.on("newEmail", function(email) {
        console.log("New Email", email);
       });

       socket.on("updateUserList", (users) => {
        var ol = jQuery("<ol></ol>");

        users.forEach((user) => {
            ol.append(jQuery("<li></li>").text(user));
        });
        jQuery("#users").html(ol);
       });
       socket.on("newMessage", function(message) {
        var formatedTime = moment(message.createdAt).format("h:mm a");   
        var template = jQuery("#message-template").html();
        var html = Mustache.render(template, {
            text : message.text,
            from : message.from,
            createdAt : formatedTime
        });
        
        jQuery("#messages").append(html);
        scrollToBottom();
       });

       socket.on("newLocationMessage", function(message) {
        var formatedTime = moment(message.createdAt).format("h:mm a"); 
        console.log("Got new message!", message);

        var template = jQuery("#location-message-template").html();
        var html = Mustache.render(template, {
            url : message.url,
            from : message.from,
            createdAt : formatedTime
        });

        jQuery("#messages").append(html);
        scrollToBottom();
       });


       jQuery("#message-form").on("submit", function(e) {
        e.preventDefault();
       
        var messagebox = jQuery("[name=message]");
        socket.emit("createMessage", {
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