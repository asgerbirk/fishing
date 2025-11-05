// fish variabler
let fishImage;
let fishList = [];

//water variabler
let waterSurface;
const waterLevel = 500;

// fiskestang
let fishingRod;

// fiskeboks
let fishBoxImage;
let fishBox;

function preload() {
  fishImage = loadImage("assets/fish.png");
  fishBoxImage = loadImage("assets/image.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  fishBox = new FishBox(100, 10, fishBoxImage, 150, 150);
  fishingRod = new FishingRod();
  waterSurface = new Water(waterLevel);

  for (let i = 0; i < 100; i++) {
    let startY = random(waterLevel + 20, height - 50);
    fishList.push(new Fish(random(width), startY, random(1, 3), fishImage));
  }
}

function draw() {
  waterSurface.display();
  fishBox.display();

  const FIXED_ROD_X = width / 2;
  const FIXED_ROD_Y = 200;

  fishingRod.display(FIXED_ROD_X, FIXED_ROD_Y);

  if (orientationSensor.hasNewValue) {
    let gyro = orientationSensor.get();
    let alpha = gyro.alpha; // alpha, beta & gamma
    console.log("SENDT (alpha): " + alpha);
    sender(alpha);
  }
  for (let fish of fishList) {
    fish.move();
    fish.display();
  }
}

const threshold = 10;
function touchStarted() {
  setupOrientation(threshold);
}
