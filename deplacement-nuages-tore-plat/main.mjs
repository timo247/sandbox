import InflatTorusCloud from './inflatTorusCloud.mjs';
import { getRandomInt } from '../Utilities.mjs';
import randomColor from '../Utilities.mjs';

const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;
console.log('cava heigh:', ctx.canvas.clientWidth);
// let cloud1 = new InflatTorusCloud({
//   y: 200,
//   x: 100,
//   color: randomColor({ hue: 'blue', luminosity: 'light' }),
//   borderColor: randomColor({ hue: 'blue', luminosity: 'dark' }),
//   shape: 'reverse',
//   flatTorusWidth: ctx.canvas.clientWidth,
// });
// cloud1.draw(ctx);

const cloudGroups = generateClouds();
console.log(cloudGroups);

let angle = 0;
let lastTime = 0;
function reRender(time) {
  let deltaT = time - lastTime;
  lastTime = time;
  ctx.canvas.height = ctx.canvas.clientHeight;
  ctx.canvas.width = ctx.canvas.clientWidth;
  //   cloud1.move(deltaT, 0);
  //   cloud1.draw(ctx);
  //   cloudGroups.forEach((cloudGroup) => {
  //     cloudGroup.clouds.forEach((cloud) => {
  //       cloud.move(deltaT, 0);
  //       cloud.draw(ctx);
  //     });
  //   });
  cloudGroups[0].clouds.forEach((cloud) => {
    cloud.move(deltaT, 0);
    cloud.draw(ctx);
  });
  requestAnimationFrame(reRender);
}
requestAnimationFrame(reRender);

function generateClouds() {
  const cloudGroups = [];

  for (let i = 0; i < 50; i++) {
    const cloudGroup = {
      sizeFactor: 0.25 * Math.random() + 0.25,
      clouds: [],
    };
    const groupY = getRandomInt(0, ctx.canvas.clientHeight);
    const groupX = getRandomInt(0, ctx.canvas.clientWidth);
    const bigCloud = new InflatTorusCloud({
      y: groupY,
      x: groupX,
      color: randomColor({ hue: 'blue', luminosity: 'light' }),
      sizeFactor: cloudGroup.sizeFactor,
      shape: 'normal',
      flatTorusWidth: ctx.canvas.clientWidth,
      flatTorusHeight: ctx.canvas.clientHeight,
    });
    const mediumCloud = new InflatTorusCloud({
      y: groupY,
      x: groupX,
      color: randomColor({ hue: 'blue', luminosity: 'light' }),
      sizeFactor: cloudGroup.sizeFactor,
      shape: 'reverse',
      flatTorusWidth: ctx.canvas.clientWidth,
      flatTorusHeight: ctx.canvas.clientHeight,
    });
    const smallCloud = new InflatTorusCloud({
      y: groupY,
      x: groupX,
      color: randomColor({ hue: 'blue', luminosity: 'light' }),
      sizeFactor: cloudGroup.sizeFactor * 0.5,
      shape: 'reverse',
      flatTorusWidth: ctx.canvas.clientWidth,
      flatTorusHeight: ctx.canvas.clientHeight,
    });
    cloudGroup.clouds.push(bigCloud);
    cloudGroup.clouds.push(mediumCloud);
    cloudGroup.clouds.push(smallCloud);
    cloudGroups.push(cloudGroup);
    //console.log(cloudGroups[0]);
  }
  //sort the clouds array for InflatTorus
  sortCloudGroupsTab(cloudGroups);
  return cloudGroups;
}

function sortCloudGroupsTab(tab) {
  let randomCloud = new InflatTorusCloud({});
  tab.sort((a, b) => randomCloud.compareSize(a.sizeFactor, b.sizeFactor));
}
