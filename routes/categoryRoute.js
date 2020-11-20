const express = require("express");
const router = express.Router();
const _ = require('lodash');

const { validateCategory, Category } = require('../models/categoryModel');
const authMW = require("../middleware/authMW");
const roleMW = require("../middleware/roleMW");

router.get("/", async (req, res) => {
 // console.log("ay7aga")
  const category = await Category.find();
  res.status(200).send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) res.status(404).send("category not found");
  res.status(200).send(category);
});

router.post("/",  async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = await Category.findOne({ name: req.body.name });

  if (category) return res.status(400).send("category already exists");
  category = new Category(_.pick(req.body, ["name" , "description", "image" , "isDeleted"]));
  await category.save();
});

router.delete("/:id", [authMW, roleMW], async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category && category.isDeleted) return res.status(400).send("category already deleted");

  category.isDeleted = true;
  await category.save();
});

router.put("/:id", [], async (req, res) => {
  let category = await Category.findById(req.params.id);
  const errors = validateCategory(req.body);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    res.status(400).send(error.details[0]);
  }

  const name = req.body.title;
  const description = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }

  category.name = name;
  category.image = imageUrl;
  category.description = description;
  await post.save();


})




module.exports = router;




