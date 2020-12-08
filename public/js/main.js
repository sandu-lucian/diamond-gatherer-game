// Diamond Gatherer Game

const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      socket.emit("start-moving-player", "up");
      break;
    case "ArrowDown":
      socket.emit("start-moving-player", "down");
      break;
    case "ArrowLeft":
      socket.emit("start-moving-player", "left");
      break;
    case "ArrowRight":
      socket.emit("start-moving-player", "right");
      break;
  }
});

document.addEventListener("keyup", function (e) {
  switch (e.key) {
    case "ArrowUp":
    case "ArrowDown":
      socket.emit("stop-moving-player", "dy");
      break;
    case "ArrowLeft":
    case "ArrowRight":
      socket.emit("stop-moving-player", "dx");
      break;
  }
});

// Socket io setup

const socket = io();

socket.on("menu", function () {
  document.getElementById("menu").classList.remove("display-none");
  document.getElementById("game-container").classList.add("display-none");
});

document
  .getElementById("create-game-button")
  .addEventListener("click", function () {
    const input = document.getElementById("game-name-input");
    const gameName = input.value;

    if (gameName.length > 0) {
      document.getElementById("gamename-missing").classList.add("display-none");
      document
        .getElementById("game-container")
        .classList.remove("display-none");
      socket.emit("create-game", gameName);
    } else {
      document
        .getElementById("gamename-missing")
        .classList.remove("display-none");
    }
  });

document
  .getElementById("back-to-menu-btn")
  .addEventListener("click", function () {
    socket.emit("return-to-menu");
  });

socket.on("game-loop", function (objectsForDraw) {
  document.getElementById("menu").classList.add("display-none");
  document.getElementById("game-container").classList.remove("display-none");

  context.drawImage(document.getElementById("map-image"), 0, 0);

  objectsForDraw.forEach(function (objectForDraw) {
    context.drawImage(
      document.getElementById(objectForDraw.imageId),
      ...objectForDraw.drawImageParameters
    );
  });
});

socket.on("add-game-to-list", function (options) {
  const gameElementContainer = document.createElement("div");
  gameElementContainer.classList.add("game-element");
  gameElementContainer.id = options.gameId;

  const gameNameElement = document.createElement("p");
  gameNameElement.innerHTML = options.gameName;

  const joinGameBtn = document.createElement("button");
  joinGameBtn.innerHTML = "Join Game!";

  joinGameBtn.addEventListener("click", function () {
    socket.emit("join-game", options.gameId);
  });

  gameElementContainer.appendChild(gameNameElement);
  gameElementContainer.appendChild(joinGameBtn);

  document.getElementById("game-list").appendChild(gameElementContainer);
});

socket.on("remove-game-from-list", function (gameId) {
  document.getElementById(gameId).classList.add("display-none");
});

socket.on("game-over", function (reason) {
  context.font = "30px Arial";
  context.fillText("Game Over", 420, 330);
  context.fillText(`${reason}`, 420, 370);
});
