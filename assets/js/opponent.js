class Opponent {
  constructor() {
    this.width = PLAYER_SIZE;
    this.height = PLAYER_SIZE;
    this.x = random(0, CANVAS_WIDTH - this.width);
    this.y = random(0, CANVAS_HEIGHT - this.height);
    this.health = 3;
    this.maxHealth = 3;
  }
  draw() {
    // draw opponent
    push();
    fill("blue");
    rect(this.x, this.y, this.width, this.height);
    pop();
    // draw healthbars
    push();
    fill("red");
    rect(
      this.x,
      this.y,
      this.width -
        (this.width / this.maxHealth) * (this.maxHealth - this.health),
      this.height / 10
    );
    pop();
  }
  shoot() {}
}
