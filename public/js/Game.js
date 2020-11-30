class Game {
  constructor(options) {
    this.id = options.id;
    this.players = options.players;
    this.start();
  }

  start() {
    const that = this;
    setInterval(function () {
      gameLoop(that.id);
    }, 1000 / 60);
  }
}
