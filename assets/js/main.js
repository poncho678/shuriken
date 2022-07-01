let game = new Game();
const startScreen = new Startscreen();
const deathScreen = new DeathScreen();
let currentGameState = GAME_STATES.start;

function setup() {
  pixelDensity(1);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  noSmooth();
  clear();

  if (currentGameState === GAME_STATES.start) {
    startScreen.draw();
  } else if (currentGameState === GAME_STATES.play) {
    game.play();
    setGameState();
  } else if (currentGameState === GAME_STATES.dead) {
    deathScreen.draw();
    game.reset();
  }
}
function keyPressed() {
  if (currentGameState === GAME_STATES.start || GAME_STATES.dead) {
    if (keyCode === KEY_ENTER) {
      currentGameState = GAME_STATES.play;
    }
  }
  if (currentGameState === GAME_STATES.play) {
    game.keyPressed();
  }
}

function preload() {
  game.preload();
  deathScreen.preload();
  startScreen.preload();
}

// Set Game State based on Player Health
function setGameState() {
  if (game.player.state === PLAYER_STATES.dead) {
    currentGameState = GAME_STATES.dead;
  }
}
