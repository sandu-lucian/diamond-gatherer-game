const server = require("../server");
const Diamond = require("./Diamond");

class Game {
  constructor(options) {
    this.id = options.id;
    this.players = options.players;
    this.name = options.name;
    this.diamonds = [];
    this.bullets = [];
    this.totalDiamonds = 9;
    this.over = false;
    this.start();
  }

  start() {
    const that = this;
    this.gameInterval = setInterval(function () {
      server.gameLoop(that.id);
    }, 1000 / 60);
  }

  update() {
    if (
      this.inProgress() &&
      this.players[0].score + this.players[1].score === this.totalDiamonds
    ) {
      this.over = true;
      this.winner =
        this.players[0].score > this.players[1].score
          ? "space-ranger"
          : "pink-lady";
      return;
    }

    if (
      this.inProgress() &&
      (this.players[0].hp === 0 || this.players[1].hp === 0)
    ) {
      this.over = true;
      this.winner = this.players[0].hp > 0 ? "space-ranger" : "pink-lady";
      return;
    }

    this.players.forEach(function (player) {
      player.update();
    });

    this.bullets.forEach((bullet, index) => {
      if (bullet.distance <= 0) {
        delete this.bullets[index];
        delete server.bullets[bullet.player.socketId];
      } else {
        bullet.update();
      }
    });
  }

  generateDiamonds() {
    for (let i = 0; i < this.totalDiamonds; i++) {
      this.diamonds.push(new Diamond());
    }
  }

  inProgress() {
    return this.players.length == 2;
  }
}

module.exports = Game;
