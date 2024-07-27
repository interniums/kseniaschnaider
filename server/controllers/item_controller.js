const Item = require('../models/item_model')
const asyncHandler = require('express-async-handler')

const get_all_items = asyncHandler(async (req, res, next) => {
  const items = await Item.find().lean()
  if (!items) {
    return res.status(400).json({ message: 'No items found.' })
  }
  res.json(items)
})

module.exports = { get_all_items }
