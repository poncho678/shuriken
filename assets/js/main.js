let game = new Game();

function setup() {
  pixelDensity(1);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  noSmooth();
  game.play();
}
function keyPressed() {
  game.keyPressed();
}

function preload() {
  game.preload();
}
