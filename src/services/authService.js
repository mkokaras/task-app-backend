const User = require("../models/User");

const loginUser = async (credentials) => {
  try {
    const user = await User.loginUser(credentials);

    return user;
  } catch (error) {
    throw error;
  }
};

const registerUser = async (newUser) => {
  try {
    const result = await User.createNewUser(newUser);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUser,
  registerUser,
};
