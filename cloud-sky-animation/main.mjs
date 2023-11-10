import InflatTorusCloud from './inflatTorusCloud.mjs';
import { getRandomInt } from '../Utilities.mjs';
import randomColor from '../Utilities.mjs';

const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;
console.log('cava heigh:', ctx.canvas.clientWidth);
const cloudGroups = generateClouds();
let angle = 0;
let lastTime = 0;
function reRender(time) {
  let deltaT = time - lastTime;
  lastTime = time;
  ctx.canvas.height = ctx.canvas.clientHeight;
  ctx.canvas.width = ctx.canvas.clientWidth;
  cloudGroups.forEach((cloudGroup) => {
    cloudGroup.clouds.forEach((cloud) => {
      cloud.move(deltaT, angle);
      cloud.draw(ctx);
    });
  });
  // cloudGroups[0].clouds.forEach((cloud) => {
  //   cloud.move(deltaT, 0);
  //   cloud.draw(ctx);
  // });
  requestAnimationFrame(reRender);
}
requestAnimationFrame(reRender);

function generateClouds() {
  const cloudGroups = [];
  for (let i = 0; i < 75; i++) {
    const cloudGroup = {
      sizeFactor: determineGroupSize(),
      clouds: [],
    };
    const groupY =
      getRandomInt(0, (ctx.canvas.clientHeight * 2) / 5) -
      200 * cloudGroup.sizeFactor;
    const groupX = getRandomInt(0, ctx.canvas.clientWidth);
    const groupColor = randomColor({
      hue: 'blue',
      luminosity: 'light',
    });
    const bigCloud = new InflatTorusCloud({
      y: groupY,
      x: groupX,
      color: groupColor,
      sizeFactor: cloudGroup.sizeFactor,
      shape: 'big',
      flatTorusWidth: ctx.canvas.clientWidth,
      flatTorusHeight: ctx.canvas.clientHeight,
      speed: cloudGroup.sizeFactor * 0.3,
    });
    const mediumCloud = new InflatTorusCloud({
      y: groupY + cloudGroup.sizeFactor * 85,
      x: groupX + cloudGroup.sizeFactor * 197,
      color: groupColor,
      sizeFactor: cloudGroup.sizeFactor,
      shape: 'medium',
      flatTorusWidth: ctx.canvas.clientWidth,
      flatTorusHeight: ctx.canvas.clientHeight,
      speed: cloudGroup.sizeFactor * 0.3,
    });
    const smallCloud = new InflatTorusCloud({
      y: groupY + cloudGroup.sizeFactor * 369,
      x: groupX + cloudGroup.sizeFactor * 712,
      color: groupColor,
      sizeFactor: cloudGroup.sizeFactor,
      shape: 'small',
      flatTorusWidth: ctx.canvas.clientWidth,
      flatTorusHeight: ctx.canvas.clientHeight,
      speed: cloudGroup.sizeFactor * 0.3,
    });
    sortCloudsInsideGroup(cloudGroup, [bigCloud, mediumCloud, smallCloud]);
    cloudGroups.push(cloudGroup);
  }
  sortCloudGroups(cloudGroups);
  return cloudGroups;
}

function sortCloudsInsideGroup(cloudGroup, clouds) {
  let randomN = Math.random();
  if (randomN <= 0.33) {
    cloudGroup.clouds = [clouds[0], clouds[1], clouds[2]];
  } else if (randomN > 0.33 && randomN <= 0.66) {
    cloudGroup.clouds = [clouds[1], clouds[0], clouds[2]];
  } else {
    cloudGroup.clouds = [clouds[1], clouds[2], clouds[0]];
  }
}

function sortCloudGroups(cloudGroups) {
  cloudGroups.sort((group1, group2) =>
    compareSize(group1.sizeFactor, group2.sizeFactor)
  );
}

function compareSize(el1, el2) {
  if (el1 > el2) {
    return 1;
  } else if (el1 < el2) {
    return -1;
  } else {
    return 0;
  }
}

function determineGroupSize() {
  let i = Math.floor(Math.random() * 15) + 1;
  if (i >= 14) {
    return getRandomInt(35, 50) / 100;
  } else if (i >= 10 && i < 14) {
    return getRandomInt(18, 30) / 100;
  } else {
    return getRandomInt(5, 15) / 100;
  }
}
