const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied");

  try {
    const decodedPayLoad = jwt.verify(token, process.env.Oly_JWT_KEY);
    req.user = decodedPayLoad;
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
}

module.exports = auth;
