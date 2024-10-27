const carService = require("../services/carsModel");
const { successResponse } = require("../utils/response");

exports.getCarsModel = async (req, res, next) => {
  const data = await carService.getCarsModel(req.query?.manufacturer);

  successResponse(res, data);
};

exports.getCarsModelById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  // Get student by id
  const data = await carService.getCarsModelById(id);
  successResponse(res, data);
};

exports.createCarsModel = async (req, res, next) => {
  const data = await carService.createCarsModel(req.body);

  successResponse(res, data);
};

exports.updateCarsModel = async (req, res, next) => {
  const { id } = req.params;
  const data = await carService.updateCarsModel(id, req.body);
  successResponse(res, data);
};

exports.deleteCarsModel = async (req, res, next) => {
  const { id } = req.params;
  const data = await carService.deleteCarsModel(id);
  successResponse(res, data);
};
