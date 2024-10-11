const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cars = require("../../data/cars.json");

exports.getCars = (capacity, available) => {
  const searchedCars = cars.filter((car) => {
    let result = true;

    //Both query is not optional
    if (capacity !== undefined) {
      result = result && car.capacity >= capacity;
    }

    if (available !== undefined) {
      result = result && car.available === available;
    }

    return result;
  });

  return searchedCars;
};

exports.getCarById = (id) => {
  const car = cars.find((car) => car.id === id);
  return car;
};

exports.createCar = (data) => {
  const newCar = {
    id: uuidv4(), // Generate a new UUID for the car ID
    ...data,
  };

  /* Add data to the current array of cars */
  cars.push(newCar);

  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  return newCar;
};

exports.updateCar = (id, data) => {
  const car = cars.find((car) => car.id === id);
  if (!car) {
    throw new NotFoundError("Car is not found!");
  }

  Object.assign(car, data);

  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  return car;
};

exports.deleteCarById = (id) => {
  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex < 0) {
    return null;
  }

  const deletedCar = cars.splice(carIndex, 1);

  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  return deletedCar;
};
