class Opponent {
  constructor(player) {
    this.player = player;
    this.width = PLAYER_SIZE;
    this.height = PLAYER_SIZE;
    this.x = this.spawnRandom(0, CANVAS_WIDTH - this.width, this.player.x);
    this.y = this.spawnRandom(0, CANVAS_HEIGHT - this.height, this.player.y);
    this.direction = OPPONENT_DIRECTIONS.down;
    this.health = 3;
    this.maxHealth = 3;
    this.speed = 2;
    this.gotHit = false;
    this.gotHitMoment = 0;
  }
  draw() {
    // Creating a vector to make the opponent follow the player
    let move = createVector(this.x - this.player.x, this.y - this.player.y);
    move.normalize();
    this.x -= move.x * this.speed;
    this.y -= move.y * this.speed;

    const direction = this.calculateDirection(move.x, move.y);
    const opponentSprite = opponentSprites[direction];
    const index = frameCount % opponentSprite.length;

    //draw dropshadow
    push();
    fill(0, 0, 0, 55);
    noStroke();
    ellipse(
      this.x + this.width / 2,
      this.y + this.height,
      this.width,
      this.height / 3
    );
    pop();

    // draw opponent
    push();

    // If Opponent gets hit, Color The Image for a few Frames
    if (this.gotHit) {
      tint(255, 0, 0);
    }
    if (this.gotHitMoment + 3 <= frameCount && this.gotHit) {
      this.gotHit = false;
    }
    image(
      opponentSprite[index].img,
      this.x,
      this.y,
      this.width,
      this.height,
      opponentSprite[index].x,
      opponentSprite[index].y,
      opponentSprite[index].width,
      opponentSprite[index].height
    );
    pop();

    // draw healthbar
    push();
    fill("red");
    rect(
      this.x,
      this.y - this.height / 16,
      this.width -
        (this.width / this.maxHealth) * (this.maxHealth - this.health),
      this.height / 10
    );
    pop();
  }
  shoot() {}

  // Spawnlogic to create safespace for player and prevent spawn ontop of player
  spawnRandom(min, max, axis) {
    let newRandom = random(min, max);
    if (
      newRandom > axis - PLAYER_SIZE * 2 &&
      newRandom < axis + PLAYER_SIZE * 2
    ) {
      return this.spawnRandom(min, max, axis);
    }
    return newRandom;
  }

  // Determin in which direction the opponent is facing.
  calculateDirection(vectorX, vectorY) {
    if (vectorX < 0 && vectorY < 0) {
      if (Math.abs(vectorX) > Math.abs(vectorY)) {
        return OPPONENT_DIRECTIONS.right;
      } else {
        return OPPONENT_DIRECTIONS.down;
      }
    } else if (vectorX < 0 && vectorY > 0) {
      if (Math.abs(vectorX) > Math.abs(vectorY)) {
        return OPPONENT_DIRECTIONS.right;
      } else {
        return OPPONENT_DIRECTIONS.up;
      }
    } else if (vectorX > 0 && vectorY < 0) {
      if (Math.abs(vectorX) > Math.abs(vectorY)) {
        return OPPONENT_DIRECTIONS.left;
      } else {
        return OPPONENT_DIRECTIONS.down;
      }
    } else {
      if (Math.abs(vectorX) > Math.abs(vectorY)) {
        return OPPONENT_DIRECTIONS.left;
      } else {
        return OPPONENT_DIRECTIONS.up;
      }
    }
  }
}
