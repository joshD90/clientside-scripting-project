//we dynamically assign the % left and % top to the coins.  This can be easily updated
const coinsArray = [
  [10, 20],
  [20, 30],
  [60, 20],
  [90, 80],
  [60, 50],
  [20, 80],
  [90, 30],
];

//empty array to push onto when we create the elements
export let coinElementsArray = [];

const setCoin = (xPercent, yPercent) => {
  //create the coin
  const coinImg = document.createElement("img");
  coinImg.src = "../assets/miniGame/coin.png";
  //style the coin
  coinImg.width = 20;
  coinImg.height = 20;
  coinImg.style.position = "absolute";
  coinImg.style.left = `${xPercent}%`;
  coinImg.style.top = `${yPercent}%`;
  //add the coin to the DOM
  driveArea.appendChild(coinImg);

  //we return the coin element so it can be pushed onto the coinElementsArray
  return coinImg;
};

//coins
export const setAllCoins = () => {
  //iterate through the coin array and push the created element onto the coinElementsArray
  coinsArray.forEach((coin) => {
    const newCoin = setCoin(coin[0], coin[1]);
    coinElementsArray.push(newCoin);
  });
};
