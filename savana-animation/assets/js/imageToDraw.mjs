export default class ImageToDraw {
  constructor({
    x = 0,
    y = 0,
    baseX = 0,
    baseY = 0,
    speed = 0,
    imagePath = './text-chroniques.svg',
    sizeFactor = 1,
    baseWidth = 0,
    baseHeight = 0,
  } = {}) {
    this.x = x;
    this.y = y;
    (this.baseX = baseX), (this.baseY = baseY), (this.speed = speed);
    this.imagePath = imagePath;
    this.sizeFactor = sizeFactor;
    this.baseHeight = baseHeight;
    this.baseWidth = baseWidth;
  }

  move(deltaT, angle) {
    this.x = this.x + Math.cos(angle) * this.speed * deltaT;
    this.y = this.y + Math.sin(angle * -1) * this.speed * deltaT;
  }

  moveRotational(angle, radius) {
    this.x = this.baseX + radius * Math.cos(angle) * this.sizeFactor;
    this.y = this.baseY + radius * Math.sin(angle * -1) * this.sizeFactor;
  }

  draw(ctx) {
    console.log('image:', this.imagePath, this);
    const image = new Image();
    image.src = this.imagePath;
    if (this.baseWidth == 0) {
      ctx.drawImage(image, this.x, this.y);
    } else {
      ctx.drawImage(
        image,
        this.x,
        this.y,
        this.baseWidth * this.sizeFactor,
        this.baseHeight * this.sizeFactor
      );
    }
  }
}
