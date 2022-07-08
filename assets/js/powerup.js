class Powerup {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = PLAYER_SIZE;
    this.height = PLAYER_SIZE;
    this.power = this.randomPowerUp();
    this.powerUpUsed = false;
  }
  draw() {
    if (!this.powerUpUsed) {
      this.powerUpUsed = true;
    }
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

    push();
    image(this.power.img, this.x, this.y, this.width, this.height);
    pop();
  }

  effect(player, level, score) {
    this.power.effect(player, level, score);
  }
  score() {
    if (this.power.score === undefined) {
      return 0;
    }
    return this.power.score;
  }
  level() {
    if (!this.power.level === undefined) {
      return 0;
    }
    return this.power.level;
  }

  randomPowerUp() {
    const powerUpArray = [
      {
        img: loadImage("assets/images/weapons/shuriken/shuriken.png"),
        effect: function (player, level) {
          if (!this.powerUpUsed) {
            if (player.maxShuriken < PLAYER_BASESTATS.shurikenCap) {
              player.maxShuriken += 1;
            }
            this.powerUpUsed = true;
          }
        },
      },
      {
        img: loadImage("assets/images/powerups/yakitori.png"),
        effect: function (player, level) {
          if (!this.powerUpUsed) {
            if (player.health < player.maxHealth) {
              player.health += 1;
            }
            this.powerUpUsed = true;
          }
        },
      },
      {
        img: loadImage("assets/images/powerups/heart.png"),
        effect: function (player) {
          if (!this.powerUpUsed) {
            if (player.maxHealth < PLAYER_BASESTATS.healthCap) {
              player.health += 1;
              player.maxHealth += 1;
            } else if (
              player.maxHealth === PLAYER_BASESTATS.healthCap &&
              player.health < player.maxHealth
            ) {
              player.health += 1;
            }
            this.powerUpUsed = true;
          }
        },
      },
      {
        img: loadImage("assets/images/powerups/scrollfire.png"),
        effect: function (player) {
          if (!this.powerUpUsed) {
            if (player.strength < PLAYER_BASESTATS.strengthCap) {
              player.strength += 0.25;
            }
            this.powerUpUsed = true;
          }
        },
      },
      {
        img: loadImage("assets/images/powerups/scrollthunder.png"),
        effect: function (player) {
          if (!this.powerUpUsed) {
            if (player.moveSpeed < PLAYER_BASESTATS.moveSpeedCap) {
              player.moveSpeed += 0.5;
              player.moveSpeedNormal += 0.5;
            }
            this.powerUpUsed = true;
          }
        },
      },
      {
        img: loadImage("assets/images/powerups/fortunecookie.png"),
        effect: function (player) {
          if (!this.powerUpUsed) {
            this.powerUpUsed = true;
          }
        },
        level: 1,
      },
      {
        img: loadImage("assets/images/powerups/honey.png"),
        effect: function (player) {
          if (!this.powerUpUsed) {
          }
          this.powerUpUsed = true;
        },
        score: 5000,
      },
    ];
    return powerUpArray[Math.floor(powerUpArray.length * Math.random())];
  }

  preload() {}
}
