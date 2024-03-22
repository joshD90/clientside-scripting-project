const productContainer = document.getElementById("product-container");

const createCard = (carDetails) => {
  console.log(carDetails);
  //create our elements
  const gridCellContainer = document.createElement("div");
  const cardContainer = document.createElement("div");
  const cardImg = document.createElement("img");
  const cardBody = document.createElement("div");
  const carHead = document.createElement("h5");
  const carDesc = document.createElement("p");
  const carPrice = document.createElement("p");

  //add our img attributes - avoid any errors by defaulting to empty string
  cardImg.src = carDetails.img ?? "";
  cardImg.alt = carDetails.name ?? "";

  //add our inner text- avoid any errors by defaulting to empty string
  carHead.innerText = carDetails.name ?? "";
  carDesc.innerText = carDetails.desc ?? "";
  carPrice.innerText = `€${carDetails.price.toFixed(2)}` ?? ""; //we ensure that it always remains as 0.00 format

  //add in our classes
  gridCellContainer.classList.add(
    "d-flex",
    "align-items-center",
    "justify-content-center",
    "container-fluid"
  );
  cardContainer.classList.add("card", "container-fluid", "shadow-sm");
  cardImg.classList.add("card-img-top");
  cardBody.classList.add("card-body");
  carHead.classList.add("card-title");
  carDesc.classList.add("card-text");
  carPrice.classList.add("card-text");

  //append to our document in reverse order
  cardBody.append(carHead, carDesc, carPrice);
  cardContainer.append(cardImg, cardBody);
  productContainer.append(cardContainer);
};

const appendAll = () => {
  //create our dummy data that we will populate the products with for now
  const dummyData = {
    name: "BMW",
    desc: "Super Sleek Beauty of a car",
    price: 55000,
    img: "../assets/cars/car-1-pexels.jpeg",
  };

  const dummyDataArray = new Array(10).fill(dummyData);
  //iterate through all of the array append all of these to
  dummyDataArray.forEach((car) => createCard(car));
};

appendAll();
