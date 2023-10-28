//Importing the car data from usedCars.js
import { usedCars } from './usedCars.js';

//Non-changing list of all the cars that are in the usedCars.js file
const carObjects = [];

// Creating objects out of the cars and adding them to the list
for (const carData of usedCars) {
  const car = {
    year: carData.year,
    make: carData.make,
    model: carData.model,
    mileage: carData.mileage,
    price: carData.price,
    color: carData.color,
    gasMileage: carData.gasMileage
  };
  carObjects.push(car);
}

let displayedCarObjects = [];

//SEARCH
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const display = document.querySelector(".car-main-display");
  display.innerHTML = "";
  // Removing car objects from array
  while (displayedCarObjects.length > 0) {
    displayedCarObjects.pop();
  }
});

/*This function is called when the submit button for the 
filter is pressed.*/
function submit() {
}


function filter() {

}

function createPanel(carObject) {
  let html = '<div>${carObject.make} ${carObject.model}</div>';
}

function display(carObjectArray) {
  const panelContainer = document.querySelector(".car-main-display");

} 