// fish variabler
let fishImage;
let fishList = [];

//water variabler
let waterSurface;
const waterLevel = 500;

// fiskestang
let fishingRod;
let rodX;
const rodY = 200;

// fiskeboks
let fishBoxImage;
let fishBox;

let bg = 255;

function preload() {
  fishImage = loadImage("assets/fish.png");
  fishBoxImage = loadImage("assets/image.png");
}

let receivedStepFromPhone = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  rodX = width / 2;

  fishBox = new FishBox(100, 10, fishBoxImage, 150, 150);
  fishingRod = new FishingRod();
  waterSurface = new Water(waterLevel);

  for (let i = 0; i < 100; i++) {
    let startY = random(waterLevel + 20, height - 50);
    fishList.push(new Fish(random(width), startY, random(1, 3), fishImage));
  }
}

function draw() {
  background(bg);
  waterSurface.display();
  fishBox.display();

  const movingSize = 15;

  rodX += receivedStep * movingSize;
  rodX = constrain(rodX, 0, width);

  receivedStep = 0;

  fishingRod.display(rodX, rodY);

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
