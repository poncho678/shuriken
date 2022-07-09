class Game {
  constructor() {
    this.player = new Player();
    this.opponentsArray = [];
    this.powerUpArray = [];
    this.score = 0;
    this.level = 0;
    this.counter = 0;
    this.hasCountIncreased = false;
    this.ui = new UserInterface(this.player);
    this.background = new Background();
  }
  play() {
    this.background.draw();
    this.player.draw();

    //
    if (
      this.counter !== 0 &&
      this.counter % 7 === 0 &&
      this.hasCountIncreased
    ) {
      this.level++;
      this.hasCountIncreased = false;
    }

    // create opponents...
    let maxCount = 100 - this.level * 2 < 80 ? 60 : 100 - this.level * 2;
    if (frameCount % maxCount === 0) {
      if (this.opponentsArray.length <= 25) {
        this.opponentsArray.push(new Opponent(this.player, this.level));
      }
    }

    // drawp Powerups
    this.powerUpArray.forEach((powerup) => {
      powerup.draw();
      if (this.collionCheck(this.player, powerup)) {
        this.soundPowerup.stop();
        this.soundPowerup.play();
        powerup.effect(this.player, this.level, this.score);
        this.score += powerup.score();
        if (this.level >= powerup.level()) {
          this.level -= powerup.level();
        }
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
        this.soundDamageTaken.stop();
        this.soundDamageTaken.play();
        this.player.health -= 1;
        this.player.gotHit = true;
        this.player.gotHitMoment = frameCount;
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
          this.soundHit.stop();
          this.soundHit.play();
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
            this.score += Math.floor(
              opponent.maxHealth * 100 * (this.level * 0.1 + 1)
            );
            this.hasCountIncreased = true;
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
    this.ui.drawHealth(this.player.health, this.player.maxHealth);
    this.ui.drawScore(this.score);
    this.ui.drawShuriken(this.player.shurikenCount);
  }

  dropPowerup(opponentX, opponentY) {
    const chance = Math.random();
    if (chance > 0.82) {
      this.powerUpArray.push(
        new Powerup(opponentX, opponentY, this.level, this.score)
      );
    }
  }
  // Reset The Game
  reset() {
    this.opponentsArray = [];
    this.powerUpArray = [];
    this.score = 0;
    this.level = 0;
    this.counter = 0;
    this.player.reset();
  }

  preload() {
    this.soundHit = loadSound("assets/sounds/Hit.wav");
    this.soundHit.setVolume(0.3);
    this.soundDamageTaken = loadSound("assets/sounds/MiniImpact.wav");
    this.soundPowerup = loadSound("assets/sounds/PowerUp1.wav");

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
  keyReleased() {
    this.player.keyReleased();
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
