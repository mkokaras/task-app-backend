const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sign } = require("jsonwebtoken");
const { JWT_KEY } = require("../config/config");

const checkStringAgainstHash = function (password, hash) {
  const shaHash = Buffer.from(
    crypto.createHash("sha256").update(password).digest()
  ).toString("base64");

  return bcrypt.compareSync(shaHash, hash);
};

const hashString = function (password) {
  return bcrypt.hashSync(
    Buffer.from(crypto.createHash("sha256").update(password).digest()).toString(
      "base64"
    ),
    bcrypt.genSaltSync(12)
  );
};

const generateSignedToken = function (id, username) {
  if (!JWT_KEY) throw Error("Jwt encryption key doesnt exist!");

  return sign({ id: id, username: username }, JWT_KEY, {
    algorithm: "HS256",
    expiresIn: "10 days",
  });
};

module.exports = {
  checkStringAgainstHash,
  hashString,
  generateSignedToken,
};
