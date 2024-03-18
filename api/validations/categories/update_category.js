const joi = require("joi")

const updateCategorySchema = joi.object({
  name: joi.string(),
  description: joi.string()
})

module.exports = updateCategorySchema