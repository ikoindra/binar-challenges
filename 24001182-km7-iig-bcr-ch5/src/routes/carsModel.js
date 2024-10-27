const express = require("express");
const {
  validateGetCarsModel,
  validateGetCarsModelById,
  validateCreateCarsModel,
  validateUpdateCarsModel,
  validateDeleteCarsModel,
} = require("../middlewares/carsModel");
const { authorization } = require("../middlewares/auth");
const {
  getCarsModel,
  getCarsModelById,
  createCarsModel,
  updateCarsModel,
  deleteCarsModel,
} = require("../controllers/carsModel");

const router = express.Router();

// Route is now just `/` because `/models` is handled by the parent route in index.js
router
  .route("/")
  .get(authorization(1, 2), validateGetCarsModel, getCarsModel)
  .post(authorization(1), validateCreateCarsModel, createCarsModel);

router
  .route("/:id")
  .get(authorization(1, 2), validateGetCarsModelById, getCarsModelById)
  .put(authorization(1), validateUpdateCarsModel, updateCarsModel)
  .delete(authorization(1), validateDeleteCarsModel, deleteCarsModel);
module.exports = router;
