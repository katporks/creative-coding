document.addEventListener('touchstart', {});

let isTouching = false;

function setup() {
  createMetaTag();
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  if (isTouching) {
    drawPetal();
    drawStem();
  } else {
    drawLeaf();
  }
}

function touchStarted() {
  isTouching = true;
}

function touchEnded() {
  isTouching = false;
}

function touchMoved() {
  return false;
}

function drawPetal() {
  let petalR = random(200, 255);
  let petalG = random(100, 150);
  let petalB = random(100, 150);
  let petalAlpha = random(50)
  
  fill(petalR, petalG, petalB, petalAlpha);
  stroke(255, 20);
  ellipse(mouseX, mouseY, random(100), random(100));
}

function drawLeaf() {
  let leafR = random(26, 92);
  let leafG = random(56, 145);
  let leafB = random(34, 105);
  let leafAlpha = random(50);
  
  fill(leafR, leafG, leafB, leafAlpha);
  noStroke();
  ellipse(mouseX, mouseY, random(30), random(30));

}

function drawStem() {
  let stemR = random(100, 150);
  let stemG = random(100, 255);
  let stemB = random(100, 200);
  let stemAlpha = random(20, 90);
  
  stroke(stemR, stemG, stemB, stemAlpha);
  line(mouseX, mouseY, windowWidth/2 + 10, windowHeight/2 + 10);
}

function createMetaTag() {
  let meta = createElement('meta');
  meta.attribute('name', 'viewport');
  meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');
  
  let head = select('head');
  meta.parent(head);
}