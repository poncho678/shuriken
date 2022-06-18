const game = new Game();

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  background("orange");
  game.draw();
}
function keyPressed() {
  game.keyPressed();
}

function preload() {
  game.preload();
}
