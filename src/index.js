const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

io.on("connect", (socket) => {
  console.log("New WebSocket connection");

  socket.emit("message", "Welcome!");

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
