let particles;
let particlesNum = 7;
let coronaImg;
let maskImg;
let c;

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}
function preload() {
  coronaImg = loadImage("assets/coronavirus.svg");
  maskImg = loadImage("assets/mask.svg");
}
function setup() {
  createCanvas(windowWidth, windowHeight - 20);
  background(66, 170, 245);
  imageMode(CENTER);
  particles = [];
  var j = 1;
  var k = 2;
  for (let i = 0; i < particlesNum; i++) {
    if (i === 0) {
      particles.push(
        new Particle(random(50, width), random(50, height), [j, k], maskImg)
      );
      j += 2;
      k += 2;
    } else if (i > 0 && i < (particlesNum - 1) / 2) {
      particles.push(
        new Particle(random(50, width), random(50, height), [j, k], coronaImg)
      );
      j += 2;
      k += 2;
    } else {
      particles.push(
        new Particle(random(50, width), random(50, height), [], coronaImg)
      );
    }
  }
}

function draw() {
  // background(66, 170, 245);

  background(90, 90, 90);
  for (let i = 0; i < particles.length; i++) {
    if (i === 0) {
      c = color(0);
      particles[i].moveByKeyboard();
      particles[i].display(c);
    } else if (i > 0 && i < (particlesNum - 1) / 2) {
      c = color(255, 0, 0);
      particles[i].moveMiddle();
      particles[i].display(c);
    } else {
      c = color(155, 45, 63);
      particles[i].move();
      particles[i].display(c);
    }
  }
  particles.filter((that) => {
    return that.x > 0 && that.x < width && that.y > 0 && that.y < height;
  });
}
// function keyPressed() {
//   if (keyCode === UP_ARROW) {
//     p.y -= 20 * (deltaTime / 50);
//   } else if (keyCode === DOWN_ARROW) {
//     p.y +=20 * (deltaTime / 50);
//   } else if (keyCode === RIGHT_ARROW) {
//     p.x +=20 * (deltaTime / 50);
//   } else if (keyCode === LEFT_ARROW) {
//     p.x -=20 * (deltaTime / 50);
//   } else {
//   }
// }
