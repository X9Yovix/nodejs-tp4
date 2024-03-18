const joi = require("joi")

const updateProductSchema = joi.object({
  name: joi.string(),
  price: joi.number().min(1),
  quantity: joi.number().min(1),
  images: joi.array().items(joi.string()),
  category: joi.string()
})

module.exports = updateProductSchema