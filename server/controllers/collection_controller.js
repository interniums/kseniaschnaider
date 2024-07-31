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

const get_collections = asyncHandler(async (req, res, next) => {
  const collections = await Collection.find()

  if (collections) {
    res.status(200).json(collections)
  } else {
    res.status(404).json({ message: 'No collections found.' })
  }
})

module.exports = { add_collection, get_collections }
