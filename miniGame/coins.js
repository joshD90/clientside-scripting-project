const COIN_IMAGE_WIDTH = 20;
const NUM_COINS = 10;

//we dynamically assign the % left and % top to the coins.  This can be easily updated
export const coinsArray = [];

const generateRandomPosition = () => {
  //generate the percentage of the top and left.  With 94 and then add 3 we ensure that we are always between 3% and 97% so that we don't end up slipping over the edge
  const num1 = Math.floor(Math.random() * 94) + 3;
  const num2 = Math.floor(Math.random() * 94) + 3;
  //if any coins are sitting on top of each other
  if (
    coinsArray.some((coin) => {
      //math.abs ignores the +- signs
      const num1Diff = Math.abs(coin[0] - num1);
      const num2Diff = Math.abs(coin[1] - num2);
      //distance must be greater than the radius
      if (num1Diff < COIN_IMAGE_WIDTH / 2 && num2Diff < COIN_IMAGE_WIDTH / 2)
        return true;
    })
  )
    //if they are sitting on top of each other recursively call the cycle again
    return generateRandomPosition();
  return [num1, num2];
};

export const generateCoinsArray = () => {
  for (let i = 0; i < NUM_COINS; i++) {
    const randomPosition = generateRandomPosition();
    coinsArray.push(randomPosition);
  }
};

generateCoinsArray();

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
