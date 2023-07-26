// const Cube = require('./cube');
const gridX = 18;
const gridY = 8;
let canvas;
let sky = []
let boxWidth;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL)
    boxWidth = windowWidth*0.4/gridX;   
    frameRate(8)
    // background("#e8f4fc");
    background(255)
    angleMode(DEGREES)
    renderSky()

}

function renderSky() {
    let startingCloudsInSky = Math.floor(windowHeight/ (gridY*boxWidth) * 2);
    console.log(startingCloudsInSky)
    let startingTranslationY = -windowHeight/2 - windowWidth*0.1;
    for (let i=0; i <startingCloudsInSky; i++) {
        setTimeout(()=>{
            let lowerboundX = -windowWidth/2 - windowWidth*0.2
            let upperboundX = -windowWidth/2 + windowWidth*0.7
            let lowerboundZ = 0;
            let upperboundZ = 0;
            let translationZ = random(lowerboundZ, upperboundZ)
            // let lowerboundY = -windowHeight/2 + windowWidth*0.1
            // let upperboundY = -windowHeight/2 + windowWidth*0.9
        
            let startingTranslationX = random(lowerboundX, upperboundX)
        
            let cloudModel = new Cloud(gridX, gridY, startingTranslationX, startingTranslationY, translationZ);
            sky.push(cloudModel);
            renderCloud(cloudModel);
            startingTranslationY += windowHeight/startingCloudsInSky;
        }, 200)
    }
}

function mouseWheel(event) {
    clear();
    console.log(event.delta)
    // background("#e8f4fc");
    background(255)
    for (let i=0; i<sky.length; i++) {
        let currentCloud = sky[i] 
        if (currentCloud.startingTranslationX - (gridX * boxWidth) > windowWidth) {
            currentCloud.startingTranslationX = -windowHeight/2 - windowWidth*0.3
        } else if (currentCloud.startingTranslationX - (gridX * boxWidth) < -windowWidth) {
            currentCloud.startingTranslationX = windowWidth
        } else {
            currentCloud.startingTranslationX += event.delta;
        }
        renderCloud(currentCloud);
    }
    return false;
}

function moveClouds() {
    clear();
    // background("#e8f4fc");
    background(255)
    for (let i=0; i<sky.length; i++) {
        let currentCloud = sky[i] 
        if (currentCloud.startingTranslationX + (gridX * boxWidth)*1.2 > windowWidth) {
            currentCloud.startingTranslationX =  -windowWidth/2 - windowWidth*0.3
        } else {
            currentCloud.startingTranslationX += windowWidth*0.005;

        }
        renderCloud(currentCloud);
    }
}

function renderCube(translateX, translateY, translateZ, boxWidth) {
    push();
    translate(translateX, translateY);
    // noFill();
    fill(255, 255, 255, 0)
    strokeWeight(0.9);
    stroke(100);
    box(boxWidth);
    pop();
}

function renderCloud(cloudModel) {

    let startingTranslationX = cloudModel.startingTranslationX;
    let startingTranslationY = cloudModel.startingTranslationY;
    // let cloudModel = new Cloud(gridX, gridY, startingTranslationX, startingTranslationY);
    let cloudGrid = cloudModel.matrix;
    let boxWidth = windowWidth*0.3/gridX;

    // renderCube(startingTranslationX, startingTranslationY, boxWidth);

    // console.log("CLOUDGRID", cloudGrid);

    for (let y=0; y<gridY; y++) {
        for (let x=0; x<gridX; x++) {
            // console.log("y", y)
            // console.log("x", x)
            // console.log(cloudGrid[y][x])
            if (cloudGrid[y][x] == true) {
                renderCube(startingTranslationX, startingTranslationY,cloudModel.translationZ, boxWidth);

                // console.log("x", startingTranslationX);
                // console.log("y", startingTranslationY);
            }
                startingTranslationX += boxWidth;

         }
         startingTranslationX = cloudModel.startingTranslationX;
         startingTranslationY += boxWidth;
    }
}