const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const messageRoutes = require("./routes/messageRoutes");
const agoraRoutes = require("./routes/agoraRoutes");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Socket.io for real-time communication
require("./socket")(io);

// Routes
app.use("/api/messages", messageRoutes);
app.use("/agora", agoraRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
