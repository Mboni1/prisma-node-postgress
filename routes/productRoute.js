const router = require('express').Router()
const productController = require('../controllers/productController')

router.post('/', productController.createProduct)
router.get('/', productController.getProducts)
router.get('/:id', productController.getProductsById)
router.put('/:id', productController.updateProduct)
router.delete('/:id',productController.deleteProduct)
router.get('/category/categoryId', productController.getProductsByCategoryId )

module.exports = router