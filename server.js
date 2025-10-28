import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Serve static client (optional for GitHub Pages style demo)
app.use(express.static("client"));

// Handle socket connections
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("chatMessage", (msg) => {
    console.log("💬", msg);
    io.emit("chatMessage", msg); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("🚀 Chat server running on port 5000"));
