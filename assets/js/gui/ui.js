class UserInterface {
  constructor(player) {
    this.player = player;
    this.fontSize = CANVAS_WIDTH / 32;
  }

  draw() {
    this.drawHealth();
  }

  drawHealth() {
    for (let i = 0; i < this.player.maxHealth; i++) {
      if (i < this.player.health) {
        image(
          this.heart,
          this.fontSize + i * PLAYER_SIZE,
          PLAYER_SIZE / 2,
          PLAYER_SIZE,
          PLAYER_SIZE,
          0,
          TILESIZE * 3,
          32,
          32
        );
      } else {
        image(
          this.heart,
          this.fontSize + i * PLAYER_SIZE,
          PLAYER_SIZE / 2,
          PLAYER_SIZE,
          PLAYER_SIZE,
          TILESIZE * 2,
          TILESIZE * 3,
          32,
          32
        );
      }
    }
  }

  drawShuriken(value) {
    for (let i = 0; i < value; i++) {
      push();
      translate(
        PLAYER_SIZE + (i * PLAYER_SIZE) / 3,
        CANVAS_HEIGHT - PLAYER_SIZE
      );
      angleMode(DEGREES);
      rotate(45);
      imageMode(CENTER);
      image(this.shuriken, 0, 0, PLAYER_SIZE, PLAYER_SIZE);
      pop();
    }
  }

  drawScore(value) {
    let highScore =
      JSON.parse(localStorage.getItem("HighScores")) == null
        ? 0
        : JSON.parse(localStorage.getItem("HighScores"))[0];
    textAlign(RIGHT);
    textFont(this.font);
    textSize(this.fontSize);
    push();
    fill("lightgray");
    text(
      `Highscore: ${highScore}`,
      CANVAS_WIDTH - this.fontSize,
      this.fontSize
    );
    pop();

    push();
    fill("white");
    text(`Score: ${value}`, CANVAS_WIDTH - this.fontSize, this.fontSize * 2);
    pop();
  }
  preload() {
    this.heart = loadImage("assets/images/ui/hearts32x32.png");
    this.shuriken = loadImage("assets/images/weapons/shuriken/shuriken.png");
    this.font = loadFont("assets/fonts/Mister Pixel Regular.otf");
  }
}
