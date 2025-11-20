let receivedStep = 0;
let caughtFish = null;
const hookCatchRadius = 30;

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

function preload() {
  fishImage = loadImage("assets/fish.png");
  fishBoxImage = loadImage("assets/image.png");
}

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

function moveFishToBucket(fish) {
  const targetX = fishBox.x + fishBox.width / 2;
  const targetY = fishBox.y + fishBox.height / 2;

  fish.x = lerp(fish.x, targetX, 0.1);
  fish.y = lerp(fish.y, targetY, 0.1);

  const d = dist(fish.x, fish.y, targetX, targetY);
  if (d < 10) {
    fish.caught = false;
    fish.inBucket = true;
    caughtFish = null;
  }
}

function draw() {
  background(255);
  waterSurface.display();
  fishBox.display();

  const movingSize = 15;

  rodX += receivedStep * movingSize;
  rodX = constrain(rodX, 0, width);

  receivedStep = 0;

  fishingRod.display(rodX, rodY);

  const hookTip = fishingRod.getHookTipPosition(rodX, rodY, 0);

  if (!caughtFish) {
    for (let fish of fishList) {
      if (fish.inBucket) continue;

      const d = dist(hookTip.x, hookTip.y, fish.x, fish.y);
      if (d < hookCatchRadius) {
        fish.caught = true;
        caughtFish = fish;
        break;
      }
    }
  }
  /*
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
    */
  for (let fish of fishList) {
    if (fish === caughtFish && fish.caught && !fish.inBucket) {
      moveFishToBucket(fish);
    } else {
      fish.move();
    }

    fish.display();
  }
}

const threshold = 10;
function touchStarted() {
  setupOrientation(threshold);
}
