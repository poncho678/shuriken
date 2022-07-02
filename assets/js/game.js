class Game {
  constructor() {
    this.player = new Player();
    this.opponentsArray = [];
    this.powerUpArray = [];
    this.score = 0;
    this.counter = 0;
    this.ui = new UserInterface(this.player);
    this.background = new Background();
  }
  play() {
    this.background.draw();
    this.player.draw();

    // create opponents...
    if (frameCount % 120 === 0) {
      if (this.opponentsArray.length <= 50) {
        this.opponentsArray.push(new Opponent(this.player));
      }
    }

    // drawp Powerups
    this.powerUpArray.forEach((powerup) => {
      powerup.draw();
      if (this.collionCheck(this.player, powerup)) {
        powerup.data.effect(this.player);
        this.powerUpArray = this.removeItemFromArray(
          powerup,
          this.powerUpArray
        );
      }
    });

    // draw Opponents
    this.opponentsArray.forEach((opponent) => {
      opponent.draw();

      // check if player collides with opponents
      if (this.collionCheck(this.player, opponent)) {
        this.player.health -= 1;

        this.opponentsArray = this.removeItemFromArray(
          opponent,
          this.opponentsArray
        );
      }
    });

    // check if player projectiles hit opponents
    this.player.projectileArray.forEach((projectile) => {
      this.opponentsArray.forEach((opponent) => {
        if (this.collionCheck(projectile, opponent)) {
          // if projectile hits enemy, remove projectile from Array
          this.player.projectileArray = this.removeItemFromArray(
            projectile,
            this.player.projectileArray
          );
          opponent.health -= this.player.strength;
          opponent.gotHitMoment = frameCount;
          opponent.gotHit = true;

          // check if health of Opponent is 0, then remove from array
          if (opponent.health <= 0) {
            this.score += opponent.maxHealth * 100;
            this.counter += 1;
            this.dropPowerup(opponent.x, opponent.y);
            this.opponentsArray = this.removeItemFromArray(
              opponent,
              this.opponentsArray
            );
          }
        }
      });
    });

    // draw UI and Update score
    this.ui.draw();
    this.ui.drawScore(this.score);
  }

  dropPowerup(opponentX, opponentY) {
    const chance = Math.random();
    if (chance > 0.5) {
      this.powerUpArray.push(new Powerup(opponentX, opponentY));
    }
  }

  // Reset The Game
  reset() {
    this.opponentsArray = [];
    this.powerUpArray = [];
    this.score = 0;
    this.counter = 0;
    this.player.reset();
  }

  preload() {
    this.background.preload();
    this.player.preload();
    this.ui.preload();
    opponentSprites = {
      [OPPONENT_DIRECTIONS.down]: [
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 0,
          y: 0,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 0,
          y: 16,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 0,
          y: 32,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 0,
          y: 48,
          width: 16,
          height: 16,
        },
      ],
      [OPPONENT_DIRECTIONS.up]: [
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 16,
          y: 0,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 16,
          y: 16,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 16,
          y: 32,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 16,
          y: 48,
          width: 16,
          height: 16,
        },
      ],
      [OPPONENT_DIRECTIONS.left]: [
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 32,
          y: 0,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 32,
          y: 16,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 32,
          y: 32,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 32,
          y: 48,
          width: 16,
          height: 16,
        },
      ],
      [OPPONENT_DIRECTIONS.right]: [
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 48,
          y: 0,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 48,
          y: 16,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 48,
          y: 32,
          width: 16,
          height: 16,
        },
        {
          img: loadImage("assets/images/opponents/skelet/Walk.png"),
          x: 48,
          y: 48,
          width: 16,
          height: 16,
        },
      ],
    };
  }

  keyPressed() {
    this.player.keyPressed();
  }

  collionCheck(a, b) {
    const bottomOfA = a.y + a.height;
    const topOfB = b.y;
    const isBottomOfABiggerThanTopOfB = bottomOfA >= topOfB;

    const topOfA = a.y;
    const bottomOfB = b.y + b.height;
    const isBottomOfASmallerThanBottomOfB = topOfA <= bottomOfB;

    const leftOfA = a.x;
    const rightOfB = b.x + b.width;
    const isLeftOfASmallerThanRightOfB = leftOfA <= rightOfB;

    const rightOfA = a.x + a.width;
    const leftOfB = b.x;
    const isRightOfABiggerThanLeftOfB = rightOfA >= leftOfB;

    return (
      isBottomOfABiggerThanTopOfB &&
      isBottomOfASmallerThanBottomOfB &&
      isLeftOfASmallerThanRightOfB &&
      isRightOfABiggerThanLeftOfB
    );
  }

  removeItemFromArray(itemToBeRemoved, arrayToBefiltered) {
    return arrayToBefiltered.filter((item) => {
      return item !== itemToBeRemoved;
    });
  }
}
