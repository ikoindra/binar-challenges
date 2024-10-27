const carTypeService = require("../services/carType");
const { successResponse } = require("../utils/response");


exports.getCarType = async (req, res, next) => {
  const data = await carTypeService.getCarType(
    req.query?.fuel_type,
  );

  successResponse(res, data);
};

exports.getCarTypeById = async (req, res, next) => {
  const { id } = req.params;
  const data = await carTypeService.getCarTypeById(id);

  successResponse(res, data, "Successfully get car-type data");
};

exports.createCarType = async (req, res, next) => {
  const data = await carTypeService.createCarType(req.body);

  successResponse(res, data);
};

exports.updateCarType = async (req, res, next) => {
  const { id } = req.params;
  const updatedCarType = await carTypeService.updateCarType(id, req.body);

  successResponse(res, updatedCarType, "Successfully update car-type data");
};

exports.deleteCarTypeById = async (req, res, next) => {
  const { id } = req.params;
  const deletedCarType = await carTypeService.deleteCarTypeById(id);
  successResponse(res, deletedCarType, "Successfully delete car-type data");
};
