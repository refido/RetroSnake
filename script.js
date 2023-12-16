// Define html elements as variables for easy access in the script file
const board = document.getElementById('game-board');
const instructions = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScore = document.getElementById('high-score');
const timer = document.getElementById('timer');

// Define game variables
const gridSize = 20; // Size of the game board
let snake = [{ x: 10, y: 10 }]; // Snake starting position
let food = generateFood(); // Food starting position
let direction = 'right'; // Snake starting direction
let gameInterval; // Variable to store the setInterval function
let gameSpeed = 200; // Time between each move in milliseconds
let gameStarted = false;
let time; // Variable to store the setInterval function

// Generate a random position for the food
function generateFood() {
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
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

// Draw the game board, snake, and food
function draw() {
    board.innerHTML = ''; // Clear the board
    drawSnake();
    drawFood();
    updateScore();
}

// Move the snake
function move() {
    const head = { ...snake[0] }; // Create a copy of the snake head
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

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        speed();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeed);
    } else {
        snake.pop(); // remove the snake in the last position to make it look like it's moving
    }
}

// Adjust the game speed
function speed() {    
    if (gameSpeed > 150) {
        gameSpeed -= 5;
    } else if (gameSpeed > 100) {
        gameSpeed -= 3;
    } else if (gameSpeed > 50) {
        gameSpeed -= 2;
    } else if (gameSpeed > 25) {
        gameSpeed -= 1;
    }
}

// Check if the snake has hit the wall or itself
function checkCollision() {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        gameOver();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

// Start the game
function startGame() {
    gameStarted = true; // keep track of whether the game has started
    instructions.style.display = 'none'; // hide the instructions
    logo.style.display = 'none'; // hide the logo
    speed();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeed);
    timerStart();
}

// Update the score
function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(4, '0');
}

// timer
function timerStart() {    
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    clearInterval(time);
    time = setInterval(() => {  
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Update the high score
function updateHighScore() {
    highScore.textContent = score.textContent > highScore.textContent ? score.textContent + '👑' : highScore.textContent;
    highScore.style.display = 'block';
}

// End the game
function gameOver() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }]; // reset the snake position
    food = generateFood(); // reset the food position
    direction = 'right'; // reset the snake direction
    gameSpeed = 200; // reset the game speed    
}

// Stop the game
function stopGame() {
    clearInterval(gameInterval); // stop the game
    clearInterval(time); // stop the timer
    timer.textContent = '00:00:00'; // reset the timer
    gameStarted = false; // reset the gameStarted variable
    instructions.style.display = 'block'; // show the instructions
    logo.style.display = 'block'; // show the logo
}

// Handle keypresses
function handleKeyPress(event) {
    if ((!gameStarted && (event.key === 'Space')) || (!gameStarted) && (event.key === ' ')) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowRight':
                direction = 'right';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            default:
                break;
        }
    }
}

// Add event listeners
document.addEventListener('keydown', handleKeyPress);