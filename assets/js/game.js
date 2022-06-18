class Game {
  constructor() {
    this.player = new Player();
  }
  draw() {
    this.player.draw();
  }
  preload() {}
  keyPressed() {
    this.player.keyPressed();
  }
}
