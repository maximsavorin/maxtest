const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let score = 0;
let direction = "RIGHT";
let snake = [{ x: boxSize * 5, y: boxSize * 5 }];
let food = {
    x: Math.floor(Math.random() * canvas.width / boxSize) * boxSize,
    y: Math.floor(Math.random() * canvas.height / boxSize) * boxSize
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (key === 38 && direction !== "DOWN") direction = "UP";
    else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (key === 40 && direction !== "UP") direction = "DOWN";
}

function drawSnake() {
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "green";
        ctx.fillRect(part.x, part.y, boxSize, boxSize);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(part.x, part.y, boxSize, boxSize);
    });
}

function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "UP") head.y -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;
    if (direction === "DOWN") head.y += boxSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * canvas.width / boxSize) * boxSize,
            y: Math.floor(Math.random() * canvas.height / boxSize) * boxSize
        };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const [head, ...body] = snake;

    const hitWall = head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height;
    const hitBody = body.some(part => part.x === head.x && part.y === head.y);

    return hitWall || hitBody;
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function gameLoop() {
    if (checkCollision()) {
        alert("Game Over");
        location.reload();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFood();
    moveSnake();
    drawSnake();
    drawScore();
}

setInterval(gameLoop, 100);
