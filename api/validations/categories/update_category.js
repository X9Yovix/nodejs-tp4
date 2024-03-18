const joi = require("joi")

const updateCategorySchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Name is required"
  })
})

module.exports = updateCategorySchema