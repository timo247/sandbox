import randomColor from '../Utilities.mjs';

export default class InflatTorusCloud {
  constructor({
    x = 0,
    y = 0,
    sizeFactor = 0.6,
    speed = 0.1,
    color = 'blue',
    borderColor = 'black',
    depthPlan = 299,
    flatTorusLength = 900,
    flatTorusWidth = 900,
    shape = 'big',
  } = {}) {
    this.x = x;
    this.y = y;
    this.sizeFactor = sizeFactor;
    this.color = color;
    this.borderColor = borderColor;
    this.depthPlan = depthPlan;
    this.speed = speed;
    this.flatTorusLength = flatTorusLength;
    this.flatTorusWidth = flatTorusWidth;
    this.shape = shape;
  }

  move(deltaT, angle) {
    this.x = this.x + Math.cos(angle) * this.speed * deltaT;
    this.y = this.y + Math.sin(angle * -1) * this.speed * deltaT;
    if (this.x > this.flatTorusWidth) {
      this.x -= this.flatTorusWidth + this.sizeFactor * 847;
    }
    // if (this.y > this.flatTorusLength) {
    //   this.y -= this.flatTorusLength;
    // } else if (this.y < 0) {
    //   this.y += this.flatTorusLength;
    // }
  }

  setSizeFactor(factor) {
    this.sizeFactor = factor;
  }

  draw(ctx) {
    if (this.shape === 'big') {
      this.drawBigCloudShape(ctx);
    } else if (this.shape == 'medium') {
      this.drawMediumCloudShape(ctx);
    } else if (this.shape == 'small') {
      this.drawSmallCloudShape(ctx);
    }
  }

  drawBigCloudShape(ctx) {
    ctx.beginPath();
    ctx.moveTo(
      487.0 * this.sizeFactor + this.x,
      188.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      487.0 * this.sizeFactor + this.x,
      188.0 * this.sizeFactor + this.y,
      658.5 * this.sizeFactor + this.x,
      188.0 * this.sizeFactor + this.y,
      658.5 * this.sizeFactor + this.x,
      188.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      762.61 * this.sizeFactor + this.x,
      188.0 * this.sizeFactor + this.y,
      847.0 * this.sizeFactor + this.x,
      272.39 * this.sizeFactor + this.y,
      847.0 * this.sizeFactor + this.x,
      376.5 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      847.0 * this.sizeFactor + this.x,
      480.61 * this.sizeFactor + this.y,
      762.61 * this.sizeFactor + this.x,
      565.0 * this.sizeFactor + this.y,
      658.5 * this.sizeFactor + this.x,
      565.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      658.5 * this.sizeFactor + this.x,
      565.0 * this.sizeFactor + this.y,
      188.5 * this.sizeFactor + this.x,
      565.0 * this.sizeFactor + this.y,
      188.5 * this.sizeFactor + this.x,
      565.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      84.39 * this.sizeFactor + this.x,
      565.0 * this.sizeFactor + this.y,
      0.0 * this.sizeFactor + this.x,
      480.61 * this.sizeFactor + this.y,
      0.0 * this.sizeFactor + this.x,
      376.5 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      0.0 * this.sizeFactor + this.x,
      300.41 * this.sizeFactor + this.y,
      45.09 * this.sizeFactor + this.x,
      234.85 * this.sizeFactor + this.y,
      110.0 * this.sizeFactor + this.x,
      205.07 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      110.0 * this.sizeFactor + this.x,
      205.07 * this.sizeFactor + this.y,
      110.0 * this.sizeFactor + this.x,
      188.5 * this.sizeFactor + this.y,
      110.0 * this.sizeFactor + this.x,
      188.5 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      110.0 * this.sizeFactor + this.x,
      84.39 * this.sizeFactor + this.y,
      194.39 * this.sizeFactor + this.x,
      0.0 * this.sizeFactor + this.y,
      298.5 * this.sizeFactor + this.x,
      0.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      402.44 * this.sizeFactor + this.x,
      0.0 * this.sizeFactor + this.y,
      486.73 * this.sizeFactor + this.x,
      84.12 * this.sizeFactor + this.y,
      487.0 * this.sizeFactor + this.x,
      188.0 * this.sizeFactor + this.y
    );
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.borderColor;
    ctx.stroke();
  }

  drawMediumCloudShape(ctx) {
    ctx.beginPath();
    ctx.moveTo(
      368.5 * this.sizeFactor + this.x,
      102.54 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      368.5 * this.sizeFactor + this.x,
      102.54 * this.sizeFactor + this.y,
      368.5 * this.sizeFactor + this.x,
      94.25 * this.sizeFactor + this.y,
      368.5 * this.sizeFactor + this.x,
      94.25 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      368.5 * this.sizeFactor + this.x,
      42.2 * this.sizeFactor + this.y,
      326.3 * this.sizeFactor + this.x,
      0.0 * this.sizeFactor + this.y,
      274.25 * this.sizeFactor + this.x,
      0.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      222.28 * this.sizeFactor + this.x,
      0.0 * this.sizeFactor + this.y,
      180.13 * this.sizeFactor + this.x,
      42.06 * this.sizeFactor + this.y,
      180.0 * this.sizeFactor + this.x,
      94.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      180.0 * this.sizeFactor + this.x,
      94.0 * this.sizeFactor + this.y,
      94.25 * this.sizeFactor + this.x,
      94.0 * this.sizeFactor + this.y,
      94.25 * this.sizeFactor + this.x,
      94.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      42.2 * this.sizeFactor + this.x,
      94.0 * this.sizeFactor + this.y,
      0.0 * this.sizeFactor + this.x,
      136.2 * this.sizeFactor + this.y,
      0.0 * this.sizeFactor + this.x,
      188.25 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      0.0 * this.sizeFactor + this.x,
      240.3 * this.sizeFactor + this.y,
      42.2 * this.sizeFactor + this.x,
      282.5 * this.sizeFactor + this.y,
      94.25 * this.sizeFactor + this.x,
      282.5 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      94.25 * this.sizeFactor + this.x,
      282.5 * this.sizeFactor + this.y,
      329.25 * this.sizeFactor + this.x,
      282.5 * this.sizeFactor + this.y,
      329.25 * this.sizeFactor + this.x,
      282.5 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      381.3 * this.sizeFactor + this.x,
      282.5 * this.sizeFactor + this.y,
      423.5 * this.sizeFactor + this.x,
      240.3 * this.sizeFactor + this.y,
      423.5 * this.sizeFactor + this.x,
      188.25 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      423.5 * this.sizeFactor + this.x,
      150.2 * this.sizeFactor + this.y,
      400.96 * this.sizeFactor + this.x,
      117.42 * this.sizeFactor + this.y,
      368.5 * this.sizeFactor + this.x,
      102.54 * this.sizeFactor + this.y
    );
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.borderColor;
    ctx.stroke();
  }

  drawSmallCloudShape(ctx) {
    ctx.beginPath();
    ctx.moveTo(
      184.25 * this.sizeFactor + this.x,
      51.27 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      184.25 * this.sizeFactor + this.x,
      51.27 * this.sizeFactor + this.y,
      184.25 * this.sizeFactor + this.x,
      47.13 * this.sizeFactor + this.y,
      184.25 * this.sizeFactor + this.x,
      47.13 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      184.25 * this.sizeFactor + this.x,
      21.1 * this.sizeFactor + this.y,
      163.15 * this.sizeFactor + this.x,
      0.0 * this.sizeFactor + this.y,
      137.12 * this.sizeFactor + this.x,
      0.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      111.14 * this.sizeFactor + this.x,
      0.0 * this.sizeFactor + this.y,
      90.07 * this.sizeFactor + this.x,
      21.03 * this.sizeFactor + this.y,
      90.0 * this.sizeFactor + this.x,
      47.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      90.0 * this.sizeFactor + this.x,
      47.0 * this.sizeFactor + this.y,
      47.13 * this.sizeFactor + this.x,
      47.0 * this.sizeFactor + this.y,
      47.13 * this.sizeFactor + this.x,
      47.0 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      21.1 * this.sizeFactor + this.x,
      47.0 * this.sizeFactor + this.y,
      0.0 * this.sizeFactor + this.x,
      68.1 * this.sizeFactor + this.y,
      0.0 * this.sizeFactor + this.x,
      94.12 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      0.0 * this.sizeFactor + this.x,
      120.15 * this.sizeFactor + this.y,
      21.1 * this.sizeFactor + this.x,
      141.25 * this.sizeFactor + this.y,
      47.13 * this.sizeFactor + this.x,
      141.25 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      47.13 * this.sizeFactor + this.x,
      141.25 * this.sizeFactor + this.y,
      164.62 * this.sizeFactor + this.x,
      141.25 * this.sizeFactor + this.y,
      164.62 * this.sizeFactor + this.x,
      141.25 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      190.65 * this.sizeFactor + this.x,
      141.25 * this.sizeFactor + this.y,
      211.75 * this.sizeFactor + this.x,
      120.15 * this.sizeFactor + this.y,
      211.75 * this.sizeFactor + this.x,
      94.12 * this.sizeFactor + this.y
    );
    ctx.bezierCurveTo(
      211.75 * this.sizeFactor + this.x,
      75.1 * this.sizeFactor + this.y,
      200.48 * this.sizeFactor + this.x,
      58.71 * this.sizeFactor + this.y,
      184.25 * this.sizeFactor + this.x,
      51.27 * this.sizeFactor + this.y
    );
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.borderColor;
    ctx.stroke();
  }
}
