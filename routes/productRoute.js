const router = require('express').Router()
const productController = require('../controllers/productController')

router.post('/', productController.createProduct)
router.get('/', productController.getProducts)
router.get('/:id', productController.getProductsById)

module.exports = router