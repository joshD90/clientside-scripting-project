import { rotateCar, moveCar } from "./car.js";
import { setAllCoins } from "./coins.js";
import { checkAllCoinsCollision } from "./collisions.js";
import { countTime, updateTime } from "./time.js";
import { handleWin } from "./win.js";

//set up the game to play
setAllCoins();
countTime();

//our event loop that is constantly iterating
const eventLoop = () => {
  //car movement which includes checking wall collisions
  rotateCar();
  moveCar();
  //collecting coins
  if (checkAllCoinsCollision()) handleWin();
  //updating the time
  updateTime();

  //will call the next frame in a smoother fashion than setInterval
  requestAnimationFrame(eventLoop);
};

eventLoop();
