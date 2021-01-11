class Particle {
  constructor(x, y, connections, img) {
    this.x = x || random(50, width);
    this.y = y || random(50, height);
    this.diameter = 40;
    this.xSpeed = random(-3, 3);
    this.ySpeed = random(-3, 3);
    this.connections = connections || [];
    this.lines = [];
    this.img = img;
    // for (let i = 0; i < 2; i++) {
    //   this.connections.push(floor(random(3)));
    // }
  }
  distance(x1, y1, x2, y2) {
    if (x1 == x2 && y1 == y2) {
      return 0;
    } else {
      let a = x1 - x2;
      let b = y1 - y2;

      let c = Math.sqrt(a * a + b * b);
      return c;
    }
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x <= this.diameter / 2 || this.x >= width - this.diameter / 2) {
      this.xSpeed *= -1;
    } else if (
      this.y <= this.diameter / 2 ||
      this.y >= height - this.diameter / 2
    ) {
      this.ySpeed *= -1;
    }
  }
  moveMiddle() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x <= this.diameter / 2 || this.x >= width - this.diameter / 2) {
      this.xSpeed *= -1;
    } else if (
      this.y <= this.diameter / 2 ||
      this.y >= height - this.diameter / 2
    ) {
      this.ySpeed *= -1;
    }
  }
  moveByKeyboard() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= 20 * (deltaTime / 50);
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += 20 * (deltaTime / 50);
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += 20 * (deltaTime / 50);
    } else if (keyIsDown(LEFT_ARROW)) {
      this.x -= 20 * (deltaTime / 50);
    } else {
    }
    let d1 = this.distance(
      this.x,
      this.y,
      this.connections[0].x,
      this.connections[0].y
    );
    let d2 = this.distance(
      this.x,
      this.y,
      this.connections[1].x,
      this.connections[1].y
    );
    console.log(this.x);
  }

  display(strokeColor) {
    strokeWeight(2);
    stroke(strokeColor, 122);
    for (let i = 0; i < this.connections.length; i++) {
      line(
        this.x,
        this.y,
        particles[this.connections[i]].x,
        particles[this.connections[i]].y
      );
    }
    noStroke();
    fill(0, 255, 0);
    image(this.img, this.x, this.y, this.diameter, this.diameter);
  }
}
