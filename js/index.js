// Importing the car data from usedCars.js
import { usedCars } from './usedCars.js';

// STARTING CODE

// Non-changing list of all the cars that are in the usedCars.js file
const carObjects = [];

// The cars that get displayed to the main section
let displayedCarObjects = [];

// The div that will contain all the panels
const panelContainer = document.querySelector(".car-main-display");

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
} display(carObjects);

// All unique colors from cars in usedCars.js
const carColors = getAllColors();
console.log(carColors);

// All unique makes from cars in usedCars.js
const carMakes = getAllMakes();
console.log(carMakes);

// Populating the make checkboxes
populateMake();

// Populating the color checkboxes
populateColor();




// SEARCH BUTTON EVENT LISTENER
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const mainDisplay = document.querySelector(".car-main-display");
  const input = document.querySelector("#search-bar-input");
  const inputString = input.value;
  mainDisplay.innerHTML = "";
  // Removing car objects from array
  while (displayedCarObjects.length > 0) {
    displayedCarObjects.pop();
  }
  
  let temp = [];
  for( const carObject of carObjects){
    if(`${carObject.make} ${carObject.model}`.toLowerCase().includes(String(inputString).toLowerCase())){
      temp.push(carObject);
    }
  }

  display(temp);
});

//Has to look at the currently checked colors to see if the color within
//the car object has a color that exists in that 
function colorFilter(carObject) {
  const colorCheckboxDivs = document.querySelectorAll('.color-checkbox');
  const checkedColors = [];
  colorCheckboxDivs.forEach((checkboxDiv) => {
    const checkbox = checkboxDiv.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      checkedColors.push(checkbox.getAttribute('id'));
    }
  });
  if(checkedColors.length === 0){
    return true;
  } else{
    return checkedColors.includes(carObject.color);
  }
}

//Same as the color filter but with the makes of the car
function makeFilter(carObject){
  const makeCheckboxDivs = document.querySelectorAll('.make-checkbox');
  const checkedMakes = [];
  makeCheckboxDivs.forEach((checkboxDiv) => {
    const checkbox = checkboxDiv.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      checkedMakes.push(checkbox.getAttribute('id'));
    }
  });
  if(checkedMakes.length === 0){
    return true;
  } else{
    return checkedMakes.includes(carObject.make);
  }
}

function submitFilter(carObjectArray) {
  const carYearMinInput = document.querySelector("#year-min-input");
  const carYearMaxInput = document.querySelector("#year-max-input");
  const maxMileageInput = document.querySelector("#max-mileage-input");
  const priceMinInput = document.querySelector("#car-price-min-input");
  const priceMaxInput = document.querySelector("#car-price-max-input");
  let carYearMinInputValue = Number(carYearMinInput.value);
  console.log(carYearMinInputValue);
  let carYearMaxInputValue = Number(carYearMaxInput.value);
  console.log(carYearMaxInputValue);
  let maxMileageInputValue = Number(maxMileageInput.value);
  console.log(maxMileageInputValue);
  let priceMinInputValue = Number(priceMinInput.value);
  console.log(priceMinInputValue);
  let priceMaxInputValue = Number(priceMaxInput.value);
  console.log(priceMaxInputValue);

  if(carYearMinInputValue == null || carYearMinInputValue == NaN || carYearMinInputValue == ""){
    carYearMinInputValue = 0.0;
  }

  if(carYearMaxInputValue == null || carYearMaxInputValue == NaN || carYearMaxInputValue == 0){
    carYearMaxInputValue = Infinity;
  }

  if(maxMileageInputValue == null || maxMileageInputValue == NaN || maxMileageInputValue == 0){
    maxMileageInputValue = Infinity;
  }

  if(priceMinInputValue == null || priceMinInputValue == NaN || priceMinInputValue == ""){
    priceMinInputValue = 0.0;
  }

  if(priceMaxInputValue == null || priceMaxInputValue == NaN || priceMaxInputValue == 0){
    priceMaxInputValue = Infinity;
  }

  return carObjectArray.filter(function (carObject) {
    return (carYearMinInputValue <= carObject.year && carObject.year <= carYearMaxInputValue)
        && (carObject.mileage <= maxMileageInputValue)
        && (priceMinInputValue <= carObject.price && carObject.price <= priceMaxInputValue)
        && colorFilter(carObject)
        && makeFilter(carObject);
  })
}



// Populates the main container with the car panels
function display(carObjectArray) {
  const panelContainer = document.querySelector(".car-main-display");
  panelContainer.innerHTML = "";
  for (const element of carObjectArray) {
    panelContainer.innerHTML +=
      `<div class="car-panel">
          <div class="car-name">${element.make} ${element.model}</div>
          <div class="car-year">Year: ${element.year}</div>
          <div class="car-price">$${element.price}</div>
          <div class="car-color">Color: ${element.color}</div>
          <div class="car-mileage">${element.mileage} miles</div>
          <div class="car-gas-mileage">${element.gasMileage}</div>
      </div>`;
  }
}

// Populates the different make checkboxes in the make checkbox container div
function populateMake(){
  const makeContainer = document.querySelector(".make-checkbox-container");
  makeContainer.innerHTML = "";
  for(const make of carMakes){
    makeContainer.innerHTML +=
      `<div class="make-checkbox">
        <div class="make-checkbox-text">${make}</div>
        <input type="checkbox" id="${make}">
      </div>`
  }
}

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", function(){
  const mainDisplay = document.querySelector(".car-main-display");
  mainDisplay.innerHTML = "";

  display(submitFilter(carObjects));
});

// Populates the different color checkboxes in the color checkbox container div
function populateColor(){
  const colorContainer = document.querySelector(".colors-checkbox-container");
  colorContainer.innerHTML = "";
  for(const color of carColors){
    colorContainer.innerHTML +=
      `<div class="color-checkbox">
        <div class="color-checkbox-text">${color}</div>
        <input type="checkbox" id="${color}">
      </div>`
  }
}

// Function that retrieves all of the unique car colors from usedCars.js
function getAllColors() {
  let temp = [];
  for (let i = 0; i < carObjects.length; i++) {
    let currentElement = carObjects[i].color;
    if (temp.indexOf(currentElement) === -1) {
      temp.push(currentElement);
    }
  }
  return temp;
}

// Function that retrieves all of the unique car makes from usedCars.js
function getAllMakes(){
  let temp = [];
  for (let i = 0; i < carObjects.length; i++) {
    let currentElement = carObjects[i].make;
    if (temp.indexOf(currentElement) === -1) {
      temp.push(currentElement);
    }
  }
  return temp;
}





