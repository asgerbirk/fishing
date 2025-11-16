class FishingRod {
  constructor(hookLength = 125, lineThickness = 3, rodBaseY = 50) {
    this.hookLength = hookLength;
    this.lineThickness = lineThickness;
    this.rodBaseY = rodBaseY;
    this.rodWidth = 100;
  }

  display(rodX, rodY, angle = 0) {
    push();

    translate(rodX, rodY);

    rotate(angle);

    strokeWeight(10);
    stroke(50, 25, 0);

    line(-this.rodWidth / 2, this.rodBaseY - rodY, 0, 0);

    noFill();
    strokeWeight(this.lineThickness);
    stroke(0);
    line(0, 0, 0, this.hookLength);

    pop();
  }

  increaseLength(amount = 20) {
    this.hookLength += amount;
  }

  getHookTipPosition(rodX, rodY, angle = 0) {
    // Return tip AFTER rotation
    let tipX = rodX + sin(angle) * this.hookLength;
    let tipY = rodY + cos(angle) * this.hookLength;
    return { x: tipX, y: tipY };
  }
}
