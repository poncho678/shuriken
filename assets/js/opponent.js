class Opponent {
  constructor(player) {
    this.player = player;
    this.width = PLAYER_SIZE;
    this.height = PLAYER_SIZE;
    this.x = random(0, CANVAS_WIDTH - this.width);
    this.y = random(0, CANVAS_HEIGHT - this.height);
    this.health = 3;
    this.maxHealth = 3;
    this.speed = 2;
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
    let move = createVector(this.x - this.player.x, this.y - this.player.y);
    move.normalize();
    this.x -= move.x * this.speed;
    this.y -= move.y * this.speed;
  }
  shoot() {}
}
