const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//key directions
let up = false;
let down = false;
let left = false;
let right = false;

class Car {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

const myCar = new Car(10, 20, 30, 50, "red");

//managing input
const manageKeyDown = (event) => {
  switch (event.keyCode) {
    case 37:
      console.log("left arrow");
      left = true;
      break;
    case 38:
      console.log("up arrow");
      up = true;
      break;
    case 39:
      console.log("right arrow");
      right = true;
      break;
    case 40:
      console.log("down arrow");
      down = true;
      break;
    default:
      break;
  }
};

const manageKeyUp = (event) => {
  switch (event.keyCode) {
    case 37:
      console.log("left arrow");
      left = false;
      break;
    case 38:
      console.log("up arrow");
      up = false;
      break;
    case 39:
      console.log("right arrow");
      right = false;
      break;
    case 40:
      console.log("down arrow");
      down = false;
      break;
    default:
      break;
  }
};

//movement
document.addEventListener("keydown", manageKeyDown);
document.addEventListener("keyup", manageKeyUp);

const determineVelocity = (speed) => {
  let carVel = { x: 0, y: 0 };
  if (up === true) carVel.y -= speed;
  if (down === true) carVel.y += speed;
  if (right === true) carVel.x += speed;
  if (left === true) carVel.x -= speed;
  return carVel;
};

const moveCar = (car, changeAmount) => {
  car.x = car.x + changeAmount.x;
  car.y = car.y + changeAmount.y;
};

//drawing
const drawCar = (car) => {
  ctx.fillStyle = car.color;
  ctx.fillRect(car.x, car.y, car.width, car.height);
};

//main event loop
const eventLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //moving
  const changeAmount = determineVelocity(3);
  moveCar(myCar, changeAmount);
  //drawing
  drawCar(myCar);

  requestAnimationFrame(eventLoop);
};

eventLoop();
