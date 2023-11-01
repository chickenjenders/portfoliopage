function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);
  movingPattern(frameCount, 20, 10, mouseX, mouseY);
}

function movingPattern(frameCount, circleSize, maxCircleSize, mouseX, mouseY) {
  push();
  frameRate(15);

  for (let x = 0; x < innerWidth; x += circleSize) {
    for (let y = 0; y < innerHeight; y += circleSize) {
      let space = dist(x, y, mouseX, mouseY);
      let colorChange = map(space, 0, innerWidth, 0, 255);
      fill(colorChange, colorChange, colorChange, 200);
      noStroke();

      let circleSize = (frameCount % maxCircleSize) + 20;
      ellipse(x, y, circleSize, circleSize);
    }
  }
  pop();
}
