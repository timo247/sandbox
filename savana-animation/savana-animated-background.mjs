import InflatTorusCloud from './assets/js/inflatTorusCloud.mjs';
import { getRandomInt } from './assets/js/utilities.mjs';
import randomColor from './assets/js/utilities.mjs';
import ImageToDraw from './assets/js/imageToDraw.mjs';

const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;
console.log('canvas width:', ctx.canvas.clientWidth);
let lastTime = 0;
function reRender(time) {
  let deltaT = time - lastTime;
  lastTime = time;
  ctx.canvas.height = ctx.canvas.clientHeight;
  ctx.canvas.width = ctx.canvas.clientWidth;
  tree.move(deltaT, 15);
  tree.draw(ctx);
  requestAnimationFrame(reRender);
}
requestAnimationFrame(reRender);

const tree = new ImageToDraw({
  imagePath: './assets/images/tree/tronc.svg',
  x: ctx.canvas.clientWidth / 2,
  y: ctx.canvas.clientHeight / 2,
  baseX: ctx.canvas.clientWidth + 5,
  baseY: ctx.canvas.clientHeight + 5,
  sizeFactor: 1,
  speed: 0.08,
  //baseHeight: 293,
  //baseWidth: 597,
});
