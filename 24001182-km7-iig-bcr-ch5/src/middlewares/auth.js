const { z } = require("zod");
const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  Unauthorized,
  For,
  Forbidden,
} = require("../utils/request");
const userRepository = require("../repositories/users");

exports.authorization =
  (...roles) =>
  async (req, res, next) => {
    // get token from request headers
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new Unauthorized("You need to login in advance!");
    }

    const splittedAuthHeader = authorizationHeader.split(" ");
    if (splittedAuthHeader.length <= 1) {
      throw new Unauthorized("Token is not valid!");
    }

    const token = splittedAuthHeader[1];

    // extract the token
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

    // get information of the user that has that token
    const user = await userRepository.getUserById(extractedToken.user_id);

    // validate the role that can be access to the next middleware
    const accessValidation = roles.includes(user.role_id);
    if (!accessValidation) {
      throw new Forbidden("You can not access this resource!");
    }

    // pass the user to request, then every middleware can access the user profile without needing to get again in repository level
    req.user = user;

    next();
  };

exports.validateRegister = (req, res, next) => {
  const validateBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const validateFileBody = z
    .object({
      profile_picture: z
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
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const validateBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
