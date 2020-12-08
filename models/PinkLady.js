const Player = require("./Player");

class PinkLady extends Player {
  constructor(options) {
    super(options);
    this.x = 834;
    this.y = 551;
    this.imageId = "pink-lady";
    this.imageStartPoints = {
      right: [193, 225],
      left: [131, 163],
      down: [65, 98],
      up: [0, 33],
    };
  }
}

module.exports = PinkLady;
