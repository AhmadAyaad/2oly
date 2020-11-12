const users = require("../routes/usersRoute");
const auth = require("../routes/auth");
module.exports = function (app) {
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
