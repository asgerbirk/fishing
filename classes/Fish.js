class Fish {
  constructor(x, y, speed, img) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.img = img;
    this.width = 50;
    this.height = 25;
    this.direction = 1;

    this.caught = false;
    this.inBucket = false;

    // Random starting direction
    if (random() < 0.5) {
      this.direction = -1;
    }
  }

  display() {
    push();

    translate(this.x, this.y);

    // Flip the fish if it swims to the left
    if (this.direction === -1) {
      scale(-1, 1); // Mirror the image horizontally
    }

    image(this.img, -this.width / 2, -this.height / 2, this.width, this.height);

    pop();
  }

  move() {
    //implement caught logic later.
    if (!this.caught) {
      this.x += this.speed * this.direction;

      if (random() < 0.01) {
        this.direction *= -1;
      }

      if (this.x > width + this.width / 2) {
        this.direction = -1;
        this.x = width + this.width / 2;
      } else if (this.x < -this.width / 2) {
        this.direction = 1;
        this.x = -this.width / 2;
      }
    }
  }
}
