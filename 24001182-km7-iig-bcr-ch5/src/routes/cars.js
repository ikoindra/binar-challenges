const express = require("express");
const {
  validateGetCars,
  validateGetCarsById,
  validateCreateCars,
  validateUpdateCars,
  validateDeleteCars,
} = require("../middlewares/cars.js");
const { authorization } = require("../middlewares/auth");
const {
  getCars,
  createCars,
  updateCars,
  deleteCarsById,
} = require("../controllers/cars.js");
const { getCarsById } = require("../controllers/cars.js");

const router = express.Router();

router.get("/", authorization(1, 2), validateGetCars, getCars);
router.get("/:id", authorization(1, 2), validateGetCarsById, getCarsById);
router.post("/", authorization(1), validateCreateCars, createCars);
router.put("/:id", authorization(1), validateUpdateCars, updateCars);
router.delete("/:id", authorization(1), validateDeleteCars, deleteCarsById);
module.exports = router;
