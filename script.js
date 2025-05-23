let blockSize = 25;
let rows = 25;
let cols = 30;
let board;
let context;

// Snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

// Food
let foodX;
let foodY;

// Game Over
let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10); // 100ms = 10 FPS
};

function update() {
  if (gameOver) return;

  context.fillStyle = "rgba(49, 70, 1, 0.6)";
  context.fillRect(0, 0, board.width, board.height);

  // Draw food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  // Snake eats food
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  // Move body
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  // Move head
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;

  // Draw snake
  context.fillStyle = "lime";
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // Game over: out of bounds
  if (
    snakeX < 0 ||
    snakeX >= cols * blockSize ||
    snakeY < 0 ||
    snakeY >= rows * blockSize
  ) {
    endGame();
  }

  // Game over: collision with self
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      endGame();
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function endGame() {
  gameOver = true;
  document.getElementById("game-over-message").innerText = "💀 Game Over!";
  document.getElementById("game-over-message").style.display = "block";
  document.getElementById("play-again-btn").style.display = "inline-block";
}

document.getElementById("play-again-btn").addEventListener("click", () => {
  // Reset everything
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
  gameOver = false;
  placeFood();
  document.getElementById("game-over-message").style.display = "none";
  document.getElementById("play-again-btn").style.display = "none";
});
