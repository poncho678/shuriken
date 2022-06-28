class Projectile {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.width = PLAYER_SIZE / 2;
    this.height = PLAYER_SIZE / 2;
    this.rotation = 0;
    this.speed = 15;
  }
  draw() {
    //draw shadow
    push();
    fill(0, 0, 0, 55);
    noStroke();
    ellipse(
      this.x,
      this.y + PLAYER_SIZE / 3,
      (this.width / 3) * 2.5,
      this.height / 3
    );
    pop();

    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    imageMode(CENTER);
    image(shurikenImage[0], 0, 0, this.width, this.height);

    if (this.direction === "left") {
      this.rotation -= 5;
    } else {
      this.rotation += 5;
    }

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

  preload() {}
}
