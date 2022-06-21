class UserInterface {
  constructor(player, score) {
    this.player = player;
    this.score = score;
    this.fontSize = CANVAS_WIDTH / 32;
  }

  draw() {
    this.drawScore();
    this.drawHealth();
  }

  drawHealth() {
    for (let i = 0; i < this.player.health; i++) {
      ellipse(
        this.fontSize + i * this.fontSize * 1.25,
        this.fontSize,
        this.fontSize,
        this.fontSize
      );
    }
  }

  drawScore() {
    push();
    textAlign(RIGHT);
    let scoreWidth = textWidth(this.score);
    textSize(this.fontSize);
    text(this.score, CANVAS_WIDTH - this.fontSize / 1.5, this.fontSize * 1.5);
    pop();
  }
  preload() {}
}
