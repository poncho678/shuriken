class DeathScreen {
  constructor() {
    this.x = 0;
    this.y = -10;
  }
  draw() {
    // background(37, 55, 74);
    background(17, 30, 44);
    // background(6, 17, 28);
    // fill(44, 104, 104);
    textFont(this.font);
    textAlign(LEFT, TOP);
    textSize(5);
    let input = "YOU FAILED";
    let width = textWidth(input);
    textSize(5 * (CANVAS_WIDTH / width));
    fill(24, 45, 64);
    text(input, this.x, this.y + textAscent() / 15);
    fill(textColor);
    text(input, this.x, this.y);
    image(
      this.playerDead,
      CANVAS_WIDTH / 2 - PLAYER_SIZE / 2,
      CANVAS_HEIGHT / 2,
      PLAYER_SIZE,
      PLAYER_SIZE
    );
    push();
    textAlign(CENTER, CENTER);
    textSize(PLAYER_SIZE / 2);
    text("PRESS ENTER TO TRY AGAIN", CANVAS_WIDTH / 2, (CANVAS_HEIGHT / 5) * 4);
    pop();
  }
  preload() {
    this.font = loadFont("assets/fonts/Mister Pixel Regular.otf");
    this.playerDead = loadImage("assets/images/player/Dead.png");
  }
}
