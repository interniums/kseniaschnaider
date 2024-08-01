const Item = require('../models/item_model')
const Collection = require('../models/collection_model')
const asyncHandler = require('express-async-handler')

const get_all_items = asyncHandler(async (req, res, next) => {
  const items = await Item.find().lean()
  if (!items) {
    return res.status(400).json({ message: 'No items found.' })
  }
  res.json(items)
})

const add_new_item = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    material,
    cost,
    collection,
    height,
    gender,
    color,
    article,
    images,
    size,
    doubled,
  } = req.body

  // console.log(req.body)

  if (
    !name ||
    !description ||
    !material ||
    !cost ||
    !collection ||
    !gender ||
    !color ||
    !article ||
    !images ||
    !size
  ) {
    return res.status(400).json({ message: 'Provide all item info.' })
  }
  const findCollection = await Collection.findOne({ name: collection })
  const newItem = {
    name,
    description,
    material,
    cost_uah: cost,
    item_collection: findCollection,
    height,
    gender,
    color,
    article,
    img: images,
    size,
    doubled,
  }
  const item = await Item.create(newItem)

  if (item) {
    res.status(200).json({ message: 'Item successfully created.' })
  } else {
    res.status(400).json({ messgae: 'Invalid item data recieved.' })
  }
})

module.exports = { get_all_items, add_new_item }
