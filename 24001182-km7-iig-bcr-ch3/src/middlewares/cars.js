const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  //Based from search chapter-2, query for search using typedriver(not a data type  in array), date, time and capacity
  //Using capacity and available for query because not using generate date for availableAt data so the date is random for most data in json
  req.query = {
    capacity:
      req.query.capacity !== undefined && req.query.capacity !== ""
        ? Number(req.query.capacity)
        : undefined,
    available:
      req.query.available === "true"
        ? true
        : req.query.available === "false"
        ? false
        : undefined,
  };

  const validateQuery = z.object({
    capacity: z.number().optional(),
    available: z.boolean().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetCarById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateCar = async (req, res, next) => {
  const splitStringToArray = (str) =>
    str.trim() === "" ? [] : str.split(",").map((item) => item.trim());

  req.body = {
    ...req.body,
    rentPerDay: Number(req.body.rentPerDay), // Convert to number
    capacity: Number(req.body.capacity), // Convert to number
    year: Number(req.body.year), // Convert to number
    available: req.body.available == "true" ? true : false, // Convert to boolean
    options: req.body.options
      ? splitStringToArray(req.body.options)
      : undefined, // Convert string to array
    specs: req.body.specs ? splitStringToArray(req.body.specs) : undefined, // Convert string to array
  };

  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    rentPerDay: z.number().positive(),
    capacity: z.number().positive(),
    description: z.string(),
    availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number().positive(),
    options: z.array(z.string()).optional(),
    specs: z.array(z.string()).optional(),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
    throw new BadRequestError(result.error.errors);
  }

  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateUpdateCar = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(result.error.errors);
  }

  const splitStringToArray = (str) =>
    str.trim() === "" ? [] : str.split(",").map((item) => item.trim());

  req.body = {
    ...req.body,
    rentPerDay: req.body.rentPerDay ? Number(req.body.rentPerDay) : undefined, // Only convert if present
    capacity: req.body.capacity ? Number(req.body.capacity) : undefined,
    year: req.body.year ? Number(req.body.year) : undefined,
    available:
      req.body.available === "true"
        ? true
        : req.body.available === "false"
        ? false
        : undefined,
    options: req.body.options
      ? splitStringToArray(req.body.options)
      : undefined,
    specs: req.body.specs ? splitStringToArray(req.body.specs) : undefined,
  };

  const validateBody = z.object({
    plate: z.string().optional(),
    manufacture: z.string().optional(),
    model: z.string().optional(),
    rentPerDay: z.number().positive().optional(),
    capacity: z.number().positive().optional(),
    description: z.string().optional(),
    availableAt: z
      .string()
      .optional()
      .refine((date) => date === undefined || !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
    transmission: z.string().optional(),
    available: z.boolean().optional(),
    type: z.string().optional(),
    year: z.number().positive().optional(),
    options: z.array(z.string()).optional(),
    specs: z.array(z.string()).optional(),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
    throw new BadRequestError(result.error.errors);
  }

  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateDeleteCarById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
