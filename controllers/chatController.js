const Message = require("../models/message");

//use io passed from index.js to manaege socket connection
module.exports = (io) => {
  io.on("connection", (client) => {
    console.log("new connection");
    client.on("disconnect", () => {
      client.broadcast.emit("user disconnected");
      console.log("user disconnected");
    });

    //listen new message
    client.on("message", (data) => {
      let messageAttributes = {content: data.content, userName: data.userName, user: data.userId};
      Message.create(messageAttributes)
        .then(() => {
          io.emit("message", messageAttributes);
        })
        .catch((error) => {
          console.log(`error: ${error.message}`);
        });
    });

    
    Message.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .then((messages) => {
        client.emit("load all messages", messages.reverse());
      });
  });
};