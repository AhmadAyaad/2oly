const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        minlength: 7,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
});

const Category = mongoose.model("category" , categorySchema);

function validateCategory(category) {
    const schema = Joi.object({
      name: Joi.string().min(7).max(255).required(),
      description: Joi.string().min(7).max(2000).required(),
      image:Joi.string(),
      isDeleted: Joi.boolean().required()
    });
  
    return schema.validate(category);
  }

exports.Category = Category;
exports.validateCategory = validateCategory;

