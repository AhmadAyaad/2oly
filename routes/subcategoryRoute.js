const {
  Subcategory,
  validateSubCategory,
} = require("../models/subcategoryModel");
const authMW = require("../middleware/authMW");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.post("/", authMW, async (req, res) => {
  const { error } = validateSubCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let subcategory = new Subcategory(
    _.pick(req.body, ["name", "description", "image"])
  );
  await subcategory.save();

  res.status(201).send(subcategory);
});

router.put("/:id", authMW, async (req, res) => {
  let subcategory = await Subcategory.findOne({ _id: req.params.id });
  if (!subcategory) return res.status(404).send("there is no subcategory");

  const { error } = validateSubCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let result = await Subcategory.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  res.status(200).send(result);
});

router.get("/", async (req, res) => {
  const subcategories = await Subcategory.find();
  if (!subcategories) return res.status(404).send("there is no subcategories");
  res.status(200).send(subcategories);
});

router.get("/:id", async (req, res) => {
  const subCategory = await Subcategory.findOne({ _id: req.params.id });
  if (!subCategory)
    return res.status(404).send("there is subcategory with this id");

  res.status(200).send(subCategory);
});

module.exports = router;
