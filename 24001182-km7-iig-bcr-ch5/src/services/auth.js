const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/users");
const { imageUpload } = require("../utils/image-kit");
const { Unauthorized } = require("../utils/request");
const bcrypt = require("bcrypt");

exports.register = async (data, file) => {
  // if there are any file (profile picture)
  if (file.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }

  //create user
  const user = await userRepository.createUser(data);

  //generate token
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  //don't forget to remove the password object, if not removed it will be displayef in response
  delete user.password;

  //return the user info and the token
  return {
    user,
    token,
  };
};

exports.login = async (data) => {
  // Find the user by email
  const user = await userRepository.getUserByEmail(data.email);
  if (!user) {
    throw new Unauthorized("Email is not registered");
  }

  // Compare the provided password using bcrypt
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Unauthorized("Invalid password");
  }

  // Generate a token
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  // Remove the password before sending the response
  delete user.password;

  // Return the user info and the token
  return {
    user,
    token,
  };
};
