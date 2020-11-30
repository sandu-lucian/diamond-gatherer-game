// Diamond Gatherer Game

const canvas = document.getElementById("gameArea");
/** @type {CanvasRenderingContext2D} */
/* const context = canvas.getContext("2d"); */

// George Settings

const george = new Image();
george.src = "../assets/george.png";

const GEORGE_WIDTH = 40;
const GEORGE_HEIGHT = 45;
let georgeX = 100;
let georgeY = 100;
let georgePosition = 0;

george.onload = () => {
  context.drawImage(
    george,
    0 * GEORGE_WIDTH,
    0 * GEORGE_HEIGHT,
    GEORGE_WIDTH,
    GEORGE_HEIGHT,
    100,
    100,
    GEORGE_WIDTH,
    GEORGE_HEIGHT
  );
};

// Mario Settings

const mario = new Image();
mario.src = "../assets/mario.png";

const MARIO_WIDTH = 32;
const MARIO_HEIGHT = 32;
let marioX = 50;
let marioY = 50;
let marioPosition = 0;

mario.onload = () => {
  context.drawImage(
    mario,
    0 * MARIO_WIDTH,
    0 * MARIO_HEIGHT,
    MARIO_WIDTH,
    MARIO_HEIGHT,
    50,
    50,
    MARIO_WIDTH,
    MARIO_HEIGHT
  );
};

document.addEventListener("keydown", function (event) {
  context.clearRect(0, 0, 600, 400);
  console.log("haha");
  switch (event.key) {
    case "ArrowUp" && georgeY >= 0: {
      if (georgeY >= 0) {
        georgeY -= 10;

        context.drawImage(
          george,
          2.4 * GEORGE_WIDTH,
          0 * GEORGE_HEIGHT,
          GEORGE_WIDTH,
          GEORGE_HEIGHT,
          georgeX,
          georgeY,
          GEORGE_WIDTH,
          GEORGE_HEIGHT
        );

        georgePosition = 1;
      }
      break;
    }
    case "ArrowDown": {
      if (georgeY <= 340) {
        georgeY += 10;

        context.drawImage(
          george,
          0 * GEORGE_WIDTH,
          0 * GEORGE_HEIGHT,
          GEORGE_WIDTH,
          GEORGE_HEIGHT,
          georgeX,
          georgeY,
          GEORGE_WIDTH,
          GEORGE_HEIGHT
        );

        georgePosition = 2;
      }
      break;
    }
    case "ArrowLeft": {
      if (georgeX >= 10) {
        georgeX -= 10;

        context.drawImage(
          george,
          1.4 * GEORGE_WIDTH,
          0 * GEORGE_HEIGHT,
          GEORGE_WIDTH,
          GEORGE_HEIGHT,
          georgeX,
          georgeY,
          GEORGE_WIDTH,
          GEORGE_HEIGHT
        );

        georgePosition = 3;
      }
      break;
    }
    case "ArrowRight": {
      if (georgeX <= 550) {
        georgeX += 5;

        context.drawImage(
          george,
          3.8 * GEORGE_WIDTH,
          0 * GEORGE_HEIGHT,
          GEORGE_WIDTH,
          GEORGE_HEIGHT,
          georgeX,
          georgeY,
          GEORGE_WIDTH,
          GEORGE_HEIGHT
        );

        georgePosition = 4;
      }
      break;
    }
    case "w": {
      if (marioY >= 0) {
        marioY -= 10;

        context.drawImage(
          mario,
          0 * MARIO_WIDTH,
          5 * MARIO_HEIGHT,
          MARIO_WIDTH,
          MARIO_HEIGHT,
          marioX,
          marioY,
          MARIO_WIDTH,
          MARIO_HEIGHT
        );

        marioPosition = 1;
      }
      break;
    }
    case "s": {
      if (marioY <= 360) {
        marioY += 10;

        context.drawImage(
          mario,
          0 * MARIO_WIDTH,
          0 * MARIO_HEIGHT,
          MARIO_WIDTH,
          MARIO_HEIGHT,
          marioX,
          marioY,
          MARIO_WIDTH,
          MARIO_HEIGHT
        );

        marioPosition = 2;
      }
      break;
    }
    case "a": {
      if (marioX >= 10) {
        marioX -= 10;

        context.drawImage(
          mario,
          0 * MARIO_WIDTH,
          0 * MARIO_HEIGHT,
          MARIO_WIDTH,
          MARIO_HEIGHT,
          marioX,
          marioY,
          MARIO_WIDTH,
          MARIO_HEIGHT
        );

        marioPosition = 3;
      }
      break;
    }
    case "d": {
      if (marioX < 560) {
        marioX += 5;

        context.drawImage(
          mario,
          7 * MARIO_WIDTH,
          2.45 * MARIO_HEIGHT,
          MARIO_WIDTH,
          MARIO_HEIGHT,
          marioX,
          marioY,
          MARIO_WIDTH,
          MARIO_HEIGHT
        );

        marioPosition = 4;
      }
      break;
    }
  }

  switch (georgePosition) {
    case 1: {
      context.drawImage(
        george,
        2.4 * GEORGE_WIDTH,
        0 * GEORGE_HEIGHT,
        GEORGE_WIDTH,
        GEORGE_HEIGHT,
        georgeX,
        georgeY,
        GEORGE_WIDTH,
        GEORGE_HEIGHT
      );
      break;
    }
    case 2: {
      context.drawImage(
        george,
        0 * GEORGE_WIDTH,
        0 * GEORGE_HEIGHT,
        GEORGE_WIDTH,
        GEORGE_HEIGHT,
        georgeX,
        georgeY,
        GEORGE_WIDTH,
        GEORGE_HEIGHT
      );
      break;
    }
    case 3: {
      context.drawImage(
        george,
        1.4 * GEORGE_WIDTH,
        0 * GEORGE_HEIGHT,
        GEORGE_WIDTH,
        GEORGE_HEIGHT,
        georgeX,
        georgeY,
        GEORGE_WIDTH,
        GEORGE_HEIGHT
      );
      break;
    }
    case 4: {
      context.drawImage(
        george,
        3.8 * GEORGE_WIDTH,
        0 * GEORGE_HEIGHT,
        GEORGE_WIDTH,
        GEORGE_HEIGHT,
        georgeX,
        georgeY,
        GEORGE_WIDTH,
        GEORGE_HEIGHT
      );
      break;
    }
    default: {
      context.drawImage(
        george,
        0 * GEORGE_WIDTH,
        0 * GEORGE_HEIGHT,
        GEORGE_WIDTH,
        GEORGE_HEIGHT,
        georgeX,
        georgeY,
        GEORGE_WIDTH,
        GEORGE_HEIGHT
      );
    }
  }

  switch (marioPosition) {
    case 1: {
      context.drawImage(
        mario,
        0 * MARIO_WIDTH,
        5.06 * MARIO_HEIGHT,
        MARIO_WIDTH,
        MARIO_HEIGHT,
        marioX,
        marioY,
        MARIO_WIDTH,
        MARIO_HEIGHT
      );
      break;
    }
    case 2: {
      context.drawImage(
        mario,
        0 * MARIO_WIDTH,
        0 * MARIO_HEIGHT,
        MARIO_WIDTH,
        MARIO_HEIGHT,
        marioX,
        marioY,
        MARIO_WIDTH,
        MARIO_HEIGHT
      );
      break;
    }
    case 3: {
      context.drawImage(
        mario,
        0 * MARIO_WIDTH,
        0 * MARIO_HEIGHT,
        MARIO_WIDTH,
        MARIO_HEIGHT,
        marioX,
        marioY,
        MARIO_WIDTH,
        MARIO_HEIGHT
      );
      break;
    }
    case 4: {
      context.drawImage(
        mario,
        7 * MARIO_WIDTH,
        2.45 * MARIO_HEIGHT,
        MARIO_WIDTH,
        MARIO_HEIGHT,
        marioX,
        marioY,
        MARIO_WIDTH,
        MARIO_HEIGHT
      );
      break;
    }
    default: {
      context.drawImage(
        mario,
        0 * MARIO_WIDTH,
        0 * MARIO_HEIGHT,
        MARIO_WIDTH,
        MARIO_HEIGHT,
        marioX,
        marioY,
        MARIO_WIDTH,
        MARIO_HEIGHT
      );
    }
  }
});

// Socket io setup

const socket = io();

document
  .getElementById("join-chat-btn")
  .addEventListener("click", function (e) {
    const input = document.getElementById("username-input");
    const userName = input.value;

    if (userName.length > 0) {
      document.getElementById("username-missing").classList.add("display-none");
      document.getElementById("showCounter").classList.remove("display-none");
      socket.emit("join-chat", userName);
    } else {
      document
        .getElementById("username-missing")
        .classList.remove("display-none");
    }
  });

socket.on("joined-chat", function (userName, userCounter) {
  document.getElementById("join-chat").classList.add("display-none");
  document.getElementById("chat-container").classList.remove("display-none");
  document.getElementById("showCounter").classList.remove("display-none");
  const messageContainer = document.getElementById("chat-messages");
  const userElement = document.createElement("p");
  userElement.innerHTML = userName;
  messageContainer.appendChild(userElement);

  const userCountSpan = document.getElementById("online-users-count");
  userCountSpan.innerHTML = userCounter;
});

document
  .getElementById("send-message-btn")
  .addEventListener("click", function () {
    const msgInput = document.getElementById("message");
    const message = msgInput.value;
    const colorInput = document.getElementById("msg-color");
    const msgColor = colorInput.value;
    socket.emit("send-message", message, msgColor);
    msgInput.value = "";
  });

socket.on("new-message", function (message) {
  const messageContainer = document.getElementById("chat-messages");
  const messageElement = document.createElement("p");
  messageElement.innerHTML = message;
  messageContainer.appendChild(messageElement);
});

document
  .getElementById("leave-chat-btn")
  .addEventListener("click", function () {
    socket.emit("leave-chat");
  });

socket.on("left-chat", function (message, userCounter) {
  const leaveMessageContainer = document.getElementById("chat-messages");
  const leaveMessageElement = document.createElement("p");
  leaveMessageElement.innerHTML = message;
  leaveMessageContainer.appendChild(leaveMessageElement);

  const userCountSpan = document.getElementById("online-users-count");
  userCountSpan.innerHTML = userCounter;
});

socket.on("menu", function () {
  document.getElementById("join-chat").classList.remove("display-none");
  document.getElementById("chat-container").classList.add("display-none");
  document.getElementById("showCounter").classList.add("display-none");
});

document.getElementById("increment-btn").addEventListener("click", function () {
  socket.emit("increment");
});

socket.on("incremented", function (counter) {
  document.getElementById("counter").innerText = counter;
});

/* document
  .getElementById("create-game-button")
  .addEventListener("click", function () {
    const input = document.getElementById("game-name-input");
    const gameName = input.value;

    if (gameName.length > 0) {
      document.getElementById("gamename-missing").classList.add("display-none");
      socket.emit("create-game", gameName);
    } else {
      document
        .getElementById("gamename-missing")
        .classList.remove("display-none");
    }
  });

socket.on("game-loop", function (objectsForDraw) {
  document.getElementById("join-chat").classList.add("display-none");
  document
    .getElementById("create-game-container")
    .classList.add("display-none");
  document.getElementById("game-container").classList.remove("display-none");

  context.drawImage(document.getElementById("map-image"), 0, 0);

  objectsForDraw.forEach(function (objectForDraw) {
    context.drawImage(
      document.getElementById(objectForDraw.imageId),
      ...objectForDraw.drawImageParameters
    );
  });
}); */
