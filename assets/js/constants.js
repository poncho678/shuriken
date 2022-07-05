// Game Settings
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = (CANVAS_WIDTH / 16) * 10;
const PLAYER_SIZE = CANVAS_WIDTH / 16;
const TILESIZE = 32;

const GAME_STATES = {
  start: "start",
  play: "play",
  dead: "dead",
};
Object.freeze(GAME_STATES);

// UI COLORS
const textColor = [211, 151, 151];

// Keyboard Inputs
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;
const SPACE_BAR = 32;
const KEY_SHIFT = 16;
const KEY_ENTER = 13;

// Images
let shurikenImage;
let opponentSprites;

// Player Settings

const PLAYER_BASESTATS = {
  x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2,
  y: CANVAS_HEIGHT / 2 - PLAYER_SIZE * 1.75,
  health: 3,
  healthCap: 6,
  maxHealth: 3,
  moveSpeed: CANVAS_WIDTH / 150,
  moveSpeedCap: (CANVAS_WIDTH / 150) * 1.5,
  projectileSpeed: 15,
  strength: 1,
  strengthCap: 3,
  shurikenCount: 3,
  maxShuriken: 4,
  shurikenCap: 15,
};
Object.freeze(PLAYER_BASESTATS);

const PLAYER_DIRECTIONS = {
  up: "up",
  down: "down",
  right: "right",
  left: "left",
};
Object.freeze(PLAYER_DIRECTIONS);

const PLAYER_STATES = {
  attack: "attack",
  idle: "idle",
  walk: "walk",
  dead: "dead",
};
Object.freeze(PLAYER_STATES);

// Opponent Settings
const OPPONENT_DIRECTIONS = {
  up: "up",
  down: "down",
  right: "right",
  left: "left",
};
Object.freeze(OPPONENT_DIRECTIONS);

//
const capReached = "capReached";
