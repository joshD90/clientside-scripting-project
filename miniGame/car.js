import { handleWallCollisions } from "./collisions.js";

const car = document.getElementById("gameCar");
//our direction buttons for

//key directions - we don't attach the move directly to the keydown as this will only trigger it once.  We want to be able to hold down the key
let up = false;
let down = false;
let left = false;
let right = false;

//
console.log(navigator.userAgent);
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

//managing input - switch through the 4 different possiblities.  e.preventDefault() is not used as it interferes with all other key entries as well
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
      return;
  }
  event.preventDefault();
};
//deactive the direction once the key stops being pressed
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

//attach the functionality to the keydown and key-up events
document.addEventListener("keydown", manageKeyDown);
document.addEventListener("keyup", manageKeyUp);

//add listeners for mobile
const addMobileButtonListeners = () => {
  // https://www.capscode.in/blog/how-to-detect-mobile-device-in-javascript#https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
  if (!window.matchMedia("(pointer:coarse)").matches) return;

  //now get our buttons
  const leftBtn = document.getElementById("btnLeft");
  const forwardBtn = document.getElementById("btnForward");
  const backBtn = document.getElementById("btnBack");
  const rightBtn = document.getElementById("btnRight");
  //work off of the mobile friendly 'touches' events this will be equivilent to keydown
  leftBtn.addEventListener("touchstart", () => (left = true));
  forwardBtn.addEventListener("touchstart", () => (up = true));
  backBtn.addEventListener("touchstart", () => (down = true));
  rightBtn.addEventListener("touchstart", () => (right = true));
  //equivalent of keyup event
  leftBtn.addEventListener("touchend", () => (left = false));
  forwardBtn.addEventListener("touchend", () => (up = false));
  backBtn.addEventListener("touchend", () => (down = false));
  rightBtn.addEventListener("touchend", () => (right = false));
};

addMobileButtonListeners();

//instantiate our car
export const myCar = new Car(120, 120, car.width, car.height, 5, 0);

//just using css to rotate the car.  Point of interest car.style.transform has 0 pointing upwards.  Mathmatically 0 points right when doing our calcs elsewhere.
export const rotateCar = () => {
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

export const moveCar = () => {
  //exit before wasting calculations
  if (!up && !down) return;
  //use the cos to determine the x difference dervied from the rotation deg.  Style transform rotation 0 deg points upwards, js 0 deg points right.  Subtract 90 to align these 2.
  //forumla deg -> radians = degreen * PI / 180
  const angleInRadians = ((myCar.rotation - 90) * Math.PI) / 180;

  //speed is the total distance that can be travelled, we use cos and sin to determine what proportion of that should be alloted to x and y respectively
  const xDiff = Math.cos(angleInRadians) * myCar.speed;
  const yDiff = Math.sin(angleInRadians) * myCar.speed;

  if (up) {
    //corrected speed will change to 0 if it means it will go past the wall boundaries
    const { correctedXDiff, correctedYDiff } = handleWallCollisions(
      xDiff,
      yDiff
    );
    myCar.x += correctedXDiff;
    myCar.y += correctedYDiff;
  } else if (down) {
    //when going down / backwards we just have to invert the directions.
    const { correctedXDiff, correctedYDiff } = handleWallCollisions(
      -xDiff,
      -yDiff
    );
    myCar.x += correctedXDiff;
    myCar.y += correctedYDiff;
  }
  //update the dom through css
  car.style.top = `${myCar.y - car.height / 2}px`;
  car.style.left = `${myCar.x - car.width / 2}px`;
};
