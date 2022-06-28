// Settings
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = (CANVAS_WIDTH / 16) * 10;
const PLAYER_SIZE = CANVAS_WIDTH / 16;
const TILESIZE = 32;

const GAME_STATE = {
  start: "start",
  play: "play",
  dead: "dead",
};
Object.freeze(GAME_STATE);

// Keys
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const SPACE_BAR = 32;

// Images
let shurikenImage;
let opponentSprites;

// PLAYER
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

// Opponent
const OPPONENT_DIRECTIONS = {
  up: "up",
  down: "down",
  right: "right",
  left: "left",
};
Object.freeze(OPPONENT_DIRECTIONS);
