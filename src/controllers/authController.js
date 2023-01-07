const { generateSignedToken, hashString } = require("../helpers/jwtHelper");
const authService = require("../services/authService");

const loginUser = async (req, res) => {
  try {
    const { body } = req;

    if (!body.username || !body.password)
      throw { status: 400, message: "Invalid request." };

    const credentials = { username: body.username, password: body.password };

    const { username, id } = await authService.loginUser(credentials);

    const token = generateSignedToken(id.toString(), username);

    res.status(200).json({
      status: "success",
      data: { token: token },
    });
  } catch (error) {
    res.status(error.status || 500).send({
      status: "error",
      data: { error: error.message || "Internal Server Error." },
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { body } = req;

    if (!body.username || !body.password)
      throw { status: 400, message: "Invalid request." };

    const user = {
      username: body.username,
      password: hashString(body.password),
    };

    const { username, id } = await authService.registerUser(user);

    const token = generateSignedToken(id.toString(), username);

    res.status(201).json({
      status: "success",
      data: { token: token },
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      status: "error",
      data: { error: error.message || "Internal Server Error." },
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
