

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

window.onload = function() {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  context.fillStyle = "blue";
  context.fillRect(bird.x, bird.y, bird.height, bird.width);

  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function() {
    context.drawImage(birdImg, bird.x, bird.y, bird.height, bird.width);
  }
}
