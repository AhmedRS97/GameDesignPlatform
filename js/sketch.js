
let nodes;
// limitation to the number of nodes and number of connections per node.
let numOfNodes = 5;
let numOfConnections = 2;

function setup() {
  createCanvas(1080,600);
  nodes = [];

  for (let id = 0; id < numOfNodes; id++) {
    nodes.push(new Node(id));
  }
  for (node of nodes) {
    // this gibberish should be fixed, because numOfNodes and random id generation.
    // use array of random ids? and filter them? yeah
    let randomId1 = floor(random(numOfNodes));
    let randomId2 = floor(random(numOfNodes));
    while (randomId1 == randomId2 || node.id == randomId1 || node.id == randomId2) {
      randomId1 = floor(random(numOfNodes));
      randomId2 = floor(random(numOfNodes));
    }
    node.connections.push(randomId1);
    node.connections.push(randomId2);
  }
}

function draw() {
  background(51);

  let connectionsText = "\t";
  for (node of nodes) {
    node.update();
    node.bounceEdges();
    node.display();
    connectionsText += " | node  " + node.id + " :  " + node.connections;
  }
  textSize(16);
  text(connectionsText, 300, 30);
  textAlign(CENTER, CENTER);
  fill(255,255,255);
  // noLoop();
//   console.log("dist 1", dist(movers[1].position.x, movers[1].position.y, vec.x, vec.y));
//   console.log("dist 2", dist(movers[2].position.x, movers[2].position.y, vec.x, vec.y));
//   line(movers[1].position.x, movers[1].position.y, vec.x, vec.y);
}