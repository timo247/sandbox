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
  trunk.draw(ctx);
  leafs.draw(ctx);
  requestAnimationFrame(reRender);
}
requestAnimationFrame(reRender);

const animationReferenceFrame = {
  //width: ctx.canvas.width,
  //height: ctx.canvas.width * 0.65,
  height: ctx.canvas.height,
  width: ctx.canvas.clientHeight / 0.65,
  xOffset: ctx.canvas.width - ctx.canvas.clientHeight / 0.65,
};
const desktopLandscapeElementsGeometry = {
  grass: {},
  ground: {},
  mountains: {},
  birds: {},
  clouds: {},
  leafs: {
    width: animationReferenceFrame.width * 0.35,
    height: animationReferenceFrame.height * 0.26,
    x: animationReferenceFrame.width * 0.54 + animationReferenceFrame.xOffset,
    //x: ctx.canvas.width * 0.54,
    y: animationReferenceFrame.height * 0.39,
  },
  trunk: {
    width: animationReferenceFrame.width * 0.19,
    height: animationReferenceFrame.height * 0.44,
    //x: ctx.canvas.width * 0.63,
    x: animationReferenceFrame.width * 0.63 + animationReferenceFrame.xOffset,
    y: animationReferenceFrame.height * 0.54,
  },
};

const trunk = new ImageToDraw({
  imagePath: './assets/images/tree/trunk.svg',
  x: desktopLandscapeElementsGeometry.trunk.x,
  y: desktopLandscapeElementsGeometry.trunk.y,
  baseWidth: desktopLandscapeElementsGeometry.trunk.width,
  baseHeight: desktopLandscapeElementsGeometry.trunk.height,
});

const leafs = new ImageToDraw({
  imagePath: './assets/images/tree/leafs.svg',
  x: desktopLandscapeElementsGeometry.leafs.x,
  y: desktopLandscapeElementsGeometry.leafs.y,
  baseWidth: desktopLandscapeElementsGeometry.leafs.width,
  baseHeight: desktopLandscapeElementsGeometry.leafs.height,
});
