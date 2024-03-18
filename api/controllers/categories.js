const categoriesModel = require("../models/categories")

const getCategories = async (req, res) => {
  try {
    const categoriesWithProducts = await categoriesModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products"
        }
      }
    ])
    res.status(200).json({
      categories: categoriesWithProducts
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
  try {
    const category = new categoriesModel(req.body)
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
      Object.assign(category, req.body)
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