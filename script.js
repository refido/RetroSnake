// Define html elements as variables for easy access in the script file
const board = document.getElementById("game-board");

// Define game variables
let snake = [{ x: 11, y: 11 }]; // Snake starting position

// Draw the game board, snake, and food
function draw() {
    board.innerHTML = ""; // Clear the board
    drawSnake();
}

// Draw the snake on the board
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

// Create a snake or food
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set the position of a snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// Test the draw function
draw();