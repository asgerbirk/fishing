class Water {
  constructor(yLevel) {
    this.yLevel = yLevel;
    this.color = color(0, 176, 255);
  }

  display() {
    noStroke();
    fill(this.color);

    rect(0, this.yLevel, width, height - this.yLevel);
  }
}
