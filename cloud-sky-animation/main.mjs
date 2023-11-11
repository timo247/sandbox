import InflatTorusCloud from './inflatTorusCloud.mjs';
import { getRandomInt } from '../Utilities.mjs';
import randomColor from '../Utilities.mjs';
import ImageToDraw from './imageToDraw.mjs';

const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;
console.log('cava heigh:', ctx.canvas.clientWidth);
const cloudGroups = generateClouds();
const logo = generateLogo();
let backgroundAngle = 0;
let logoAngle = 0;
let lastTime = 0;
function reRender(time) {
  let deltaT = time - lastTime;
  lastTime = time;
  ctx.canvas.height = ctx.canvas.clientHeight;
  ctx.canvas.width = ctx.canvas.clientWidth;
  cloudGroups.forEach((cloudGroup) => {
    cloudGroup.clouds.forEach((cloud) => {
      cloud.move(deltaT, backgroundAngle);
      cloud.draw(ctx);
    });
  });
  logo.clouds.forEach((cloud) => {
    cloud.moveCircular(deltaT, logoAngle);
    cloud.draw(ctx);
  });
  logoAngle++;
  logo.text.move(deltaT, backgroundAngle);
  logo.text.draw(ctx);
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
      hue: '',
      luminosity: '',
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
    cloudGroup.clouds.push(bigCloud);
    cloudGroup.clouds.push(mediumCloud);
    cloudGroup.clouds.push(smallCloud);
    cloudGroups.push(cloudGroup);
  }
  sortCloudGroups(cloudGroups);
  return cloudGroups;
}

function generateLogo() {
  const logo = {
    sizeFactor: 0.6,
    clouds: [],
    text: null,
  };
  const baseLogoPos = {
    x: ctx.canvas.clientWidth / 2 - 461.5 * logo.sizeFactor,
    y: (ctx.canvas.clientHeight * 2) / 5 - 282.5 * logo.sizeFactor,
  };
  const bigCloud = new InflatTorusCloud({
    y: baseLogoPos.y,
    x: baseLogoPos.x,
    baseY: baseLogoPos.y,
    baseX: baseLogoPos.x,
    color: '#C1D0D9',
    sizeFactor: logo.sizeFactor,
    shape: 'big',
    flatTorusWidth: ctx.canvas.clientWidth,
    flatTorusHeight: ctx.canvas.clientHeight,
    speed: 0.0008,
  });
  const mediumCloud = new InflatTorusCloud({
    y: baseLogoPos.y + logo.sizeFactor * 85,
    x: baseLogoPos.x + logo.sizeFactor * 197,
    baseY: baseLogoPos.y + logo.sizeFactor * 85,
    baseX: baseLogoPos.x + logo.sizeFactor * 197,
    color: '#C1D0D9',
    sizeFactor: logo.sizeFactor,
    shape: 'medium',
    flatTorusWidth: ctx.canvas.clientWidth,
    flatTorusHeight: ctx.canvas.clientHeight,
    speed: -0.0008,
  });
  const smallCloud = new InflatTorusCloud({
    y: baseLogoPos.y + logo.sizeFactor * 369,
    x: baseLogoPos.x + logo.sizeFactor * 712,
    baseY: baseLogoPos.y + logo.sizeFactor * 369,
    baseX: baseLogoPos.x + logo.sizeFactor * 712,
    color: '#C1D0D9',
    sizeFactor: logo.sizeFactor,
    shape: 'small',
    flatTorusWidth: ctx.canvas.clientWidth,
    flatTorusHeight: ctx.canvas.clientHeight,
    speed: -0.0008,
  });
  const logoText = new ImageToDraw({
    x: baseLogoPos.x + 148 * logo.sizeFactor,
    y: baseLogoPos.y + 143 * logo.sizeFactor,
    sizeFactor: logo.sizeFactor,
    baseHeight: 293,
    baseWidth: 597,
  });

  logo.clouds.push(mediumCloud);
  logo.clouds.push(bigCloud);
  logo.clouds.push(smallCloud);
  logo.text = logoText;

  return logo;
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

function calculateAngle(lastAngle) {
  return lastAngle++;
}
