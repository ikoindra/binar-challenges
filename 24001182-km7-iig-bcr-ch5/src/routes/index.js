const express = require("express");
const carsRouter = require("./cars");
const carTypeRouter = require("./carType");
const carsModelRouter = require("./carsModel");

const router = express.Router();

router.use("/cars", carsRouter);
router.use("/type", carTypeRouter);
router.use("/models", carsModelRouter);

module.exports = router;
