const RIGHT_EDGE = 860;
const RIGHT_MOD_EDGE = RIGHT_EDGE - 191;
const DOWN_EDGE = 540;
const DOWN_MOD_EDGE = DOWN_EDGE - 195;

class Diamond {
  constructor() {
    this.x = Math.floor(Math.random() * RIGHT_EDGE + 50);
    this.y = Math.floor(Math.random() * DOWN_EDGE + 50);
    this.imageId = "diamond";
    this.width = 26;
    this.height = 21;

    if (this.y < 191) {
      this.x = Math.floor(Math.random() * RIGHT_MOD_EDGE + 191);
    } else if (this.y > DOWN_EDGE - 159) {
      this.x = Math.floor(Math.random() * RIGHT_MOD_EDGE);
    }

    if (this.x < 195) {
      this.y = Math.floor(Math.random() * DOWN_MOD_EDGE + 195);
    } else if (this.x > RIGHT_EDGE - 185) {
      this.y = Math.floor(Math.random() * DOWN_MOD_EDGE);
    }
  }

  forDraw() {
    return {
      imageId: this.imageId,
      drawImageParameters: [this.x, this.y],
    };
  }
}

module.exports = Diamond;
