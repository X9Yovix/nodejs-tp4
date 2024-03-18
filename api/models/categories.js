const mongoose = require("mongoose")

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
})

module.exports = mongoose.model("categories", categoriesSchema)