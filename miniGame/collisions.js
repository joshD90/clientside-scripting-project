import { coinElementsArray } from "./coins.js";
//directly access the dom
const driveArea = document.getElementById("driveArea");
const car = document.getElementById("gameCar");

//wall collisions
//a lot trickier than I was thinking
export const handleWallCollisions = (xDiff, yDiff) => {
  //destructure getBoundingCLientRect for ease of use later.  This gets the maximum point of the rectangle in any direction
  const { top, left, right, bottom } = car.getBoundingClientRect();
  const {
    top: containerTop,
    bottom: containerBottom,
    left: containerLeft,
    right: containerRight,
  } = driveArea.getBoundingClientRect();

  //if we aren't hitting a wall, correctedX and correctedY diff will be the same as they were before
  let correctedYDiff = yDiff;
  let correctedXDiff = xDiff;
  //getBoundingClientRect is relative to viewport not parent div so we must compare it to the containers boundingClientRect
  //we also see in which direction the speed is going, we dont want the car to get stuck on collision so it should always be able to make its way back out even if it is over the light
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

//coin collisions

export const checkCoinCollision = (coin) => {
  //as we eat the coins we change the coin value from a dom element to null
  if (!coin) return coin;

  //destructure the boungClientRect for coin and car
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
  //there is a bit of a problem with this where some of the issues with it when the car is at an angle it can eat the coins when they arent in the radius.  THis is due to simply checking x and y values of the bounding rect which leads to a much bigger "square area".  I was looking at

  //if the car top or bottom is in between the coin top and bottom points
  if (
    (coinTop > carTop && coinTop < carBottom) ||
    (coinBottom > carTop && coinBottom < carBottom)
  ) {
    //if the left or right is inbetween the coin left or right
    if (coinLeft > carLeft && coinRight < carRight) {
      //remove the coin element from the DOm
      driveArea.removeChild(coin);
      //returning null instead of splice removing the element altogether
      return null;
    }
  }
  return coin;
};

export const checkAllCoinsCollision = () => {
  //previous version mapped over it and reassigned the variable but when modularising the coinElementArray becomes a const so cant be reassigned.  The const still points to the same place in memory on the heap so we can mutate this.
  for (let i = 0; i < coinElementsArray.length; i++) {
    coinElementsArray[i] = checkCoinCollision(coinElementsArray[i]);
  }
  //if all of the coin elements array are null then we can initiate ending the game
  if (coinElementsArray.every((coin) => coin === null)) {
    return true;
  }
};
