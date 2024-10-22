module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    // Join a specific chat room
    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });

    // Handle sending messages
    socket.on("sendMessage", (messageData) => {
      const { chatId, message } = messageData;
      io.to(chatId).emit("receiveMessage", messageData);
      console.log(`Message sent to room ${chatId}: ${message}`);
    });

    // Handle leaving the chat room
    socket.on("leaveRoom", (chatId) => {
      socket.leave(chatId);
      console.log(`User left room: ${chatId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
