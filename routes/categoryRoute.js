const router  = require('express').Router()
const categoryController = require('../controllers/categoryController')

router.post('/categories', categoryController.createCategory)
router.get('/', categoryController.getCategories)
router.put('/:id',categoryController.updateCategory)
router.delete('/:id',categoryController.deleteCategory)
module.exports = router