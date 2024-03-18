const joi = require("joi")

const updateProductSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Name is required"
  }),
  price: joi.number().min(1).required().messages({
    "number.empty": "Price is required",
    "number.min": "Price must be greater than 0"
  }),
  quantity: joi.number().min(1).required().messages({
    "number.empty": "Quantity is required",
    "number.min": "Quantity must be greater than 0"
  }),
  images: joi.array().items(joi.string()),
  category: joi.string().required().messages({
    "string.empty": "Category is required"
  })
})

module.exports = updateProductSchema