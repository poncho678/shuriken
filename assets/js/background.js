class Background {
  constructor() {}
  draw() {
    image(this.backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  preload() {
    this.backgroundImage = loadImage(
      "assets/images/background/pixel-art_topdownpractice.png"
    );
  }
}
