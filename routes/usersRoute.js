const { User, validateUser } = require("../models/usersModel");
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();
const authMW = require("../middleware/authMW");

router.get("/me", authMW, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send("not found");
  res.status(200).send(_.pick(user, ["isAdmin", "_id" , 'email' , 'name']));
});

router.get("/", async (req, res) => {
  const user = await User.find();
  res.status(200).send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).send("user not found");
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0]);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already exists");

  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateToken();

  res.header("x-auth-token", token).status(201).send(user);
});

module.exports = router;
