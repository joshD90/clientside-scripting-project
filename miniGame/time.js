const timer = document.getElementById("time");

//set up our variables
export let time = 0;
export let timerGoing = true;

const TIME_INTERVAL = 0.1;

//in our setup we set an interval once that constantly ticks even when the game has been won.
export const countTime = () => {
  setInterval(() => {
    //only increase the time if the game is in play
    if (timerGoing) {
      time = time + TIME_INTERVAL;
    }
  }, 1000 * TIME_INTERVAL);
};

//simply changes the p tag that displays the time.  To fixed ensure that we don't get any crazy floating point number shenanigans
export const updateTime = () => {
  timer.innerText = time.toFixed(2).toString() + "s";
};

//when we export time and timerGoing they are imported as consts so can't be reassigned in the other modules so we export a function that can manipulate the variables in-house
export const resetTime = () => {
  time = 0;
  timerGoing = true;
};

export const stopTimer = () => {
  timerGoing = false;
};
