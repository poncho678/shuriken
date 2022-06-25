class UserInterface {
  constructor(player, game) {
    this.player = player;
    this.game = game;
    this.fontSize = CANVAS_WIDTH / 32;
  }

  draw() {
    this.drawScore();
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

  drawScore() {
    push();
    fill("lightgray");
    textAlign(RIGHT);
    textFont(this.font);
    textSize(this.fontSize);
    text(
      `score: ${this.game.score}`,
      CANVAS_WIDTH - this.fontSize,
      this.fontSize * 2
    );
    pop();
  }
  preload() {
    this.heart = loadImage("assets/images/ui/hearts32x32.png");
    this.font = loadFont("assets/fonts/Mister Pixel Regular.otf");
  }
}
