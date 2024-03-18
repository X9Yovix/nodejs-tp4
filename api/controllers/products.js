const productsModel = require("../models/products")

const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find().populate("category")
    res.status(200).json({
      products: products
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getProduct = async (req, res) => {
  try {
    const product = await productsModel.findOne({ _id: req.params.id })
    if (product) {
      res.status(200).json({
        product: product
      })
    } else {
      res.status(404).json({
        message: "Product not found"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, category } = req.body
    const images = []
    req.files.map((file) => {
      images.push(file.path)
    })
    const product = new productsModel({
      name: name,
      price: price,
      quantity: quantity,
      images: images,
      category: category
    })
    const newProduct = await product.save()
    res.status(201).json({
      product: newProduct
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const product = await productsModel.findOne({ _id: req.params.id })
    if (product) {
      const updateFields = {}
      if (req.files && req.files.length > 0) {
        updateFields.images = req.files.map((file) => file.path)
      }
      if (req.body.name) {
        updateFields.name = req.body.name
      }
      if (req.body.price) {
        updateFields.price = req.body.price
      }
      if (req.body.quantity) {
        updateFields.quantity = req.body.quantity
      }
      if (req.body.category) {
        updateFields.category = req.body.category
      }
      Object.assign(product, updateFields)
      const updatedProduct = await product.save()
      res.status(200).json({
        product: updatedProduct
      })
    } else {
      res.status(404).json({
        message: "Product not found"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await productsModel.findByIdAndDelete(req.params.id)
    if (product) {
      res.status(200).json({
        message: "Product has been deleted"
      })
    } else {
      res.status(404).json({
        message: "Product not found"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}