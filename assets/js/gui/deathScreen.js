class DeathScreen {
  constructor() {
    this.x = 0;
    this.y = -10;
  }
  draw(score) {
    background(17, 30, 44);
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

    // draw Scores
    const scores = JSON.parse(localStorage.getItem("HighScores"));
    if (scores.indexOf(score) === 0) {
      push();
      textAlign(CENTER, CENTER);
      textSize(PLAYER_SIZE);
      textWrap(WORD);
      fill("white");
      text(`New Highscore: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      pop();
    } else {
      const index = scores.indexOf(score);
      const rank = index + 1;
      textAlign(CENTER, CENTER);
      textSize(PLAYER_SIZE);
      text(
        `${rank - 1}: ${scores[index - 1]}`,
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2 - PLAYER_SIZE
      );
      push();
      fill("white");
      text(`${rank}: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      pop();

      if (rank !== scores.length) {
        text(
          `${rank + 1}: ${scores[index + 1]}`,
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2 + PLAYER_SIZE
        );
      }
    }

    // draw restart...
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
