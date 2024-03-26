import { appendAll, removeAll } from "./index.js";
import { carsArray } from "../assets/cars/carList.js";
//capture DOM element
const orderSelect = document.getElementById("orderSelect");

//the action will be determined by the value that is passed to it through the event handler
const orderByPrice = (event) => {
  let newOrder = [];
  const orderType = event.target.value;

  switch (orderType) {
    case "priceAsc":
      newOrder = carsArray.sort((a, b) => a.price - b.price);

      break;
    case "priceDesc":
      newOrder = carsArray.sort((a, b) => b.price - a.price);
      console.log(newOrder);
      break;
    case "nameAsc":
      newOrder = carsArray.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      break;
    case "nameDesc":
      newOrder = carsArray.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
      break;
    default:
      return;
  }

  carsArray.splice(0, carsArray.length, ...newOrder);
  console.log(carsArray);
  removeAll();
  appendAll();
};

orderSelect.addEventListener("change", orderByPrice);
