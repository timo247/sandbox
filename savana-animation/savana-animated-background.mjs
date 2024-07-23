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
  mountains.draw(ctx);
  ground.draw(ctx);
  grass.draw(ctx);
  trunk.draw(ctx);
  treeBottomStrokeHider.draw(ctx);
  leafs.draw(ctx);
  clouds.draw(ctx);
  birds.draw(ctx);
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
  treeBottomStrokeHider: {
    width: animationReferenceFrame.width * 0.12,
    height: animationReferenceFrame.height * 0.05,
    x: animationReferenceFrame.width * 0.67 + animationReferenceFrame.xOffset,
    y: animationReferenceFrame.height * 0.93,
  },
  ground: {
    width: animationReferenceFrame.width * 1.02,
    height: animationReferenceFrame.height * 0.23,
    x:
      animationReferenceFrame.width * 0.023 * -1 +
      animationReferenceFrame.xOffset,
    y: animationReferenceFrame.height * 0.87,
  },
  grass: {
    width: animationReferenceFrame.width * 0.72,
    height: animationReferenceFrame.height * 0.1,
    x: animationReferenceFrame.width * 0.09 + animationReferenceFrame.xOffset,
    y: animationReferenceFrame.height * 0.93,
  },
  mountains: {
    width: animationReferenceFrame.width * 0.67,
    height: animationReferenceFrame.height * 0.25,
    x:
      animationReferenceFrame.width * 0.03 * -1 +
      animationReferenceFrame.xOffset,
    y: animationReferenceFrame.height * 0.77,
  },
  birds: {
    width: animationReferenceFrame.width * 0.06,
    height: animationReferenceFrame.height * 0.07,
    x: animationReferenceFrame.width * 0.86 + animationReferenceFrame.xOffset,
    y: animationReferenceFrame.height * 0.24,
  },
  clouds: {
    width: animationReferenceFrame.width * 0.56,
    height: animationReferenceFrame.height * 0.09,
    x: animationReferenceFrame.width * 0.35 + animationReferenceFrame.xOffset,
    y: animationReferenceFrame.height * 0.15,
  },
  leafs: {
    width: animationReferenceFrame.width * 0.35,
    height: animationReferenceFrame.height * 0.26,
    x: animationReferenceFrame.width * 0.54 + animationReferenceFrame.xOffset,
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

const mountains = new ImageToDraw({
  imagePath: './assets/images/floor/mountain.svg',
  x: desktopLandscapeElementsGeometry.mountains.x,
  y: desktopLandscapeElementsGeometry.mountains.y,
  baseWidth: desktopLandscapeElementsGeometry.mountains.width,
  baseHeight: desktopLandscapeElementsGeometry.mountains.height,
});

const ground = new ImageToDraw({
  imagePath: './assets/images/floor/ground.svg',
  x: desktopLandscapeElementsGeometry.ground.x,
  y: desktopLandscapeElementsGeometry.ground.y,
  baseWidth: desktopLandscapeElementsGeometry.ground.width,
  baseHeight: desktopLandscapeElementsGeometry.ground.height,
});

const grass = new ImageToDraw({
  imagePath: './assets/images/floor/grass.svg',
  x: desktopLandscapeElementsGeometry.grass.x,
  y: desktopLandscapeElementsGeometry.grass.y,
  baseWidth: desktopLandscapeElementsGeometry.grass.width,
  baseHeight: desktopLandscapeElementsGeometry.grass.height,
});

const treeBottomStrokeHider = new ImageToDraw({
  imagePath: './assets/images/tree/bottom-stroke-hide.svg',
  x: desktopLandscapeElementsGeometry.treeBottomStrokeHider.x,
  y: desktopLandscapeElementsGeometry.treeBottomStrokeHider.y,
  baseWidth: desktopLandscapeElementsGeometry.treeBottomStrokeHider.width,
  baseHeight: desktopLandscapeElementsGeometry.treeBottomStrokeHider.height,
});

const clouds = new ImageToDraw({
  imagePath: './assets/images/sky/clouds.svg',
  x: desktopLandscapeElementsGeometry.clouds.x,
  y: desktopLandscapeElementsGeometry.clouds.y,
  baseWidth: desktopLandscapeElementsGeometry.clouds.width,
  baseHeight: desktopLandscapeElementsGeometry.clouds.height,
});

const birds = new ImageToDraw({
  imagePath: './assets/images/sky/birds.svg',
  x: desktopLandscapeElementsGeometry.birds.x,
  y: desktopLandscapeElementsGeometry.birds.y,
  baseWidth: desktopLandscapeElementsGeometry.birds.width,
  baseHeight: desktopLandscapeElementsGeometry.birds.height,
});
