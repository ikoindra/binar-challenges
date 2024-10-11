const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = (capacity, available) => {
  return carRepository.getCars(capacity, available);
};

exports.getCarById = (id) => {
  const car = carRepository.getCarById(id);
  if (!car) {
    throw new NotFoundError("Car not found!");
  }
  return car;
};

exports.createCar = async (data, file) => {
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }

  return carRepository.createCar(data);
};

exports.updateCar = async (id, data, file) => {
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car not found!");
  }

  if (file?.image) {
    data.image = await imageUpload(file.image);
  } else {
    data.image = existingCar.image; // Keep the existing image if no new one is uploaded
  }

  // Merge existing car data with the new data
  data = {
    ...existingCar,
    ...data,
    // Preserve existing data because option and specs are optional
    options: data.options !== undefined ? data.options : existingCar.options,
    specs: data.specs !== undefined ? data.specs : existingCar.specs,
  };

  const updatedCar = carRepository.updateCar(id, data);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update car!"]);
  }

  return updatedCar;
};

exports.deleteCarById = (id) => {
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car not found!");
  }

  const deletedCar = carRepository.deleteCarById(id);
  if (!deletedCar) {
    throw new InternalServerError(["Failed to delete car!"]);
  }

  return deletedCar;
};
