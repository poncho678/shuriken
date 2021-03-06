class Player {
  constructor() {
    this.width = PLAYER_SIZE;
    this.height = PLAYER_SIZE;
    this.x = PLAYER_BASESTATS.x;
    this.y = PLAYER_BASESTATS.y;
    this.projectileArray = [];
    this.state = PLAYER_STATES.idle;
    this.direction = PLAYER_DIRECTIONS.down;
    this.moveSpeed = PLAYER_BASESTATS.moveSpeed;
    this.moveSpeedNormal = PLAYER_BASESTATS.moveSpeed;
    this.health = PLAYER_BASESTATS.health;
    this.maxHealth = PLAYER_BASESTATS.maxHealth;
    this.strength = PLAYER_BASESTATS.strength;
    this.shurikenCount = PLAYER_BASESTATS.shurikenCount;
    this.maxShuriken = PLAYER_BASESTATS.maxShuriken;
    this.attackMoment = 0;
    this.gotHit = false;
    this.gotHitMoment = 0;
  }

  draw() {
    // moving the player
    if (this.state !== PLAYER_STATES.dead) {
      this.move();
      this.setStates();
    }

    const { state, direction } = this;
    const playerSprite = this.playerSprites[state][direction];
    const index = frameCount % playerSprite.length;

    //draw shadow
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

    push();
    if (this.gotHit) {
      tint(255, 0, 0);
    }
    // drawing the player
    image(
      playerSprite[index].img,
      this.x,
      this.y,
      this.width,
      this.height,
      playerSprite[index].x,
      playerSprite[index].y,
      playerSprite[index].width,
      playerSprite[index].height
    );
    if (this.gotHitMoment + 3 <= frameCount && this.gotHit) {
      this.gotHit = false;
      noTint();
    }
    pop();
    // Shooting Mechanics
    this.projectileArray.forEach((projectile) => {
      projectile.draw();
    });
    if (
      this.attackMoment + 20 <= frameCount &&
      frameCount % 18 === 0 &&
      this.shurikenCount < this.maxShuriken
    ) {
      this.shurikenCount++;
    }

    // Removing bad projectiles
    this.cleanUpShuriken();
  }

  setStates() {
    if (this.health <= 0) {
      this.state = PLAYER_STATES.dead;
      return;
    } else if (keyIsPressed && !keyIsDown(SPACE_BAR)) {
      this.state = PLAYER_STATES.walk;
    } else if (
      this.state === PLAYER_STATES.attack &&
      this.attackMoment + 15 >= frameCount
    ) {
      return;
    } else {
      this.state = PLAYER_STATES.idle;
    }
  }

  move() {
    if (keyIsDown(ARROW_LEFT) || keyIsDown(KEY_A)) {
      if (this.x >= 0) {
        this.x -= this.moveSpeed;
        this.direction = PLAYER_DIRECTIONS.left;
      }
    }

    if (keyIsDown(ARROW_RIGHT) || keyIsDown(KEY_D)) {
      if (this.x <= CANVAS_WIDTH - this.width) {
        this.x += this.moveSpeed;
        this.direction = PLAYER_DIRECTIONS.right;
      }
    }

    if (keyIsDown(ARROW_DOWN) || keyIsDown(KEY_S)) {
      if (this.y <= CANVAS_HEIGHT - this.height) {
        this.y += this.moveSpeed;
        this.direction = PLAYER_DIRECTIONS.down;
      }
    }
    if (keyIsDown(ARROW_UP) || keyIsDown(KEY_W)) {
      if (this.y >= 0) {
        this.y -= this.moveSpeed;
        this.direction = PLAYER_DIRECTIONS.up;
      }
    }
    if (keyIsDown(KEY_SHIFT)) {
      this.moveSpeed = this.moveSpeedNormal * 1.25;
    }
  }

  keyPressed() {
    if (
      keyCode === SPACE_BAR &&
      this.state !== PLAYER_STATES.dead &&
      this.shurikenCount > 0 &&
      this.moveSpeed === this.moveSpeedNormal
    ) {
      this.shuriken();
      soundAttack.play();
    }
  }
  keyReleased() {
    if (keyCode === KEY_SHIFT) {
      this.moveSpeed = this.moveSpeedNormal;
    }
  }

  // firing projectiles
  shuriken() {
    this.state = PLAYER_STATES.attack;
    this.attackMoment = frameCount;
    let left, top;

    if (this.direction === PLAYER_DIRECTIONS.up) {
      left = this.x + this.width * 0.3;
      top = this.y - PLAYER_SIZE / 4;
    } else if (this.direction === PLAYER_DIRECTIONS.down) {
      left = this.x + this.width * 0.4;
      top = this.y + this.height + PLAYER_SIZE / 4;
    } else if (this.direction === PLAYER_DIRECTIONS.left) {
      left = this.x - PLAYER_SIZE / 4;
      top = this.y + this.height * 0.75;
    } else {
      left = this.x + this.width + PLAYER_SIZE / 4;
      top = this.y + this.height * 0.75;
    }
    this.projectileArray.push(new Projectile(left, top, this.direction));
    this.shurikenCount--;
  }

  // removing bad projectiles
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

  // always update the reset after changing constructor.
  reset() {
    this.x = PLAYER_BASESTATS.x;
    this.y = PLAYER_BASESTATS.y;
    this.moveSpeed = PLAYER_BASESTATS.moveSpeed;
    this.health = PLAYER_BASESTATS.health;
    this.maxHealth = PLAYER_BASESTATS.maxHealth;
    this.strength = PLAYER_BASESTATS.strength;
    this.shurikenCount = PLAYER_BASESTATS.shurikenCount;
    this.maxShuriken = PLAYER_BASESTATS.maxShuriken;

    this.state = PLAYER_STATES.idle;
    this.direction = PLAYER_DIRECTIONS.down;
    this.projectileArray = [];
    this.attackMoment = 0;
  }

  preload() {
    soundAttack = loadSound("assets/sounds/Fireball.wav");
    soundAttack.setVolume(0.2);

    // loading Pprojectileimage here, because no idea how else to preload...
    shurikenImage = [loadImage("assets/images/weapons/shuriken/shuriken.png")];
    // adding PlayerSprites
    this.playerSprites = {
      [PLAYER_STATES.attack]: {
        [PLAYER_DIRECTIONS.down]: [
          {
            img: loadImage("assets/images/player/Attack.png"),
            x: 0,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.up]: [
          {
            img: loadImage("assets/images/player/Attack.png"),
            x: 16,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.left]: [
          {
            img: loadImage("assets/images/player/Attack.png"),
            x: 32,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.right]: [
          {
            img: loadImage("assets/images/player/Attack.png"),
            x: 48,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
      },
      [PLAYER_STATES.idle]: {
        [PLAYER_DIRECTIONS.down]: [
          {
            img: loadImage("assets/images/player/Idle.png"),
            x: 0,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.up]: [
          {
            img: loadImage("assets/images/player/Idle.png"),
            x: 16,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.left]: [
          {
            img: loadImage("assets/images/player/Idle.png"),
            x: 32,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.right]: [
          {
            img: loadImage("assets/images/player/Idle.png"),
            x: 48,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
      },
      [PLAYER_STATES.walk]: {
        [PLAYER_DIRECTIONS.down]: [
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 0,
            y: 0,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 0,
            y: 16,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 0,
            y: 32,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 0,
            y: 48,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.up]: [
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 16,
            y: 0,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 16,
            y: 16,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 16,
            y: 32,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 16,
            y: 48,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.left]: [
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 32,
            y: 0,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 32,
            y: 16,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 32,
            y: 32,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 32,
            y: 48,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.right]: [
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 48,
            y: 0,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 48,
            y: 16,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 48,
            y: 32,
            width: 16,
            height: 16,
          },
          {
            img: loadImage("assets/images/player/Walk.png"),
            x: 48,
            y: 48,
            width: 16,
            height: 16,
          },
        ],
      },
      [PLAYER_STATES.dead]: {
        [PLAYER_DIRECTIONS.down]: [
          {
            img: loadImage("assets/images/player/Dead.png"),
            x: 0,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.up]: [
          {
            img: loadImage("assets/images/player/Dead.png"),
            x: 0,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.left]: [
          {
            img: loadImage("assets/images/player/Dead.png"),
            x: 0,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
        [PLAYER_DIRECTIONS.right]: [
          {
            img: loadImage("assets/images/player/Dead.png"),
            x: 0,
            y: 0,
            width: 16,
            height: 16,
          },
        ],
      },
    };
  }
}
