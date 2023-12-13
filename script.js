// Define html elements as variables for easy access in the script file
const board = document.getElementById('game-board');

// Define game variables
let gridSize = 20; // Size of the game board
let snake = [{ x: 11, y: 11 }]; // Snake starting position
let food = generateRandomPosition(); // Food starting position
let direction = 'right'; // Snake starting direction
// let direction = 'left'; 
// let direction = 'up'; 
// let direction = 'down'; 

// Generate a random position for the food
function generateRandomPosition() {
    const position = {
        x: Math.floor(Math.random() * gridSize) + 1, // Random number between 1 and 20
        y: Math.floor(Math.random() * gridSize) + 1,
    };
    return position;
}

// Create a snake or food element
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set the position of a snake or food element
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// Draw the snake on the board
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

// Draw the food on the board
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

// Draw the game board, snake, and food
function draw() {
    board.innerHTML = ''; // Clear the board
    drawSnake();
    drawFood();
}

// Move the snake
function move() {
    const head = snake[0]; // Get the head of the snake
    switch (direction) {
        case 'right':
            head.x++; // Move the snake right by incrementing the x position, e.g. from (1, 1) to (2, 1)
            break;
        case 'left':
            head.x--; // e.g. from (1, 1) to (0, 1)
            break;
        case 'up':
            head.y--; // e.g. from (1, 1) to (1, 0)
            break;
        case 'down':
            head.y++; // e.g. from (1, 1) to (1, 2)
            break;
        default:
            break;
    }
    snake.unshift(head); // add the new head to make it look like it's moving
    snake.pop(); // remove the snake in the last position to make it look like it's moving
}

// Test the function
setInterval(() => {
    move();
    draw();
}, 200);