class FishingRod {
  constructor(hookLength = 125, lineThickness = 3, rodBaseY = 50) {
    this.hookLength = hookLength;
    this.lineThickness = lineThickness;
    this.rodBaseY = rodBaseY;
    this.rodWidth = 100;
  }

  display(rodX, rodY) {
    strokeWeight(10);
    stroke(50, 25, 0);
    // Starter i x-koordinatet
    line(rodX - this.rodWidth / 2, this.rodBaseY, rodX, rodY);

    noFill();
    strokeWeight(this.lineThickness + 1);
    stroke(0);

    strokeWeight(this.lineThickness);
    stroke(0);

    line(rodX, rodY, rodX, rodY + this.hookLength);
  }

  // Metoden beregner, hvor krogens spids præcist er (uændret)
  getHookTipPosition(rodX, rodY) {
    return {
      x: rodX,
      y: rodY + this.hookLength,
    };
  }
}
