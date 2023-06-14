const ghosts = [
  "i. last sleepover, kin",
  "we held each other closer,<br>",
  "",
  "her father + our grandfather passed away<br>here, in<br>this very building<br>",
  "a hyper realistic photo of the passion of Christ<br>beside us, in its (bloody) (violent(/ce)/ glory)<br>",
  "the statue with the pools of blood we had taken out of the room",
  "",
  "instinct told us our ancestors are watching",
  "",
  "",
  "",
];

const building = [
  "ii. the building, land grab for free<br>",
  "homecoming Aurora<br>bowling alley<br>turned Good Sheperd convent canteen (known for their ube)<br>",
  "blue paint chipped<br>years of smoke added singes<br>(to white), greyed white<br>",
  "",
  "",
  "",
  "",
  "",
  "",
  "<s>(13 floors)</s><br>14th floor<br>",
  "",
  "top floor<br>St. Joseph stands too costly to be\ta witness",
  "",
  "homecoming<br>Aurora",
  "",
  "money took you away money<br>left us no money greed lust<br>",
  "human rights museum pending on the 12th floor<br>",
  "turned site,<br>with shattered glass<br>rooftop snatched<br>",
  "turned megamall<br>",
  "",
  "",
  "",
];

const narrative = [ghosts, building];

const buildingColors = ["#326A8C", "#33678E", "#315471", "#6092A6", "#DCE6F2"];

const buildingOutlines = ["#1B72BF", "#D0F2F2", "#BFAA84", "#CDDAE3"];

const ghostSkyline = "img-4.png";
const buildingNeighbor = "img-2.png";
const buildingTraffic = "img-3.png";
const buildingClear = "img-1.JPG";
const billboardPhotos = [
  "across.jpg", 
  "play.jpg", 
  "holy-grapes.JPG", 
  buildingNeighbor, 
  "lolo.jpg",
  "lolos-plea.jpg",
  "sleepover.JPG",
  "last-snack.jpg"
];

let canvas3D;
let foreground;
let slideLock = false;
let currentLine = 0;
let narrativeIndex = 0;
let photos = {};

function preload() {
  const imageNames = [
    "img-1.JPG",
    "img-2.png",
    "img-3.png",
    "img-4.png",
    "play.jpg",
    "img-1.JPG",
    "holy-grapes.JPG",
    "across.jpg",
    "lolo.jpg",
    "lolos-plea.jpg",
    "sleepover.JPG",
    "last-snack.jpg"
  ];

  for (let i = 0; i < imageNames.length; i++) {
    let currentImg = imageNames[i];
    let path = "assets/" + currentImg;
    photos[currentImg] = loadImage(path);
  }
}

function setup() {
  canvas3D = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas3D.id("canvas");
  foreground = select("#foreground");
  renderBuildings();
  renderText();
}

function draw() {
  renderBuildings()
  renderText()
}

const waitBeforeRender = (ms) => new Promise((res) => setTimeout(res, ms));

const nextSlide = async () => {
  if (!slideLock) {
    slideLock = true;
    await waitBeforeRender(100)
      .then(renderBuildings())
      .then(renderText());
    slideLock = false;
  }
};

function touchEnded() {
  nextSlide();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function renderImages() {
  if (narrativeIndex == 0) {
    renderImagesGhosts();
  } else {
    renderImagesBuilding();
  }
}

function renderImagesGhosts() {
  if (currentLine >= ghosts.length - 3) {
    renderBackgroundImage(ghostSkyline);
  }
}

function renderImagesBuilding() {
  if (currentLine >= 5 && currentLine < 7) {
    renderBackgroundImage(buildingNeighbor);
  } else if (currentLine >= 7 && currentLine < 9) {
    renderBackgroundImage(buildingTraffic);
  } else if (currentLine >= 9 && currentLine < 11) {
    renderBackgroundImage(buildingClear);
  }
}

function renderBackgroundImage(imgName) {
  push();
  let img = photos[imgName];
  texture(img);
  noStroke();
  plane(windowWidth, windowHeight);
  pop();
}

function isEnding() {
  return narrativeIndex == 1 && currentLine >= building.length - 5;
}

function getCanvasRotation() {
  if (narrativeIndex == 0 || isEnding()) {
    return PI / 3;
  }
  return PI / 5;
}

 
function renderBuilding(startingTranslation, photoName) {
  const buildingWidth = windowWidth / 6;
  const minHeight = windowHeight * 0.1;
  const minStrokeWeight = 0.01;
  const maxStrokeWeight = 0.3;
  const pt2MinStrokeWeight = 0.3;
  const pt2MaxStrokeWeight = 0.6;
  const photo = photos[photoName]
  let maxHeight = windowHeight * 0.8;
  if (photoName == "sleepover.JPG") {
    maxHeight = windowHeight * 0.4;
  }
  let randomStrokeWeight = random(minStrokeWeight, maxStrokeWeight);
  let canvasRotation = getCanvasRotation();
  let buildingOutline = 0; // default black outline

  let buildingHeight = random(minHeight, maxHeight);
  push();
  noFill(); // default transparent building

  if (narrativeIndex == 1 && currentLine > 1) {
    if (currentLine >= building.length - 3) {
      buildingOutline = color(random(buildingOutlines));
      randomStrokeWeight = random(pt2MinStrokeWeight, pt2MaxStrokeWeight);
    } else {
      let buildingColor = color(random(buildingColors));
      buildingColor.setAlpha(100);
      fill(buildingColor);
    }
  }

  stroke(buildingOutline);
  strokeWeight(randomStrokeWeight);
  if (photo != undefined) {
    texture(photo);
    textureMode(NORMAL);
  }
  translate(startingTranslation, 0, 0);
  rotateX(canvasRotation);
  box(buildingWidth, buildingHeight);
  pop();
}

function renderBuildings() {
  const shiftRatio = windowWidth * 0.1;
  let startingTranslation = -windowWidth;
  let billboardIndex = 0;
  
  canvas3D.clear();
  canvas3D.touchEnded(nextSlide);
  renderImages();
  
  if (isEnding()) {
    shuffle(billboardPhotos, true)
    frameRate(0.4)
  } else {
    frameRate(1.2)
  }

  for (let i = 0; i < 20; i++) {
    if (isEnding() && random() > 0.6) {
      if (billboardIndex > billboardPhotos.length) {
        billboardIndex = 0;
      }
      let photo = billboardPhotos[billboardIndex]
      renderBuilding(startingTranslation, photo)

      billboardIndex += 1

    } else {
      renderBuilding(startingTranslation);
    }
    startingTranslation += shiftRatio;
  }
  noStroke();
}

function _getNarrative() {
  return narrative[narrativeIndex];
}

function getCurrentLine() {
  let currentNarrative = _getNarrative();
  let line = currentNarrative[currentLine];
  currentLine += 1;
  if (currentLine >= currentNarrative.length) {
    currentLine = 0;
    narrativeIndex += 1;
    narrativeIndex %= narrative.length;
  }
  return line;
}

function renderText() {
  let passage = getCurrentLine();
  foreground.html(passage);
}


