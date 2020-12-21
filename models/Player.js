const server = require("../server");

const PLAYER_DIM = {
  width: 32,
  height: 32,
};

const MAP = {
  width: 960,
  height: 640,
};

class Player {
  constructor(options) {
    this.dx = 0;
    this.dy = 0;
    this.step = 0;
    this.direction = "down";
    this.gameId = options.gameId;
    this.socketId = options.socketId;
    this.hasDiamond = false;
    this.score = 0;
    this.width = PLAYER_DIM.width;
    this.height = PLAYER_DIM.height;
    this.hp = 3;
  }

  forDraw() {
    return {
      imageId: this.hasDiamond ? `${this.imageId}-with-diamond` : this.imageId,
      drawImageParameters: [
        this.imageStartPoints[this.direction][this.step],
        0,
        PLAYER_DIM.width,
        PLAYER_DIM.height,
        this.x,
        this.y,
        PLAYER_DIM.width,
        PLAYER_DIM.height,
      ],
    };
  }

  hpForDraw() {
    return {
      imageId: `${this.hp}-hp`,
      drawImageParameters: [this.x, this.y - 15],
    };
  }

  startMoving(direction) {
    switch (direction) {
      case "up":
        this.dy = -3;
        break;
      case "right":
        this.dx = 3;
        break;
      case "down":
        this.dy = 3;
        break;
      case "left":
        this.dx = -3;
        break;
    }
    this.direction = direction;
  }

  move() {
    const newX = this.x + this.dx;
    if (newX != this.x && newX > 0 && newX + PLAYER_DIM.width < MAP.width) {
      this.x = this.x + this.dx;
      this.step = Math.floor(this.x / PLAYER_DIM.width) % 2;
    }

    const newY = this.y + this.dy;
    if (newY != this.y && newY > 0 && newY + PLAYER_DIM.height < MAP.height) {
      this.y = this.y + this.dy;
      this.step = Math.floor(this.y / PLAYER_DIM.height) % 2;
    }
  }

  stopMoving(axis) {
    this[axis] = 0;
  }

  update() {
    this.move();
    if (this.hasDiamond) {
      this.checkBaseCollision();
    } else {
      this.checkDiamondsCollision();
    }
  }

  checkDiamondsCollision() {
    const game = server.games[this.gameId];
    game.diamonds.forEach((diamond, index) => {
      if (this.collidedWith(diamond)) {
        this.hasDiamond = true;
        delete game.diamonds[index];
      }
    });
  }

  checkBaseCollision() {
    if (this.collidedWith(this.base)) {
      this.hasDiamond = false;
      this.score++;
    }
  }

  collidedWith(diamond) {
    const center = {
      x: this.x + PLAYER_DIM.width / 2,
      y: this.y + PLAYER_DIM.height / 2,
    };

    if (
      center.x >= diamond.x &&
      center.x <= diamond.x + diamond.width &&
      center.y >= diamond.y &&
      center.y <= diamond.y + diamond.height
    ) {
      return true;
    }
    return false;
  }
}

module.exports = Player;
