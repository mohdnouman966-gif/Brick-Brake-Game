const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let score = 0;
let lives = 3;
let ballX = 400;
let ballY = 450;
let ballDX = 4;
let ballDY = -4;
const ballRadius = 8;
const paddleWidth = 100;
const paddleHeight = 12;
let paddleX = 350;
let leftPressed = false;
let rightPressed = false;
const rows = 5;
const columns = 8;
const brickWidth = 80;
const brickHeight = 20;
const brickGap = 10;
let bricks = [];
function createBricks() {
    bricks = [];
    for (let row = 0; row < rows; row++) {
        bricks[row] = [];
        for (let column = 0; column < columns; column++) {
            bricks[row][column] = true;
        }
    }
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(
        ballX,
        ballY,
        ballRadius,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
        paddleX,
        470,
        paddleWidth,
        paddleHeight
    );
}
function drawBricks() {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (bricks[row][column]) {
                let x =
                    25 +
                    column * (brickWidth + brickGap);
                let y =
                    50 +
                    row * (brickHeight + brickGap);
                ctx.fillStyle = "red";
                ctx.fillRect(
                    x,
                    y,
                    brickWidth,
                    brickHeight
                );
            }
        }
    }
}
function checkBrickCollision() {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (bricks[row][column]) {
                let brickX =
                    25 +
                    column * (brickWidth + brickGap);
                    let brickY =
                    50 +
                    row * (brickHeight + brickGap);
                if (
                    ballX > brickX &&
                    ballX < brickX + brickWidth &&
                    ballY > brickY &&
                    ballY < brickY + brickHeight
                ) {
                    ballDY = -ballDY;
                    bricks[row][column] = false;
                    score++;
                    document.getElementById("score").textContent = score;
                    if (score === rows * columns) {
                        alert(" YOU WIN!");
                        restartGame();
                    }
                }
            }
        }
    }
}
function update() {
    ballX += ballDX;
    ballY += ballDY;
    if (ballX - ballRadius <= 0) {
        ballDX = -ballDX;
    }
    if (ballX + ballRadius >= canvas.width) {
        ballDX = -ballDX;
    }
    if (ballY - ballRadius <= 0) {
        ballDY = -ballDY;
    }
    if (
        ballY + ballRadius >= 470 &&
        ballX >= paddleX &&
        ballX <= paddleX + paddleWidth
    ) {
        ballDY = -Math.abs(ballDY);
    }
    if (ballY > canvas.height) {
        lives--;
        document.getElementById("lives").textContent = lives;
        if (lives <= 0) {
            alert("💀 GAME OVER!");
            restartGame();
        } else {
            ballX = 400;
            ballY = 450;
            ballDX = 4;
            ballDY = -4;
        }
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    if (
        rightPressed &&
        paddleX < canvas.width - paddleWidth
    ) {
        paddleX += 7;
    }
    checkBrickCollision();
}
function gameLoop() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    drawBricks();
    drawBall();
    drawPaddle();
    update();
    requestAnimationFrame(gameLoop);
}
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        leftPressed = true;
    }
    if (event.key === "ArrowRight") {
        rightPressed = true;
    }
});
document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowLeft") {
        leftPressed = false;
    }
    if (event.key === "ArrowRight") {
        rightPressed = false;
    }
});
function restartGame() {
    score = 0;
    lives = 3;
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
    ballX = 400;
    ballY = 450;
    ballDX = 4;
    ballDY = -4;
    paddleX = 350;
    createBricks();
}
createBricks();
gameLoop();