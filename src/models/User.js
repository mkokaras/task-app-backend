const User = require("../schemas/userSchema");
const { checkStringAgainstHash } = require("../helpers/jwtHelper");

const loginUser = async (credentials) => {
  try {
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw { status: 404, message: "User doesnt exist." };

    if (!checkStringAgainstHash(credentials.password, user.password))
      throw { status: 401, message: "Wrong password." };

    return user;
  } catch (error) {
    throw error;
  }
};

const createNewUser = async (newUser) => {
  try {
    const userExists = await User.findOne({ username: newUser.username });

    if (userExists) throw { status: 409, message: "Username already is use." };

    const user = new User(newUser);

    const savedUser = await user.save();

    return savedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUser,
  createNewUser,
};
