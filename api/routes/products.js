const express = require("express")
const router = express.Router()
const productsController = require("../controllers/products")
const validate = require("../middlewares/validation")
const saveProductSchema = require("../validations/products/save_product")
const updateProductSchema = require("../validations/products/update_product")
const upload = require("../middlewares/upload")

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Internal Server Error
 */
router.get("/", productsController.getProducts)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ObjectId
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: A product object
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", productsController.getProduct)

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Meeting room saved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post("/", upload.array("images"), validate(saveProductSchema), productsController.createProduct)

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *           format: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New product name
 *               price:
 *                 type: number
 *                 example: 100
 *               quantity:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: 60e5d0f3d9b3e0f3b0e3e0f3
 *     responses:
 *       200:
 *         description: The product has been updated
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", upload.array("images"), validate(updateProductSchema), productsController.updateProduct)


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *           format: string
 *     responses:
 *       200:
 *         description: The product has been deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", productsController.deleteProduct)


module.exports = router