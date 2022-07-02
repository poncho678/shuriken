class Powerup {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = PLAYER_SIZE / 2;
    this.height = PLAYER_SIZE / 2;
    this.data = this.randomPowerUp();
    this.powerUpUsed = false;
  }
  draw() {
    //draw dropshadow
    if (!this.powerUpUsed) {
      this.powerUpUsed = true;
    }
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
    fill(this.data.color);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  randomPowerUp() {
    const powerUpArray = [
      {
        color: "green",
        effect: function (player) {
          if (!this.powerUpUsed) {
            if (player.health < player.maxHealth) {
              player.health += 1;
            }
            this.powerUpUsed = true;
          }
        },
      },
      {
        color: "blue",
        effect: function (player) {
          if (!this.powerUpUsed) {
            if (
              player.maxHealth < PLAYER_BASESTATS.healthCap &&
              player.health === player.maxHealth
            ) {
              player.maxHealth += 1;
            } else {
              if (player.health < player.maxHealth) {
                player.health += 1;
              }
            }
            this.powerUpUsed = true;
          }
        },
      },
      {
        color: "red",
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
        color: "yellow",
        effect: function (player) {
          if (!this.powerUpUsed) {
            if (player.moveSpeed < PLAYER_BASESTATS.moveSpeedCap) {
              player.moveSpeed += 0.5;
            }
            this.powerUpUsed = true;
          }
        },
      },
    ];
    return powerUpArray[Math.floor(powerUpArray.length * Math.random())];
  }

  preload() {}
}
