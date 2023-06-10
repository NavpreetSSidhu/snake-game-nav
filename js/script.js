// Game constants and variables
let inputDir = {x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveAudio = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
let food = {x: 6, y: 7};
let score = 0;

// Game function starts here

function main(cTime) {
    window.requestAnimationFrame(main);
    // console.log(cTime);
    if((cTime - lastPaintTime)/1000 < 1/speed) return;
    lastPaintTime = cTime;
    gameEngine();
}

function isCollide(snake) {
    // if you bump in yourself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        return true
    }
    // If you collapse with wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0)
        return true;

    return false;
}

function gameEngine() {
    musicSound.play();
    // Part 1 updating snake array
    if(isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        score = 0;
        scoreBox.innerHTML = "Score :" + score;
        inputDir = {x: 0, y: 0};
        alert('Game over. Press any key to play again!');
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
    }

    // if you have eaten the food increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score++;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score :" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b-a)*Math.random()), 
            y: Math.round(a + (b-a)*Math.random())
        } 
    }

    // moving the snake 

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // new Object created usign spread operator to accomodate for the snake segment at 0th index
        snakeArr[i+1] = {...snakeArr[i]}; 
        }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score:" + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', event=> {
    inputDir = {x: 0, y: 1} // The game has started
    moveAudio.play();
    switch (event.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
}); 