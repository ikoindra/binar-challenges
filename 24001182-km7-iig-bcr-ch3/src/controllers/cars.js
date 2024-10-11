const carService = require("../services/cars");
const { successResponse } = require("../utils/response");
const { NotFoundError } = require("../utils/request");

exports.getCars = (req, res, next) => {
  const data = carService.getCars(req.query?.capacity, req.query?.available);

  successResponse(res, data);
};

exports.getCarById = (req, res, next) => {
  const { id } = req.params;

  const data = carService.getCarById(id);

  if (!data) {
    throw new NotFoundError("Car not found!");
  }

  successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
  const data = await carService.createCar(req.body, req.files);

  successResponse(res, data);
};

exports.updateCar = async (req, res, next) => {
  const { id } = req.params;

  const data = await carService.updateCar(id, req.body, req.files);

  successResponse(res, data);
};

exports.deleteCarById = (req, res, next) => {
  const { id } = req.params;

  const data = carService.deleteCarById(id);

  if (!data) {
    throw new NotFoundError("Car not found!");
  }

  successResponse(res, data);
};
