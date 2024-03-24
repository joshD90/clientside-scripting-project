const driveArea = document.getElementById("driveArea");
const car = document.getElementById("gameCar");
const timer = document.getElementById("time");
const successMessage = document.getElementById("successMessage");

const coinsArray = [
  [10, 20],
  [20, 30],
  [60, 20],
  [90, 80],
  [60, 50],
];

let coinElementsArray = [];

let time = 0;
let timerGoing = true;

//key directions
let up = false;
let down = false;
let left = false;
let right = false;

class Car {
  constructor(x, y, width, height, speed, rotationAngle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.rotation = rotationAngle;
  }
}

//managing input
const manageKeyDown = (event) => {
  switch (event.keyCode) {
    case 37:
      left = true;
      break;
    case 38:
      up = true;
      break;
    case 39:
      right = true;
      break;
    case 40:
      down = true;
      break;
    default:
      break;
  }
};

const manageKeyUp = (event) => {
  switch (event.keyCode) {
    case 37:
      left = false;
      break;
    case 38:
      up = false;
      break;
    case 39:
      right = false;
      break;
    case 40:
      down = false;
      break;
    default:
      break;
  }
};

//movement
document.addEventListener("keydown", manageKeyDown);
document.addEventListener("keyup", manageKeyUp);

const myCar = new Car(120, 120, car.width, car.height, 5, 0);

const rotateCar = () => {
  if (left) {
    if (down) myCar.rotation += 3;
    if (up) myCar.rotation -= 3;
  }
  if (right) {
    if (down) myCar.rotation -= 3;
    if (up) myCar.rotation += 3;
  }
  car.style.transform = `rotate(${myCar.rotation}deg)`;
};

const moveCar = () => {
  //exit before wasting calculations
  if (!up && !down) return;
  //use the cos to determine the x difference dervied from the rotation deg
  const angleInRadians = ((myCar.rotation - 90) * Math.PI) / 180;

  const xDiff = Math.cos(angleInRadians) * myCar.speed;
  const yDiff = Math.sin(angleInRadians) * myCar.speed;

  if (up) {
    const { correctedXDiff, correctedYDiff } = handleWallCollisions(
      xDiff,
      yDiff
    );
    myCar.x += correctedXDiff;
    myCar.y += correctedYDiff;
  } else if (down) {
    const { correctedXDiff, correctedYDiff } = handleWallCollisions(
      -xDiff,
      -yDiff
    );
    myCar.x += correctedXDiff;
    myCar.y += correctedYDiff;
  }

  car.style.top = `${myCar.y - car.height / 2}px`;
  car.style.left = `${myCar.x - car.width / 2}px`;
};

//a lot trickier than I was thinking
const handleWallCollisions = (xDiff, yDiff) => {
  const { top, left, right, bottom } = car.getBoundingClientRect();
  const {
    top: containerTop,
    bottom: containerBottom,
    left: containerLeft,
    right: containerRight,
  } = driveArea.getBoundingClientRect();

  let correctedYDiff = yDiff;
  let correctedXDiff = xDiff;
  //getBoundingClientRect is relative to viewport not parent div
  if (top + yDiff < containerTop && yDiff < 0) {
    correctedYDiff = 0;
  }
  if (left + xDiff < containerLeft && xDiff < 0) {
    correctedXDiff = 0;
  }
  if (right + xDiff > containerRight && xDiff > 0) {
    correctedXDiff = 0;
  }
  if (bottom + yDiff > containerBottom && yDiff > 0) {
    correctedYDiff = 0;
  }

  return { correctedXDiff, correctedYDiff };
};

const setCoin = (xPercent, yPercent) => {
  //create the coin
  const coinImg = document.createElement("img");
  coinImg.src = "./coin.png";
  //style the coin
  coinImg.width = 20;
  coinImg.height = 20;
  coinImg.style.position = "absolute";
  coinImg.style.left = `${xPercent}%`;
  coinImg.style.top = `${yPercent}%`;
  //add the coin to the DOM
  driveArea.appendChild(coinImg);

  return coinImg;
};
//coins
const setAllCoins = () => {
  coinsArray.forEach((coin) => {
    const newCoin = setCoin(coin[0], coin[1]);
    coinElementsArray.push(newCoin);
  });
};

setAllCoins();

//eat coins
const checkCoinCollision = (coin) => {
  if (!coin) return coin;
  const {
    top: carTop,
    left: carLeft,
    right: carRight,
    bottom: carBottom,
  } = car.getBoundingClientRect();

  const {
    top: coinTop,
    left: coinLeft,
    right: coinRight,
    bottom: coinBottom,
  } = coin.getBoundingClientRect();
  //there is a bit of a problem with this where some of the issues with it when the car is at an angle it can eat the coins when they arent in the radius.  THis is due to simply checking x and y values of the bounding rect which leads to a much bigger "square area"
  //if the car top or bottom is in between the coin top and bottom points
  if (
    (coinTop > carTop && coinTop < carBottom) ||
    (coinBottom > carTop && coinBottom < carBottom)
  ) {
    //if the left or right is inbetween the coin left or right
    if (coinLeft > carLeft && coinRight < carRight) {
      driveArea.removeChild(coin);
      return null;
    }
  }
  return coin;
};

const checkAllCoinsCollision = () => {
  coinElementsArray = coinElementsArray.map((coin) => checkCoinCollision(coin));
  if (coinElementsArray.every((coin) => coin == null)) {
    timerGoing = false;
    successMessage.innerText =
      "You won with " +
      time.toFixed(1) +
      "seconds!!   " +
      "Click me to Play Again";
    successMessage.style.opacity = 1;
  }
};

const countTime = () => {
  setInterval(() => {
    if (timerGoing) {
      time = time + 0.1;
    }
  }, 100);
};

countTime();

const updateTime = () => {
  timer.innerText = time.toFixed(2).toString() + "s";
};

const resetGame = () => {
  if ((successMessage.style.opacity = 0)) return;
  time = 0;
  timerGoing = true;
  setAllCoins();
  successMessage.style.opacity = 0;
};

//reset game
successMessage.addEventListener("click", resetGame);

const eventLoop = () => {
  rotateCar();
  moveCar();
  checkAllCoinsCollision();
  updateTime();

  requestAnimationFrame(eventLoop);
};

eventLoop();
