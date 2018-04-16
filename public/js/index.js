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
        console.log("Got new message!", message);
        var li = jQuery("<li></li>");
        li.text(`${message.from} : ${message.text}`);
        jQuery("#messages").append(li);
       });

       jQuery("#message-form").on("submit", function(e) {
        e.preventDefault();
       
        socket.emit("createMessage", {
            from : "User",
            text : jQuery("[name=message]").val()
        }, function(data) {
            console.log("Got it!", data);
        });
     
    });