const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const Player = require("./public/js/Player");
const Game = require("./public/js/Game");

http.listen(5000, () => {
  console.log("Server started at port 5000");
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

io.on("connection", (socket) => {
  console.log("Socket connected -> " + socket.id);

  socket.on("join-chat", function (userName) {
    chatUsers[socket.id] = userName;
    socket.join("chat");
    io.to("chat").emit(
      "joined-chat",
      `${userName} has joined the chat!`,
      `${Object.keys(chatUsers).length} user(s) online!`
    );
  });

  socket.on("send-message", function (message, color) {
    io.to("chat").emit(
      "new-message",
      `${chatUsers[socket.id]}: <span style="color:${color}">${message}</span>`
    );
  });

  socket.on("leave-chat", function () {
    let user = chatUsers[socket.id];
    delete chatUsers[socket.id];
    io.to("chat").emit(
      "left-chat",
      `${user} has left the chat!`,
      `${Object.keys(chatUsers).length} user(s) online!`
    );
    socket.leave("chat");
    socket.emit("menu");
  });

  socket.on("increment", function () {
    counter++;
    io.to("chat").emit("incremented", counter);
  });

  /* socket.on("create-game", function (gameName) {
    const gameId = "game-" + socket.id;
    const game = new Game({
      id: gameId,
    });
    games[socket.id] = game;
    socket.join(gameId);
  }); */
});

/* function gameLoop(id) {
  const objectsForDraw = [];
  games[id].players.forEach(function (player) {
    objectsForDraw.push(player.forDraw());
  });
  io.to(id).emit("game-loop", objectsForDraw);
} */

const chatUsers = {};
const games = {};
let counter = 0;
