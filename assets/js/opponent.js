class Opponent {
  constructor(player) {
    this.player = player;
    this.width = PLAYER_SIZE;
    this.height = PLAYER_SIZE;
    this.x = this.spawnRandom(0, CANVAS_WIDTH - this.width, this.player.x);
    this.y = this.spawnRandom(0, CANVAS_HEIGHT - this.height, this.player.y);
    this.health = 3;
    this.maxHealth = 3;
    this.speed = 2;
  }
  draw() {
    // draw opponent
    push();

    rect(this.x, this.y, this.width, this.height);
    pop();

    // draw healthbar
    push();
    fill("red");
    rect(
      this.x,
      this.y,
      this.width -
        (this.width / this.maxHealth) * (this.maxHealth - this.health),
      this.height / 10
    );
    pop();

    // Creating a vector to make opponent follow player
    let move = createVector(this.x - this.player.x, this.y - this.player.y);
    move.normalize();
    this.x -= move.x * this.speed;
    this.y -= move.y * this.speed;
  }
  shoot() {}

  // Spawnlogic to create safespace for player and prevent spawn ontop of player
  spawnRandom(min, max, axis) {
    let newRandom = random(min, max);
    if (
      newRandom > axis - PLAYER_SIZE * 2 &&
      newRandom < axis + PLAYER_SIZE * 3
    ) {
      return this.spawnRandom(min, max, axis);
    }
    return newRandom;
  }
  preload() {
    this.opponentImg = {
      [OPPONENT_DIRECTIONS.down]: [
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 0,
          y: 0,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 0,
          y: 16,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 0,
          y: 32,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 0,
          y: 48,
          width: 16,
          height: 16,
        },
      ],
      [OPPONENT_DIRECTIONS.up]: [
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 16,
          y: 0,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 16,
          y: 16,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 16,
          y: 32,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 16,
          y: 48,
          width: 16,
          height: 16,
        },
      ],
      [OPPONENT_DIRECTIONS.left]: [
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 32,
          y: 0,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 32,
          y: 16,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 32,
          y: 32,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 32,
          y: 48,
          width: 16,
          height: 16,
        },
      ],
      [OPPONENT_DIRECTIONS.right]: [
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 48,
          y: 0,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 48,
          y: 16,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 48,
          y: 32,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skeleton/Walk.png"),
          x: 48,
          y: 48,
          width: 16,
          height: 16,
        },
      ],
    };
  }
}
