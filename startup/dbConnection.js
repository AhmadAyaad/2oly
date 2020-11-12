const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function () {
  mongoose
    .connect("mongodb://localhost/2oly")
    .then(() => winston.info("connected to db "));
};
