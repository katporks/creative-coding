// const Cube = require('./cube');
const gridX = 18;
const gridY = 8;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    background(255);
}

function draw() {
    orbitControl();

    renderCloud();
    noLoop();
}

function renderCube(translateX, translateY, boxWidth) {
    push();
    translate(translateX, translateY);
    noFill();
    strokeWeight(0.6);
    stroke(100);
    box(boxWidth);
    pop();
}

function renderCloud() {
    let cloudModel = new Cloud(gridX, gridY);
    let cloudGrid = cloudModel.createMatrix();
    let boxWidth = windowWidth*0.7/gridX;

    let startingTranslationX = -windowWidth/2 + windowWidth*0.1
    let startingTranslationY = -windowHeight/2 + windowWidth*0.1
    // renderCube(startingTranslationX, startingTranslationY, boxWidth);

    console.log("CLOUDGRID", cloudGrid);

    for (let y=0; y<gridY; y++) {
        for (let x=0; x<gridX; x++) {
            // console.log("y", y)
            // console.log("x", x)
            // console.log(cloudGrid[y][x])
            if (cloudGrid[y][x] == true) {
                renderCube(startingTranslationX, startingTranslationY, boxWidth);

                // console.log("x", startingTranslationX);
                // console.log("y", startingTranslationY);
            }
                startingTranslationX += boxWidth;

         }
         startingTranslationX = -windowWidth/2 + windowWidth*0.1
         startingTranslationY += boxWidth;
    }
}