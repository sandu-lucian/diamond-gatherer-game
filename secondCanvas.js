const btn = document.getElementById("random-btn");

const canvas = document.getElementById("canvas2");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");

const randomCoord = (side) => Math.floor(side * Math.random());

btn.addEventListener("click", function (event) {
  context.clearRect(0, 0, 600, 400);
  context.fillStyle = "red";
  context.fillRect(randomCoord(250), randomCoord(120), 40, 20);
});
