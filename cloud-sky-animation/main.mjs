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
    cloud.moveRotational(logoAngle, 2);
    cloud.draw(ctx);
  });
  logoAngle += 0.1;
  logo.text.moveRotational(logoAngle, 2);
  logo.text.draw(ctx);
  requestAnimationFrame(reRender);
}
requestAnimationFrame(reRender);

function generateClouds() {
  const cloudGroups = [];
  for (let i = 0; i < 100; i++) {
    const cloudGroup = {
      sizeFactor: determineGroupSize(true),
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
    const groupBorderColor = '#566D71';
    // const groupBorderColor = 'black';
    //const groupColor = generateBlueShadeColor(true);
    const bigCloud = new InflatTorusCloud({
      y: groupY,
      x: groupX,
      color: groupColor,
      borderColor: groupBorderColor,
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
      borderColor: groupBorderColor,
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
      borderColor: groupBorderColor,
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
    color: '#C1D0D9',
    borderColor: '#E8EDF1',
  };
  const baseLogoPos = {
    x: ctx.canvas.clientWidth / 2 - 461.5 * logo.sizeFactor,
    y: (ctx.canvas.clientHeight * 1) / 5 - 282.5 * logo.sizeFactor,
  };
  const bigCloud = new InflatTorusCloud({
    y: baseLogoPos.y,
    x: baseLogoPos.x,
    baseY: baseLogoPos.y,
    baseX: baseLogoPos.x,
    color: logo.color,
    borderColor: logo.borderColor,
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
    color: logo.color,
    borderColor: logo.borderColor,
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
    color: logo.color,
    borderColor: logo.borderColor,
    sizeFactor: logo.sizeFactor,
    shape: 'small',
    flatTorusWidth: ctx.canvas.clientWidth,
    flatTorusHeight: ctx.canvas.clientHeight,
    speed: -0.0008,
  });
  const logoText = new ImageToDraw({
    x: baseLogoPos.x + 148 * logo.sizeFactor,
    y: baseLogoPos.y + 143 * logo.sizeFactor,
    baseX: baseLogoPos.x + 148 * logo.sizeFactor,
    baseY: baseLogoPos.y + 143 * logo.sizeFactor,
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

function determineGroupSize(withBenfordLaw) {
  //Benford natural law: in a scope of different values in the nature, we will systematically find the following repartition of numbers: 24x1, 18x2, 15x3, 11x4, 10x5, 9x6, 5x7, 5x8, 5x9
  if (withBenfordLaw) {
    let i = getRandomInt(1, 92);
    if (i <= 24) {
      return getRandomInt(3, 5) / 100;
    } else if (i > 24 && i <= 42) {
      return getRandomInt(7, 10) / 100;
    } else if (i > 42 && i <= 57) {
      return getRandomInt(13, 15) / 100;
    } else if (i > 57 && i <= 66) {
      return getRandomInt(17, 20) / 100;
    } else if (i > 66 && i <= 76) {
      return getRandomInt(23, 25) / 100;
    } else if (i > 76 && i <= 85) {
      return getRandomInt(27, 30) / 100;
    } else if (i > 85 && i <= 90) {
      return getRandomInt(27, 30) / 100;
    } else if (i > 90 && i <= 95) {
      return getRandomInt(33, 35) / 100;
    } else if (i > 95 && i < 100) {
      return getRandomInt(37, 40) / 100;
    }
  } else {
    let i = Math.floor(Math.random() * 15) + 1;
    if (i >= 14) {
      return getRandomInt(35, 50) / 100;
    } else if (i >= 10 && i < 14) {
      return getRandomInt(18, 30) / 100;
    } else {
      return getRandomInt(5, 15) / 100;
    }
  }
}

function calculateAngle(lastAngle) {
  return lastAngle++;
}

function generateBlueShadeColor(withLogoBlues) {
  const logoBlues = [
    {
      color: '#FFFFFF',
    },
    {
      color: '#F7F9FA',
    },
    {
      color: '#FBFCFD',
    },
    {
      color: '#F3F6F8',
    },
    {
      color: '#ECF0F3',
    },
    {
      color: '#E8EDF1',
    },
    {
      color: '#E4EAEE',
    },
    {
      color: '#D4DFE5',
    },
    {
      color: '#C9D6DE',
    },
    {
      color: '#C1D0D9',
    },
  ];

  const possbileBlues = [
    {
      color: '#F0FFFF',
    },
    {
      color: '#ADD8E6',
    },
    {
      color: '#B6D0E2',
    },
    {
      color: '#6F8FAF',
    },
    {
      color: '#F0F8FF',
    },
    {
      color: '#B9D9EB',
    },
    {
      color: '#B0C4DE',
    },
    {
      color: '#003153',
    },
    {
      color: '#1E2952',
    },
    {
      color: '#5D8AA8',
    },
    {
      color: '#E1EBEE',
    },
    {
      color: '#00416A',
    },
    {
      color: '#6082B6',
    },
    {
      color: '#4B9CD3',
    },
    {
      color: '#72A0C1',
    },
  ];

  if (withLogoBlues) {
    const n = getRandomInt(0, 9);
    return logoBlues[n].color;
  } else {
    const n = getRandomInt(0, 14);
    return possbileBlues[n].color;
  }
}
