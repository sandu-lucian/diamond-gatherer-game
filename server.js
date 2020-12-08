const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const SpaceRanger = require("./models/SpaceRanger");
const PinkLady = require("./models/PinkLady");
const Game = require("./models/Game");

http.listen(5000, () => {
  console.log("Server started at port 5000");
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Socket connected -> " + socket.id);
  socket.join("menu");
  Object.keys(games).forEach(function (gameId) {
    if (games[gameId].players.length === 1) {
      socket.emit("add-game-to-list", {
        gameName: games[gameId].name,
        gameId: gameId,
      });
    }
  });

  socket.on("create-game", function (gameName) {
    const gameId = "game-" + socket.id;
    players[socket.id] = new SpaceRanger({
      gameId: gameId,
      socketId: socket.id,
    });
    const game = new Game({
      id: gameId,
      players: [players[socket.id]],
      name: gameName,
    });
    games[gameId] = game;
    socket.join(gameId);
    io.to("menu").emit("add-game-to-list", {
      gameName: gameName,
      gameId: gameId,
    });

    console.log(games);
    console.log(players);
  });

  socket.on("start-moving-player", function (direction) {
    if (players[socket.id]) {
      players[socket.id].startMoving(direction);
    }
  });

  socket.on("stop-moving-player", function (axis) {
    if (players[socket.id]) {
      players[socket.id].stopMoving(axis);
    }
  });

  socket.on("join-game", function (gameId) {
    players[socket.id] = new PinkLady({ gameId: gameId, socketId: socket.id });
    games[gameId].players.push(players[socket.id]);
    socket.join(gameId);
    io.to("menu").emit("remove-game-from-list", gameId);

    console.log(players);
  });

  socket.on("disconnect", function () {
    if (players[socket.id]) {
      const gameId = players[socket.id].gameId;
      const game = games[gameId];
      const playersToRemoveIds = game.players.map(function (player) {
        return player.socketId;
      });
      game.stop();
      delete games[gameId];
      playersToRemoveIds.forEach(function (playerToRemoveId) {
        delete players[playerToRemoveId];
      });

      io.to(gameId).emit("game-over", "A player has disconnected");
    }
  });

  socket.on("return-to-menu", function () {
    if (players[socket.id]) {
      const gameId = players[socket.id].gameId;
      const game = games[gameId];
      /* game.stop(); */
      delete players[socket.id];
      delete games[gameId];
      socket.leave(gameId);
      io.to(gameId).emit("game-over", "A player has disconnected");
    }

    socket.emit("menu");
    console.log(games);
    console.log(players);
  });
});

function gameLoop(id) {
  if (games[id]) {
    games[id].update();
    const objectsForDraw = [];
    games[id].players.forEach(function (player) {
      objectsForDraw.push(player.forDraw());
    });
    io.to(id).emit("game-loop", objectsForDraw);
  }
}

const games = {};

const players = {};

module.exports.gameLoop = gameLoop;
