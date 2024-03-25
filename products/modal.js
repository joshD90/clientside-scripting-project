import { carsArray } from "../assets/cars/carList.js";

const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalImage = document.getElementById("modalImg");

export const setModalDetails = (carName) => {
  const car = carsArray.find((car) => carName === car.name);
  if (!car) return;

  modalName.innerText = car.name;
  modalDesc.innerText = car.desc;
  modalPrice.innterText = `€${car.price.toFixed(2)}`;
  modalImage.src = car.img;
};
