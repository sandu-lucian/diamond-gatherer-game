const server = require("../server");

class Game {
  constructor(options) {
    this.id = options.id;
    this.players = options.players;
    this.name = options.name;
    this.start();
  }

  start() {
    const that = this;
    this.gameInterval = setInterval(function () {
      server.gameLoop(that.id);
    }, 1000 / 60);
  }

  update() {
    this.players.forEach(function (player) {
      player.move();
    });
  }

  stop() {
    clearInterval(this.gameInterval);
  }
}

module.exports = Game;
