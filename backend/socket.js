module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
      // Optionally broadcast to the room
      io.to(chatId).emit("userJoined", `User has joined the chat`);
    });

    socket.on("sendMessage", (messageData) => {
      try {
        const { chatId, message, sender } = messageData;
        if (!chatId || !message || !sender) {
          throw new Error("chatId, message, and sender are required");
        }
        io.to(chatId).emit("receiveMessage", messageData);
        console.log(`Message sent to room ${chatId}: ${message}`);
      } catch (error) {
        console.error("Error sending message:", error.message);
      }
    });

    socket.on("leaveRoom", (chatId) => {
      socket.leave(chatId);
      console.log(`User left room: ${chatId}`);
      // Optionally notify the room
      io.to(chatId).emit("userLeft", `User has left the chat`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
