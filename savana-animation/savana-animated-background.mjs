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

const desktopLandscapeElementsGeometry = {
  grass: {},
  ground: {},
  mountains: {},
  birds: {},
  clouds: {},
  leafs: {},
  trunk: {
    width: ctx.canvas.clientWidth * 0.19,
    height: ctx.canvas.clientHeight * 0.44,
    x: 1096,
    y: 528,
  },
};

const tree = new ImageToDraw({
  imagePath: './assets/images/tree/trunk.svg',
  x: desktopLandscapeElementsGeometry.trunk.x,
  y: desktopLandscapeElementsGeometry.trunk.y,
  baseWidth: desktopLandscapeElementsGeometry.trunk.width,
  baseHeight: desktopLandscapeElementsGeometry.height,
});
