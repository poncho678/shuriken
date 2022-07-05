let game = new Game();
const startScreen = new Startscreen();
const deathScreen = new DeathScreen();
let currentGameState = GAME_STATES.start;
let canSaveScore = true;

function setup() {
  pixelDensity(1);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  // no pixel smoothing
  noSmooth();

  // clear frame after every frame
  clear();

  if (currentGameState === GAME_STATES.start) {
    startScreen.draw();
  } else if (currentGameState === GAME_STATES.play) {
    canSaveScore = true;
    game.play();
    setGameState();
  } else if (currentGameState === GAME_STATES.dead) {
    if (canSaveScore) {
      highScores();
    }
    deathScreen.draw(game.score);
  }
}
function keyPressed() {
  if (currentGameState === GAME_STATES.start || GAME_STATES.dead) {
    if (keyCode === KEY_ENTER) {
      game.reset();
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

// Save Highscores
function highScores() {
  let highScores = JSON.parse(localStorage.getItem("HighScores"));
  if (highScores == null) {
    highScores = [];
  }
  if (!highScores.includes(game.score)) {
    highScores.push(game.score);
  }
  highScores.sort((a, b) => {
    return b - a;
  });
  localStorage.setItem("HighScores", JSON.stringify(highScores));
  canSaveScore = false;
}
