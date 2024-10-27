const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCarsModel = (req, res, next) => {
  const validateQuery = z.object({
    manufacturer: z.string().optional().nullable(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }
  next();
};

exports.validateGetCarsModelById = (req, res, next) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateCarsModel = (req, res, next) => {
  const splitStringToArray = (str) =>
    str.trim() === "" ? [] : str.split(",").map((item) => item.trim());

  req.body = {
    ...req.body,
    options: req.body.options
      ? splitStringToArray(req.body.options)
      : undefined, // Convert string to array
    specs: req.body.specs ? splitStringToArray(req.body.specs) : undefined, // Convert string to array
  };

  const validateBody = z.object({
    model_name: z.string(),
    manufacturer: z.string(),
    transmission: z.string(),
    description: z.string(),
    type_id: z.string(),
    options: z.array(z.string()).optional(),
    specs: z.array(z.string()).optional(),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateUpdateCarsModel = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const splitStringToArray = (str) =>
    str.trim() === "" ? [] : str.split(",").map((item) => item.trim());

  req.body = {
    ...req.body,
    options: req.body.options
      ? splitStringToArray(req.body.options)
      : undefined, // Convert string to array
    specs: req.body.specs ? splitStringToArray(req.body.specs) : undefined, // Convert string to array
  };

  const validateBody = z.object({
    model_name: z.string().optional().nullable(),
    manufacturer: z.string().optional().nullable(),
    transmission: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    type_id: z.string().optional().nullable(),
    options: z.array(z.string()).optional().nullable(),
    specs: z.array(z.string()).optional().nullable(),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    console.error("Validation errors:", result.error.errors);
    throw new BadRequestError(result.error.errors);
  }

  next();
};


exports.validateDeleteCarsModel = (req, res, next) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);

  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};
