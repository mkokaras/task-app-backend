const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/config");

// middleware for authentication
function authenticationMiddleware(request, res, next) {
  try {
    if (!request.headers) throw { status: 401, message: "Invalid request." };

    const { authorization } = request.headers;

    const [_, token] = authorization?.split(" ");

    if (!JWT_KEY) throw Error("Jwt encryption key doesnt exist!");

    const payload = jwt.verify(token, JWT_KEY, {
      algorithms: ["HS256"],
    });

    request.user = payload;

    next();
  } catch (error) {
    next({ status: 403, message: "Invalid token." });
  }

  // always continue to next middleware
}

module.exports = {
  authenticationMiddleware,
};
