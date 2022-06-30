class Startscreen {
  constructor() {
    this.x = 0;
    this.y = -10;
    this.rotation = 0;
    this.background = new Background();
  }

  draw() {
    tint(255, 100, 255);
    this.background.draw();
    noTint();
    // background(79, 108, 141);
    textFont(this.font);
    textAlign(LEFT, TOP);
    textSize(5);
    let input = "SHURIKEN";
    let width = textWidth(input);
    textSize(5 * (CANVAS_WIDTH / width));
    fill(24, 45, 64);
    text(input, this.x, this.y + textAscent() / 15);
    fill(144, 181, 224);
    text(input, this.x, this.y);
    push();
    textAlign(CENTER, CENTER);
    textSize(PLAYER_SIZE / 2);
    text("PRESS ENTER TO PLAY", CANVAS_WIDTH / 2, (CANVAS_HEIGHT / 5) * 4);
    pop();

    // push();
    // this.rotation += 0.01;
    // translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    // rotate(this.rotation);
    // imageMode(CENTER);
    // image(this.shurikenImage, 0, 0, CANVAS_HEIGHT / 4, CANVAS_HEIGHT / 4);
    // pop();
  }
  preload() {
    this.background.preload();
    this.font = loadFont("assets/fonts/Mister Pixel Regular.otf");
    this.shurikenImage = loadImage(
      "assets/images/weapons/shuriken/shuriken_level_1.png"
    );
  }
}
