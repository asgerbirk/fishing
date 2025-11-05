class FishBox {
  constructor(x, y, img, width = 150, height = 150) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.width = width;
    this.height = height;
  }

  display() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}
