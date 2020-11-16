const mongoose = require("mongoose");
const Joi = require("joi");
const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 25,
    maxlength: 1024,
  },
  image: {
    type: String,
    required: true,
  },
});

const Subcategory = mongoose.model("subcategory", subcategorySchema);

function validateSubCategory(subCategory) {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(255),
    description: Joi.string().required().min(25).max(1024),
    image: Joi.string().required(),
  });

  return schema.validate(subCategory);
}

exports.Subcategory = Subcategory;
exports.validateSubCategory = validateSubCategory;
