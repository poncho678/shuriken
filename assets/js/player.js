class Player {
  constructor() {
    this.width = PLAYER_SIZE;
    this.height = PLAYER_SIZE;
    this.x = CANVAS_WIDTH / 2 - this.width / 2;
    this.y = CANVAS_HEIGHT / 2 - this.height / 2;
    this.projectileArray = [];
    this.state = PLAYER_STATES.idle;
    this.direction = PLAYER_DIRECTIONS.down;
    this.moveSpeed = CANVAS_WIDTH / 150;
    this.health = 3;
    this.maxHealth = 3;
    this.attackMoment = 0;

    // change to attributes, when implementing powerups
    // this.attributes = {
    //   attackSpeed: "",
    //   projectileSpeed: "",
    //   strength: 1,
    //   moveSpeed: CANVAS_WIDTH / 150,
    //   health: 3,
    //   maxHealth: 3,
    // };
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

    // Shooting Mechanics
    this.projectileArray.forEach((projectile) => {
      projectile.draw();
    });

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
      this.attackMoment + 30 >= frameCount
    ) {
      return;
    } else {
      this.state = PLAYER_STATES.idle;
    }
  }

  move() {
    if (keyIsDown(ARROW_LEFT)) {
      if (this.x >= 0) {
        this.x -= this.moveSpeed;
        this.direction = PLAYER_DIRECTIONS.left;
      }
    }

    if (keyIsDown(ARROW_RIGHT)) {
      if (this.x <= CANVAS_WIDTH - this.width) {
        this.x += this.moveSpeed;
        this.direction = PLAYER_DIRECTIONS.right;
      }
    }

    if (keyIsDown(ARROW_DOWN)) {
      if (this.y <= CANVAS_HEIGHT - this.height) {
        this.y += this.moveSpeed;
        this.direction = PLAYER_DIRECTIONS.down;
      }
    }
    if (keyIsDown(ARROW_UP)) {
      if (this.y >= 0) {
        this.y -= this.moveSpeed;
        this.direction = PLAYER_DIRECTIONS.up;
      }
    }
  }

  keyPressed() {
    if (keyCode === SPACE_BAR && this.state !== PLAYER_STATES.dead) {
      this.shuriken();
    }
  }

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
      loadImage("assets/images/weapons/shuriken/shuriken_level_1.png"),
    ];
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
