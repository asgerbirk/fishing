let receivedStep = 0;
let caughtFish = null;
const hookCatchRadius = 30;
let fishCaughtCount = 0;
let qrImg;
let catchSound;
let backgroundSound;

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
  qrImg = loadImage("assets/frame.png");
  backgroundSound = loadSound(
    "assets/soft-ocean-waves-on-a-rock-beach-sound-190882.mp3"
  );
  catchSound = loadSound("assets/box-crash-106687.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  backgroundSound.setLoop(true);
  backgroundSound.setVolume(0.3);

  rodX = width / 2;

  fishBox = new FishBox(100, 10, fishBoxImage, 150, 150);
  fishingRod = new FishingRod();
  waterSurface = new Water(waterLevel);

  for (let i = 0; i < 10; i++) {
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
    fishCaughtCount += 1;

    if (catchSound) {
      catchSound.setVolume(0.6);
      catchSound.play();
    }
  }
}

function drawTopRightUI() {
  const boxWidth = 320;
  const boxHeight = 220;
  const margin = 20;

  const x = width - boxWidth - margin;
  const y = margin;

  push();
  noStroke();
  fill(60, 60, 60, 230);
  rect(x, y, boxWidth, boxHeight, 20);

  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  const txt =
    "Scan this QR code in your Google Chrome app to control the fishing rod.";
  text(txt, x + 15, y + 15, boxWidth - 30);

  const qrSize = 140;
  const qrX = x + (boxWidth - qrSize) / 2;

  const qrY = y + boxHeight / 2 - qrSize / 2 + 20;
  image(qrImg, qrX, qrY, qrSize, qrSize);

  pop();
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

  // If a fish is already on the hook, make it follow the hook tip
  if (caughtFish && caughtFish.onHook) {
    caughtFish.x = hookTip.x;
    caughtFish.y = hookTip.y;

    if (caughtFish.y < waterLevel) {
      caughtFish.onHook = false;
    }
  }

  // If no fish is currently caught, check for collision
  if (!caughtFish) {
    for (let fish of fishList) {
      if (fish.inBucket || fish.caught || fish.onHook) continue;

      const d = dist(hookTip.x, hookTip.y, fish.x, fish.y);
      if (d < hookCatchRadius) {
        fish.caught = true;
        fish.onHook = true;
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
    if (fish.caught && !fish.inBucket && !fish.onHook) {
      moveFishToBucket(fish);
    } else if (!fish.onHook && !fish.inBucket && !fish.caught) {
      fish.move();
    }

    fish.display();
  }

  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text(
    "Fishes caught: " + fishCaughtCount,
    fishBox.x,
    fishBox.y + fishBox.height + 20
  );

  drawTopRightUI();
}

const threshold = 10;
function touchStarted() {
  setupOrientation(threshold);
}
function mousePressed() {
  if (!backgroundSound.isPlaying()) {
    backgroundSound.play();
  }
}
