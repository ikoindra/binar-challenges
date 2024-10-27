const express = require("express");
const {
  validateGetCarType,
  validateGetCarTypeById,
  validateCreateCarType,
  validateUpdateCarType,
  validateDeleteCarType,
} = require("../middlewares/carType.js");
const { authorization } = require("../middlewares/auth");
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
  .get(authorization(1, 2), validateGetCarType, getCarType)
  .post(authorization(1), validateCreateCarType, createCarType);

router
  .route("/:id")
  .get(authorization(1, 2), validateGetCarTypeById, getCarTypeById)
  .put(authorization(1), validateUpdateCarType, updateCarType)
  .delete(authorization(1), validateDeleteCarType, deleteCarTypeById);

module.exports = router;
