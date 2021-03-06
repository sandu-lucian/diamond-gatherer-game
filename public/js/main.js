// Diamond Gatherer Game

const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");

// Socket io setup

const socket = io();

document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "KeyW":
      socket.emit("start-moving-player", "up");
      break;
    case "KeyS":
      socket.emit("start-moving-player", "down");
      break;
    case "KeyA":
      socket.emit("start-moving-player", "left");
      break;
    case "KeyD":
      socket.emit("start-moving-player", "right");
      break;
    case "Space":
      socket.emit("attack");
      break;
  }
});

document.addEventListener("keyup", function (e) {
  switch (e.code) {
    case "KeyW":
    case "KeyS":
      socket.emit("stop-moving-player", "dy");
      break;
    case "KeyA":
    case "KeyD":
      socket.emit("stop-moving-player", "dx");
      break;
  }
});

document
  .getElementById("create-game-button")
  .addEventListener("click", function () {
    const input = document.getElementById("game-name-input");
    const gameName = input.value;

    if (gameName.length > 0) {
      document.getElementById("gamename-missing").classList.add("invisible");
      socket.emit("create-game", gameName);
    } else {
      document.getElementById("gamename-missing").classList.remove("invisible");
    }
  });

document
  .getElementById("back-to-menu-btn")
  .addEventListener("click", function () {
    socket.emit(
      "return-to-menu",
      document.getElementById("back-to-menu-btn").dataset.gameId
    );
  });

socket.on("menu", function () {
  document.getElementById("menu").classList.remove("d-none");
  document.getElementById("game-container").classList.add("d-none");
});

socket.on("game-loop", function (data) {
  document.getElementById("menu").classList.add("d-none");
  document.getElementById("back-to-menu-btn").classList.add("invisible");
  document.getElementById("game-container").classList.remove("d-none");

  context.drawImage(document.getElementById("map-image"), 0, 0);

  data.objectsForDraw.forEach(function (objectForDraw) {
    context.drawImage(
      document.getElementById(objectForDraw.imageId),
      ...objectForDraw.drawImageParameters
    );
  });

  if (data.gameInProgress) {
    document.getElementById("waiting-for-players").classList.add("d-none");
    document.getElementById("space-ranger-score").innerHTML =
      data.score["space-ranger"];
    document.getElementById("pink-lady-score").innerHTML =
      data.score["pink-lady"];
    document.getElementById("remaining-diamonds").innerHTML =
      data.score["remaining-diamonds"];
  } else {
    document.getElementById("waiting-for-players").classList.remove("d-none");
  }
});

socket.on("add-game-to-list", function (options) {
  const gameElementContainer = document.createElement("div");
  gameElementContainer.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "mx-3",
    "my-1",
    "mw-100",
    "border-bottom",
    "game-element"
  );
  gameElementContainer.id = options.gameId;

  const gameNameElement = document.createElement("span");
  gameNameElement.innerHTML = options.gameName;

  const joinGameBtn = document.createElement("button");
  joinGameBtn.classList.add("btn", "btn-success");
  joinGameBtn.innerHTML = "Join Game!";

  joinGameBtn.addEventListener("click", function () {
    socket.emit("join-game", options.gameId);
  });

  gameElementContainer.appendChild(gameNameElement);
  gameElementContainer.appendChild(joinGameBtn);

  document.getElementById("game-list").appendChild(gameElementContainer);
});

socket.on("remove-game-from-list", function (gameId) {
  document.getElementById(gameId).remove();
});

socket.on("game-over", function (imageId, gameId) {
  context.drawImage(document.getElementById(imageId), 0, 0);
  document.getElementById("back-to-menu-btn").classList.remove("invisible");
  document.getElementById("back-to-menu-btn").dataset.gameId = gameId;
});
