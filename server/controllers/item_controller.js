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
  } = req.body

  console.log(req.body)

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
    collection_name: collection,
    height,
    gender,
    color,
    article,
    img: images,
    size,
  }
  const item = await Item.create(newItem)

  if (item) {
    res.status(200).json({ message: 'Item successfully created.' })
  } else {
    res.status(400).json({ messgae: 'Invalid item data recieved.' })
  }
})

const edit_item = asyncHandler(async (req, res, next) => {
  let { _id, sale, discount, active, hide } = req.body
  console.log(req.body)

  !active ? (active = true) : null
  hide ? (active = false) : null

  if (!_id) {
    return res.status(400).json({ message: 'Invalid data.' })
  }

  const findAndUpdate = await Item.updateMany(
    { _id: { $in: _id } },
    { $set: { active: active, sale: sale, discount: discount } }
  )

  if (findAndUpdate) {
    res.status(200).json({ message: 'Success' })
  } else {
    res.status(400).json({ message: 'Error' })
  }
})

module.exports = { get_all_items, add_new_item, edit_item }
