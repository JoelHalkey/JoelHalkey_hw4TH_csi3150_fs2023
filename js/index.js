import  {usedCars}  from './usedCars.js';

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

console.log(carObjects);