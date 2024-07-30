const Item = require('../models/item_model')
const Collection = require('../models/collection_model')
const asyncHandler = require('express-async-handler')

const add_collection = asyncHandler(async (req, res, next) => {
  const name = req.body
  console.log(req.body)

  if (!name) {
    return res.status(400).json({ message: 'Invalid data recieved.' })
  }

  const collection = await Collection.create(name)

  if (collection) {
    res.status(200).json({ message: 'Success.' })
  }
})

module.exports = { add_collection }
