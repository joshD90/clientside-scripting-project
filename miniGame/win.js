import { resetTime, stopTimer, time, timerGoing } from "./time.js";
import { coinElementsArray, setAllCoins } from "./coins.js";

//grab our DOM elements

const alertMessage = document.getElementById("alertMessage");

//manage win state
export const handleWin = () => {
  //as this is in our event loop we must make sure that timerGoing is true so that it will only play once before switching timerGoing off
  if (timerGoing === true) playWinSound();
  stopTimer();
  //change our alert status
  alertMessage.classList.remove("alert-info");
  alertMessage.classList.add("alert-success");

  //Set alertMessage with template literals
  alertMessage.innerText = `You won in just ${time.toFixed(1)} seconds!!
    Click me to Play Again`;
};

//reset our game back to starting position. (the car is not returned)
const resetGame = () => {
  //as this is triggered by pressing the alert message make sure that the game is not in play
  if (coinElementsArray.some((coin) => coin !== null)) return;
  resetTime();
  setAllCoins();
  //update our alertMessage
  alertMessage.classList.remove("alert-success");
  alertMessage.classList.add("alert-info");
  alertMessage.innerText =
    "Use the arrow keys to drive the car around. You must be moving to turn. Drive over the coins to pick them up. How fast can you pick them up?";
};

//set up chance to reset game
alertMessage.addEventListener("click", resetGame);

//sound win
//https://mixkit.co/free-sound-effects/win/
const playWinSound = () => {
  //set up our new Audio object and pass our sound to it
  const winAudio = new Audio("../assets/miniGame/winSound.wav");
  winAudio.play();
};
