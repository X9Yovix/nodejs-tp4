const categoriesModel = require("../models/categories")

const getCategories = async (req, res) => {
  try {
    const categories = await categoriesModel.find()
    res.status(200).json({
      categories: categories
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getCategory = async (req, res) => {
  try {
    const category = await categoriesModel.findOne({ _id: req.params.id })
    if (category) {
      res.status(200).json({
        category: category
      })
    } else {
      res.status(404).json({
        message: "Category not found"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const createCategory = async (req, res) => {
  const category = new categoriesModel(req.body)
  try {
    const newCategory = await category.save()
    res.status(201).json({
      category: newCategory
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = await categoriesModel.findById(req.params.id)
    if (category) {
      category.name = req.body.name
      const updatedCategory = await category.save()
      res.status(200).json({
        category: updatedCategory
      })
    } else {
      res.status(404).json({
        message: "Category not found"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const category = await categoriesModel.findByIdAndDelete(req.params.id)
    if (category) {
      res.status(200).json({
        message: "Category removed"
      })
    } else {
      res.status(404).json({
        message: "Category not found"
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}