class Game {
  constructor() {
    this.player = new Player();
    this.opponentsArray = [];
    this.score = 0;
    this.ui = new UserInterface(this.player, this);
    this.isDead = false;
  }
  play() {
    this.player.draw();

    // create opponents...
    if (frameCount % 120 === 0) {
      if (this.opponentsArray.length <= 10) {
        this.opponentsArray.push(new Opponent(this.player));
      }
    }
    // draw Opponents
    this.opponentsArray.forEach((opponent) => {
      opponent.draw();
    });

    // check if player collides with opponents
    this.opponentsArray.forEach((opponent) => {
      if (this.collionCheck(this.player, opponent)) {
        this.player.health -= 1;

        this.opponentsArray = this.removeItemFromArray(
          opponent,
          this.opponentsArray
        );
        this.checkIfPlayerDied();
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
          opponent.health -= 1;

          // check if health of Opponent is 0, then remove from array
          if (opponent.health === 0) {
            this.score += opponent.maxHealth * 100;
            this.opponentsArray = this.removeItemFromArray(
              opponent,
              this.opponentsArray
            );
          }
        }
      });
    });

    //
    this.ui.draw();
  }

  checkIfPlayerDied() {
    if (this.player.health === 0) {
      console.log("dead");
      this.isDead = true;
    }
  }

  preload() {
    this.player.preload();
    this.ui.preload();
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
