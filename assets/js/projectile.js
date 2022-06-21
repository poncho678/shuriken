class Projectile {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.width = PLAYER_SIZE / 4;
    this.height = PLAYER_SIZE / 4;
    this.speed = 15;
  }
  draw() {
    push();
    fill("red");
    rect(this.x, this.y, this.width, this.height);
    if (this.direction === "up") {
      this.y -= this.speed;
    }
    if (this.direction === "down") {
      this.y += this.speed;
    }
    if (this.direction === "left") {
      this.x -= this.speed;
    }
    if (this.direction === "right") {
      this.x += this.speed;
    }
    if (this.direction === "up left") {
      this.y -= this.speed;
      this.x -= this.speed;
    }
    if (this.direction === "up right") {
      this.y -= this.speed;
      this.x += this.speed;
    }
    if (this.direction === "down left") {
      this.y += this.speed;
      this.x -= this.speed;
    }
    if (this.direction === "down right") {
      this.y += this.speed;
      this.x += this.speed;
    }
    pop();
  }
}
