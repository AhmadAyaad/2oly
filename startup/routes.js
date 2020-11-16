const users = require("../routes/usersRoute");
const auth = require("../routes/auth");
const subCategories = require("../routes/subcategoryRoute");
module.exports = function (app) {
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/subcat", subCategories);
};
