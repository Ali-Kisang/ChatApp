const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const socketio = require("socket.io");
require("dotenv").config();
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const agoraRoutes = require("./routes/agoraRoutes");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your client app
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials if needed
  },
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your client app
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Socket.io for real-time communication
require("./socket")(io);

// Routes
app.use("/api/messages", messageRoutes);
app.use("/agora", agoraRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
