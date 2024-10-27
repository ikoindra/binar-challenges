const express = require("express");
const {
  validateGetCarsModel,
  validateGetCarsModelById,
  validateCreateCarsModel,
  validateUpdateCarsModel,
  validateDeleteCarsModel,
} = require("../middlewares/carsModel");
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
  .get(validateGetCarsModel, getCarsModel)
  .post(validateCreateCarsModel, createCarsModel);

router
  .route("/:id")
  .get(validateGetCarsModelById, getCarsModelById)
  .put(validateUpdateCarsModel, updateCarsModel)
  .delete(validateDeleteCarsModel, deleteCarsModel);
module.exports = router;
