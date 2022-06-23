class Player {
  constructor() {
    this.width = PLAYER_SIZE;
    this.height = PLAYER_SIZE;
    this.moveSpeed = CANVAS_WIDTH / 150;
    this.direction = "right";
    this.x = CANVAS_WIDTH / 2 - this.width / 2;
    this.y = CANVAS_HEIGHT / 2 - this.height / 2;
    this.projectileArray = [];
    this.health = 3;
    this.maxHealth = 3;
  }

  draw() {
    rect(this.x, this.y, this.width, this.height);
    this.move();

    // Shooting Mechanics
    this.projectileArray.forEach((projectile) => {
      projectile.draw();
    });

    // Removing bad projectiles
    this.cleanUpShuriken();
  }

  move() {
    if (keyIsDown(ARROW_UP)) {
      if (this.y >= 0) {
        this.y -= this.moveSpeed;
        this.direction = "up";
      }
    }
    if (keyIsDown(ARROW_DOWN)) {
      if (this.y <= CANVAS_HEIGHT - this.height) {
        this.y += this.moveSpeed;
        this.direction = "down";
      }
    }
    if (keyIsDown(ARROW_LEFT)) {
      if (this.x >= 0) {
        this.x -= this.moveSpeed;
        this.direction = "left";
      }
    }
    if (keyIsDown(ARROW_RIGHT)) {
      if (this.x <= CANVAS_WIDTH - this.width) {
        this.x += this.moveSpeed;
        this.direction = "right";
      }
    }

    // diagonals
    if (keyIsDown(ARROW_UP) && keyIsDown(ARROW_LEFT)) {
      this.direction = "up left";
    }
    if (keyIsDown(ARROW_UP) && keyIsDown(ARROW_RIGHT)) {
      this.direction = "up right";
    }
    if (keyIsDown(ARROW_DOWN) && keyIsDown(ARROW_LEFT)) {
      this.direction = "down left";
    }
    if (keyIsDown(ARROW_DOWN) && keyIsDown(ARROW_RIGHT)) {
      this.direction = "down right";
    }
  }

  keyPressed() {
    if (keyCode === SPACE_BAR) {
      this.shuriken();
    }
  }

  shuriken() {
    this.projectileArray.push(
      new Projectile(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.direction
      )
    );
  }

  cleanUpShuriken() {
    this.projectileArray = this.projectileArray.filter((item) => {
      return (
        item.x <= CANVAS_WIDTH &&
        item.x >= 0 &&
        item.y <= CANVAS_HEIGHT &&
        item.y >= 0
      );
    });
  }

  dash() {}

  preload() {
    shurikenImage = [
      loadImage("/assets/images/weapons/shuriken/shuriken_level_1.png"),
    ];
  }
}
