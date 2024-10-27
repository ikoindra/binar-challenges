const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCarType = (req, res, next) => {
  const validationSchema = z.object({
    fuel_type: z.string().optional().nullable(),
  });

  const resultValidateQuery = validationSchema.safeParse(req.query);

  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetCarTypeById = (req, res, next) => {
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

exports.validateCreateCarType = (req, res, next) => {
  console.log(req.body);

  const validateBody = z.object({
    body_style: z.string(),
    capacity: z.string(),
    fuel_type: z.string().optional().nullable(),
  });

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Convert to car data format
  req.body = {
    ...req.body,
    capacity: parseInt(req.body["capacity"]) || null,
  };

  next();
};

exports.validateUpdateCarType = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  validateParams.safeParse(req.params);
  const resultValidateParams = validateParams.safeParse(req.params);

  if (!resultValidateParams.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    body_style: z.string(),
    capacity: z.string(),
    fuel_type: z.string().optional().nullable(),
  });

  //Validasi
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  // Convert to car data format
  req.body = {
    ...req.body,
    capacity: parseInt(req.body["capacity"]) || null,
  };

  next();
};

exports.validateDeleteCarType = (req, res, next) => {
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
