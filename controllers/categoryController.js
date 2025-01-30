const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(422).json({ error: 'Name is required'})
         }

         if (await prisma.category.findUnique({ where: { name :req.body.name}})) {
            return res.status(409).json({ error: `${req.body.name} category already exists`})
         }

         const newCategory = await prisma.category.create({
            data: {
                name : req.body.name
            }
         })
         return res.status(201).json({
            message: "name is saved",
            newCategory
        })

    } catch(error) {
        return res.status(500).json({ error: error.message})
    
    }
}
exports.getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({orderBy: { id: 'asc' } } )
       return res.status(200).json(categories) 
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.updateCategory = async (req, res) => {
     try {
        if (!await prisma.category.findUnique({where: {id :parseInt(req.params.id)} })) {
            return res.status(404).json({error: 'Category not found'})
        }
        if (!req.body.name) {
            return res.status(422).json({ error: 'Name is required'})

        }
        if (await prisma.category.findUnique({ where: { name: req.body.name } })) {
            return res.status(409).json({ error: `${req.body.name} category already exists`})
        }
       const updateCategory = await prisma.category.update({
        data: {
            name: req.body.name
        },
        where: {
            id: parseInt(req.params.id)
        }
       })
       return res.status(200).json(updateCategory)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
    }
exports.deleteCategory = async (req, res) => {
    try{
        if (!await prisma.category.findUnique({ where: { id: parseInt(req.params.id) } })) {
            return res.status(404).json({ error: 'Category not found' })
       }
       const productCount = await prisma.product.count({
        where: {
            categoryId: parseInt(req.params.id)
        }
       })
       if (productCount) {
        return res.status(409).json({ error: `Category id being used in ${productCount} product(s)`})
       }
       await prisma.category.delete({
        where: {
             id: parseInt(req.params.id)
        }
       })
       return res.status(200).json({
        message: `category with id ${req.params.id}`
       })
    } catch (error) {
        return res.status(500).json({ error: error.message }) 
    }
}