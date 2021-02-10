class Node{
  constructor(id){
    this.position = createVector(random(width), random(height));
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topspeed = 5;
    this.score = 0;
    this.color = [random(0, 255), random(0, 255), random(0, 255)];
    this.id = id;
    this.connections = [];
  }

  update() {
    let conn1 = nodes[this.connections[0]];
    let conn2 = nodes[this.connections[1]];

    // let distConn1 = floor(dist(this.position.x, this.position.y, conn1.position.x, conn1.position.y));

    // we have 2 ways of visualising: the unrealstic and the realstic.

    // The unrealstic: is to draw a line between the 2 connections, then devide the line by half,
    // this will give us the vector in which our node will move to the center. this is achived by
    // adding the position vector (x,y) of our 2 connections, then divide by 2, and finally we
    // change the accleration value to a new vector that have the difference (substracting) between
    // our position and vector of the center point we mentioned.
    // this will apply a Force that affect the velocity.
    //
    // The realstic: is to draw 2 lines, first line connects our position to first connection's position,
    // the second line connects our position to the second connection's position.
    // the idea is to keep the two lines' length equal (equal distance), when a line's length is bigger
    // than the second line's length we move closer to the other end of the bigger line.
    // or move to the opposite direction of the smaller line.
    
    // what's been done now is the first unrealstic way. 
    let centerVector = p5.Vector.add(conn1.position, conn2.position);
    centerVector.div(2);

    if (this.position != centerVector) {
      this.acceleration = p5.Vector.sub(centerVector, this.position);
      // here we set the magntitude to of the new accleration to a radnom value.
      // this introduces accuracy limit. if we removed this line the movement will be 100% accurate.
      // But I think there's something wrong by doing this, so this needs to be reconsidered.
      this.acceleration.setMag(random(0, 1));
    }
    // console.log(conn1.position);
    line(centerVector.x, centerVector.y, conn1.position.x, conn1.position.y);
    fill(conn1.color);
    line(centerVector.x, centerVector.y, conn2.position.x, conn2.position.y);
    fill(conn2.color);
    line(centerVector.x, centerVector.y, this.position.x, this.position.y);
    fill(this.color);
    
    // this drawArrow function have a bug.
    // drawArrow(this.position, conn1.position, 'black');
    // drawArrow(this.position, conn2.position, 'black');

    // this was to slow down the node's velocity when it's at or near the center.
    // but I think this is not needed and makes the randomness of the accleration useless?
    // let distToMiddle = floor(dist(this.position.x, this.position.y, centerVector.x, centerVector.y));
    // if (distToMiddle < 20) {
    //     this.velocity.setMag(0.1);
    // }

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
  }

  moveBot() {

  }

  movePlater() {

  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(this.color);
    ellipse(this.position.x, this.position.y, 20, 20);
    textSize(16);
    text(this.id, this.position.x, this.position.y);
    textAlign(CENTER, CENTER);
    fill(0);
  }

  bounceEdges() {
    if ((this.position.x > width) || (this.position.x < 0)) {
      this.velocity.x = this.velocity.x * -1;
    }
    if ((this.position.y > height) || (this.position.y < 0)) {
      this.velocity.y = this.velocity.y * -1;
    }
  }
}


// Don't use this function yet, the translation done in it is incorrect.

// draw an arrow for a vector at a given base position
// function drawArrow(base, vec, myColor) {
//   push();
//   stroke(myColor);
//   strokeWeight(3);
//   fill(myColor);
//   translate(base.x, base.y);
//   line(0, 0, vec.x, vec.y);
//   rotate(vec.heading());
//   let arrowSize = 7;
//   translate(vec.mag() - arrowSize, 0);
//   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
//   pop();
// }