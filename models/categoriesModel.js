const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
});

const Category = mongoose.model("category", categorySchema);

function validatingData(category) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validate = validatingData;
exports.categorySchema=categorySchema