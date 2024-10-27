const express = require("express");
const {
  validateGetCarType,
  validateGetCarTypeById,
  validateCreateCarType,
  validateUpdateCarType,
  validateDeleteCarType,
} = require("../middlewares/carType.js");
const {
  getCarType,
  createCarType,
  updateCarType,
  deleteCarTypeById,
} = require("../controllers/carType.js");
const { getCarTypeById } = require("../controllers/carType.js");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetCarType, getCarType)
  .post(validateCreateCarType, createCarType);

router
  .route("/:id")
  .get(validateGetCarTypeById, getCarTypeById)
  .put(validateUpdateCarType, updateCarType)
  .delete(validateDeleteCarType, deleteCarTypeById);

module.exports = router;
