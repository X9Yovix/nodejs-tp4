const joi = require("joi")

const saveCategorySchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Name is required"
  }),
  description: joi.string()
})

module.exports = saveCategorySchema