// Tema Curs 2

// Ex. 1

let arr = ["Love", "I", "Javascript"];
[arr[0], arr[1]] = [arr[1], arr[0]];

console.log(arr);

// Ex. 2

const secondArr = [
  "Paul",
  1,
  false,
  { name: "Jon Snow" },
  [1, 2, 3],
  null,
  undefined,
  function () {
    console.log("Test");
  },
];
for (let i = 0; i < secondArr.length; i++) {
  console.log(
    `Index: ${i}\nValue: ${secondArr[i]}\nType: ${typeof secondArr[i]}`
  );
}

// Ex. 6

class Cat {
  constructor(name, color, age, favoriteToy, dailySleepTime) {
    this.name = name;
    this.color = color;
    this.age = age;
    this.favoriteToy = favoriteToy;
    this.dailySleepTime = dailySleepTime;
  }

  // Confusing class method names but
  // you can't expect a cat to say anything else,
  // can you?

  meow() {
    console.log(
      `I'm awake, human. I've completed my ${this.dailySleepTime} hours of sleep.`
    );
  }

  meeeow() {
    console.log(`Stop coding and bring me my ${this.favoriteToy}!`);
  }

  meeeooow() {
    console.log("No, seriously. Are you planning to feed me today or not?");
  }
}

const fifi = new Cat("Fifi", "orange", 3, "mouse", 4);
console.log("***** Fifi *****");
fifi.meow();
fifi.meeeow();
fifi.meeeooow();

const jinx = new Cat("Jinx", "black", 7, "ball", 7);
console.log("***** Jinx *****");
jinx.meow();
jinx.meeeow();
jinx.meeeooow();

const nola = new Cat("Nola", "grey", 1, "pillow", 5);
console.log("***** Nola *****");
nola.meow();
nola.meeeow();
nola.meeeooow();

// Diamond Gatherer Game

const canvas = document.getElementById("gameArea");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");

const george = new Image();
george.src = "./assets/george.png";

const GEORGE_WIDTH = 40;
const GEORGE_HEIGHT = 42;
let georgeX = 100;
let georgeY = 100;
george.onload = () => {
  context.drawImage(
    george,
    100,
    0,
    GEORGE_WIDTH,
    GEORGE_HEIGHT,
    100,
    100,
    GEORGE_WIDTH,
    GEORGE_HEIGHT
  );
};

const mario = new Image();
mario.src = "./assets/mario.png";

const MARIO_WIDTH = 26;
const MARIO_HEIGHT = 36;
let marioX = 100;
let marioY = 0;
mario.onload = () => {
  context.drawImage(
    mario,
    0,
    50,
    MARIO_WIDTH,
    MARIO_HEIGHT,
    100,
    0,
    MARIO_WIDTH,
    MARIO_HEIGHT
  );
};

document.addEventListener("keydown", function (event) {
  context.clearRect(0, 0, 600, 400);
  switch (event.key) {
    case "ArrowUp": {
      if (georgeY > -10) {
        georgeY -= 5;
      }
      context.drawImage(
        george,
        96,
        96,
        GEORGE_WIDTH,
        GEORGE_HEIGHT,
        georgeX,
        georgeY,
        GEORGE_WIDTH,
        GEORGE_HEIGHT
      );
      break;
    }
    case "ArrowDown": {
      if (georgeY < 105) {
        georgeY += 5;
      }
      context.drawImage(
        george,
        0,
        0,
        GEORGE_WIDTH,
        GEORGE_HEIGHT,
        georgeX,
        georgeY,
        GEORGE_WIDTH,
        GEORGE_HEIGHT
      );
      break;
    }
    case "ArrowLeft": {
      if (georgeX > -5) {
        georgeX -= 5;
      }
      context.drawImage(
        george,
        48,
        48,
        GEORGE_WIDTH,
        GEORGE_HEIGHT,
        georgeX,
        georgeY,
        GEORGE_WIDTH,
        GEORGE_HEIGHT
      );
      break;
    }
    case "ArrowRight": {
      if (georgeX < 260) {
        georgeX += 5;
      }
      context.drawImage(
        george,
        144,
        144,
        GEORGE_WIDTH,
        GEORGE_HEIGHT,
        georgeX,
        georgeY,
        GEORGE_WIDTH,
        GEORGE_HEIGHT
      );
      break;
    }
    case "w": {
      if (marioY > 0) {
        marioY -= 5;
      }
      context.drawImage(
        mario,
        52,
        150,
        MARIO_WIDTH,
        MARIO_HEIGHT,
        marioX,
        marioY,
        MARIO_WIDTH,
        MARIO_HEIGHT
      );
      break;
    }
    case "s": {
      if (marioY < 115) {
        marioY += 5;
      }
      context.drawImage(
        mario,
        100,
        50,
        MARIO_WIDTH,
        MARIO_HEIGHT,
        marioX,
        marioY,
        MARIO_WIDTH,
        MARIO_HEIGHT
      );
      break;
    }
    case "a": {
      if (marioX > 0) {
        marioX -= 5;
      }
      context.drawImage(
        mario,
        100,
        100,
        MARIO_WIDTH,
        MARIO_HEIGHT,
        marioX,
        marioY,
        MARIO_WIDTH,
        MARIO_HEIGHT
      );
      break;
    }
    case "d": {
      if (marioX < 275) {
        marioX += 5;
      }
      context.drawImage(
        mario,
        150,
        100,
        MARIO_WIDTH,
        MARIO_HEIGHT,
        marioX,
        marioY,
        MARIO_WIDTH,
        MARIO_HEIGHT
      );
      break;
    }
  }
});
