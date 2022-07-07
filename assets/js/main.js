let game = new Game();
const startScreen = new Startscreen();
const deathScreen = new DeathScreen();
let currentGameState = GAME_STATES.start;
let canSaveScore = true;

function setup() {
  pixelDensity(1);
  // volume(1);
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
  if (
    currentGameState === GAME_STATES.start ||
    currentGameState === GAME_STATES.dead
  ) {
    if (keyCode === KEY_ENTER) {
      this.soundSelect.play();
      game.reset();
      currentGameState = GAME_STATES.play;
      this.soundFight.play();
      this.soundFight.loop();
    }
  }
  if (currentGameState === GAME_STATES.play) {
    game.keyPressed();
  }
}

function keyReleased() {
  game.keyReleased();
}

function preload() {
  this.soundSelect = loadSound("assets/sounds/Menu11.wav");
  this.soundFight = loadSound("assets/sounds/17 - Fight.ogg");
  this.soundFight.setVolume(0.75);
  this.soundGameOver = loadSound("assets/sounds/GameOver.wav");
  this.soundGameOver.setVolume(0.75);
  game.preload();
  deathScreen.preload();
  startScreen.preload();
}

// Set Game State based on Player Health
function setGameState() {
  if (
    game.player.state === PLAYER_STATES.dead &&
    currentGameState !== GAME_STATES.dead
  ) {
    this.soundFight.stop();
    currentGameState = GAME_STATES.dead;
    this.soundGameOver.play();
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
