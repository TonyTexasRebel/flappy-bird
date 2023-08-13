

let board;
let boardHeight = 640;
let boardWidth = 360;
let context;


let birdWidth = 24;
let birdHeight = 34;
let birdX = boardWidth/7.5;
let birdY = boardHeight/2;
let birdImg;

let bird = {
  x : birdX,
  y : birdY,
  width : birdWidth,
  height : birdHeight
}

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let topPipeImg;
let bottomPipeImg;

let velocityX = -5;
let velocityY = 0;

let gameOver = false;
let score = 0;

window.onload = function() {

  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  context.fillRect(bird.x, bird.y, bird.height, bird.width);

  birdImg = new Image();
  birdImg.src = "/JS - Flappy Bird/Images/flappybird.png";
  birdImg.onload = function() {
    context.drawImage(birdImg, bird.x, bird.y, bird.height, bird.width);

  }
  topPipeImg = new Image();
  topPipeImg.src = "/JS - Flappy Bird/Images/toppipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "/JS - Flappy Bird/Images/bottompipe.png";

  requestAnimationFrame(update);
  setInterval(placePipes, 1100);

  //event listeners

  document.addEventListener("keydown", moveBird);
  document.addEventListener("keyup", stopBird);
  document.addEventListener("keydown", resetGame);

}


function update() {
  requestAnimationFrame(update);
  if (gameOver === true) {
    velocityX = 0;
    gameOverDrop();
    if (bird.y - 10 > boardHeight) {
      return;
    }
  }
  context.clearRect(0, 0, board.width, board.height);
  bird.y = Math.max(bird.y + velocityY, 0);
  context.drawImage(birdImg, bird.x, bird.y, bird.height, bird.width);

  //pipes

  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x = pipe.x + velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    detectCollision(bird, pipe);
    if (pipe.passed === false && bird.x > pipe.x + pipeWidth/2) {
      score = score + 0.5;
      pipe.passed = true;
    }
  }

  if (bird.y > boardHeight) {
    gameOver = true;
  }

  while(pipeArray.length > 0 && pipeArray[0].x < 0 - pipeWidth) {
    pipeArray.shift();
  }

  //score

  context.fillStyle = 'white';
  context.font = '45px sans-serif';
  context.fillText(score, 5, 45);

  //game over text
  if (gameOver === true) {
    context.fillText('Game Over', 5, 90);
    context.fillText('R to restart', 5, 200, 140);
  }

}

//functions

function placePipes() {
  let randomPipeY = pipeY - boardHeight/4 - Math.random()*(pipeHeight/2);
  if (gameOver === true) {
    return;
  }

  let topPipe = {
    img : topPipeImg,
    x : pipeX,
    y : randomPipeY,
    width : pipeWidth,
    height : pipeHeight,
    passed : false
  }

  let bottomPipe = {
    img : bottomPipeImg,
    x : pipeX,
    y : randomPipeY + pipeHeight + boardHeight/4 - 70,
    width : pipeWidth,
    height : pipeHeight,
    passed : false
  }

  pipeArray.push(topPipe);
  pipeArray.push(bottomPipe);
}

function moveBird(event) {
  if (event.key === "w") {
    velocityY = -6;

  } else if (event.key === "s") {
    velocityY = 6;
  }
}

function stopBird (event) {
  if (event.key === "w") {
    velocityY = 0;
  } else if (event.key === "s") {
    velocityY = 0;
  }
}

function detectCollision (bird, pipe) {
  if (bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      bird.y < pipe.y + pipe.height &&
      bird.y + bird.height > pipe.y) {
        
    gameOver = true;
  }
}


function gameOverDrop() {
  for (let i = 0; i < 22; i++) {
    bird.y = bird.y + 0.5;
  }
}


function resetGame(event) {
  if (event.code === 'KeyR' && gameOver === true) {
    bird.y = birdY;
    score = 0;
    velocityX = -5;
    pipeArray = [];
    gameOver = false;
  }
}
