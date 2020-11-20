const users = require("../routes/usersRoute");
const categories = require('../routes/categoryRoute');
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/categories", categories);
};
