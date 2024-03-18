const express = require("express")
const router = express.Router()
const categoriesController = require("../controllers/categories")
const validate = require("../middlewares/validation")
const saveCategorySchema = require("../validations/categories/save_category")
const updateCategorySchema = require("../validations/categories/update_category")

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *       500:
 *         description: Internal Server Error
 */
router.get("/", categoriesController.getCategories)

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ObjectId
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: A category object
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", categoriesController.getCategory)

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Category name
 *     responses:
 *       201:
 *         description: A new category has been created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post("/", validate(saveCategorySchema), categoriesController.createCategory)

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *           format: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New category name
 *     responses:
 *       200:
 *         description: The category has been updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", validate(updateCategorySchema), categoriesController.updateCategory)

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: The category has been deleted
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", categoriesController.deleteCategory)


module.exports = router