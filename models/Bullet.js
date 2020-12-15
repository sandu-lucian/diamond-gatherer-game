class Bullet {
  constructor(player) {
    this.player = player;
    this.x = player.x + player.width / 2;
    this.y = player.y + player.height / 2;
    this.dx = 0;
    this.dy = 0;
    this.speed = 5;
    this.imageId = player.imageId + "-bullet";
    this.distance = 200;
    this.setSpeed();
  }

  setSpeed() {
    switch (this.player.direction) {
      case "up":
        this.dy = -this.speed;
        break;
      case "right":
        this.dx = this.speed;
        break;
      case "down":
        this.dy = this.speed;
        break;
      case "left":
        this.dx = -this.speed;
        break;
    }
  }

  forDraw() {
    return {
      imageId: this.imageId,
      drawImageParameters: [this.x, this.y],
    };
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.distance -= this.speed;
  }
}

module.exports = Bullet;
