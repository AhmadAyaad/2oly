require("express-async-errors"); // da async middlware 3shan hyndle el async errors =>
///by default hyor7 ll route handlers
const express = require("express");
const winston = require("winston");
require("./log/logging")();
require("./startup/dbConnection")();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

require("./startup/routes")(app);
app.listen(3000, () => console.log("2oly is listening on port 3000"));
