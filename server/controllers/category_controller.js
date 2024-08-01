const Category = require('../models/category_model')
const asyncHandler = require('express-async-handler')

const add_category = asyncHandler(async (req, res, next) => {
  const { name, gender } = req.body

  if (!name || !gender) {
    return res.status(400).json({ message: 'Invalid data recieved.' })
  }

  const category = await Category.create({ name, gender })

  if (category) {
    res.status(200).json({ message: 'Category successfully created.' })
  } else {
    res.status(400).json({ message: 'Invalid data.' })
  }
})

const get_categories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find()

  if (categories) {
    res.status(200).json(categories)
  }
})

module.exports = { add_category, get_categories }