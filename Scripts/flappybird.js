

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
  document.addEventListener("keydown", moveBird);
  document.addEventListener("keyup", stopBird);

}


function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);
  bird.y = bird.y + velocityY;
  context.drawImage(birdImg, bird.x, bird.y, bird.height, bird.width);


  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x = pipe.x + velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
  }

}

function placePipes() {
  let randomPipeY = pipeY - boardHeight/4 - Math.random()*(pipeHeight/2);

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
  console.log(event);
  if (event.key === " " || event.key === "w") {
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


