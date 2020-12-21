const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const SpaceRanger = require("./models/SpaceRanger");
const PinkLady = require("./models/PinkLady");
const Game = require("./models/Game");
const Bullet = require("./models/Bullet");

http.listen(process.env.PORT || 5000, () => {
  console.log("Server started at port 5000");
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`Socket connected -> ${socket.id}`);
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
    const gameId = `game-${socket.id}`;

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
      gameName,
      gameId,
    });
  });

  socket.on("join-game", function (gameId) {
    players[socket.id] = new PinkLady({ gameId: gameId, socketId: socket.id });
    games[gameId].players.push(players[socket.id]);
    games[gameId].generateDiamonds();
    socket.join(gameId);
    io.to("menu").emit("remove-game-from-list", gameId);
  });

  socket.on("start-moving-player", function (direction) {
    if (players[socket.id]) {
      if (games[players[socket.id].gameId].players.length != 2) {
        return;
      }
      players[socket.id].startMoving(direction);
    }
  });

  socket.on("stop-moving-player", function (axis) {
    if (players[socket.id]) {
      if (games[players[socket.id].gameId].players.length != 2) {
        return;
      }
      players[socket.id].stopMoving(axis);
    }
  });

  socket.on("attack", function () {
    if (players[socket.id]) {
      if (games[players[socket.id].gameId].players.length != 2) {
        return;
      }

      if (bullets[socket.id]) {
        return;
      }
      bullets[socket.id] = new Bullet(players[socket.id]);

      const game = games[players[socket.id].gameId];
      game.bullets.push(bullets[socket.id]);
    }
  });

  socket.on("disconnect", function () {
    console.log(`Socket disconnected -> ${socket.id}`);
    if (players[socket.id]) {
      const gameId = players[socket.id].gameId;
      const game = games[gameId];
      const playersToRemoveIds = game.players.map(function (player) {
        return player.socketId;
      });
      clearInterval(game.gameInterval);
      delete games[gameId];
      playersToRemoveIds.forEach(function (playerToRemoveId) {
        delete players[playerToRemoveId];
        delete bullets[playerToRemoveId];
      });

      io.to(gameId).emit("game-over", "player-disconnected", gameId);
    }
  });

  socket.on("return-to-menu", function (gameId) {
    socket.leave(gameId);
    socket.emit("menu");
  });
});

function gameLoop(roomId) {
  const game = games[roomId];
  if (game) {
    game.update();

    if (game.over) {
      const playersToRemoveIds = game.players.map(function (player) {
        return player.socketId;
      });
      clearInterval(game.gameInterval);
      delete games[roomId];
      playersToRemoveIds.forEach(function (playerToRemoveId) {
        delete players[playerToRemoveId];
        delete bullets[playerToRemoveId];
      });

      io.to(roomId).emit("game-over", `${game.winner}-won`, roomId);
    } else {
      const objectsForDraw = [];

      game.players.forEach(function (player) {
        objectsForDraw.push(player.forDraw());
        objectsForDraw.push(player.hpForDraw());
      });

      game.diamonds.forEach(function (diamond) {
        objectsForDraw.push(diamond.forDraw());
      });

      game.bullets.forEach(function (bullet) {
        objectsForDraw.push(bullet.forDraw());
      });

      const data = {
        objectsForDraw,
        gameInProgress: game.players.length == 2,
      };

      if (data.gameInProgress) {
        data.score = {
          "space-ranger": game.players[0].score,
          "pink-lady": game.players[1].score,
          "remaining-diamonds":
            game.totalDiamonds - game.players[0].score - game.players[1].score,
        };
      }
      io.to(roomId).emit("game-loop", data);
    }
  }
}

const games = {};
const players = {};
const bullets = {};

module.exports.gameLoop = gameLoop;
module.exports.games = games;
module.exports.bullets = bullets;
