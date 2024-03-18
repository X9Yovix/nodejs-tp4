const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["availaibe", "unavailaibe"],
    default: "availaibe"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true
  }
})

module.exports = mongoose.model("products", productsSchema)