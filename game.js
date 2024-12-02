const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dino = { x: 50, y: 150, width: 30, height: 30, dy: 0, isJumping: false };
const obstacles = [];
const gravity = 0.5;
let score = 0;
let gameOver = false;

function createObstacle() {
  const obstacle = { x: canvas.width, y: 170, width: 20, height: 30, dx: -5 };
  obstacles.push(obstacle);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !dino.isJumping) {
    dino.dy = -10;
    dino.isJumping = true;
  }
});

function updateDino() {
  dino.y += dino.dy;
  if (dino.y >= 150) {
    dino.y = 150;
    dino.dy = 0;
    dino.isJumping = false;
  } else {
    dino.dy += gravity;
  }
}

function updateObstacles() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];
    obstacle.x += obstacle.dx;
    if (
      dino.x < obstacle.x + obstacle.width &&
      dino.x + dino.width > obstacle.x &&
      dino.y < obstacle.y + obstacle.height &&
      dino.y + dino.height > obstacle.y
    ) {
      gameOver = true;
    }
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(i, 1);
      score++;
    }
  }
  if (Math.random() < 0.02) {
    createObstacle();
  }
}

function drawDino() {
  ctx.fillStyle = "#00f";
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
  ctx.fillStyle = "#f00";
  obstacles.forEach((obstacle) =>
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
  );
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function gameLoop() {
  if (gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 75, canvas.height / 2);
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 50, canvas.height / 2 + 40);
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateDino();
  updateObstacles();
  drawDino();
  drawObstacles();
  drawScore();
  requestAnimationFrame(gameLoop);
}

createObstacle();
gameLoop();
