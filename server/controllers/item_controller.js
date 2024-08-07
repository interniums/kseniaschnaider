const Item = require('../models/item_model')
const Collection = require('../models/collection_model')
const Category = require('../models/category_model')
const asyncHandler = require('express-async-handler')

const get_all_items = asyncHandler(async (req, res, next) => {
  const items = await Item.find().lean()
  if (!items) {
    return res.status(400).json({ message: 'No items found.' })
  }
  res.json(items)
})

const add_new_item = asyncHandler(async (req, res, next) => {
  const { name, description, material, collection, height, gender, color, article, images, size, category } = req.body

  console.log(req.body)

  if (
    !name ||
    !description ||
    !material ||
    !collection ||
    !gender ||
    !color ||
    !article ||
    !images ||
    !category ||
    !size
  ) {
    return res.status(400).json({ message: 'Provide all item info.' })
  }

  const findCollection = await Collection.findById(collection)
  if (!findCollection) {
    return res.status(400).json({ message: 'Invalid collection id' })
  }
  const findCategory = await Category.findById(category)
  if (!findCategory) {
    return res.status(400).json({ message: 'Invalid category id' })
  }

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
    category: findCategory,
  }
  const item = await Item.create(newItem)

  if (item) {
    res.status(200).json({ message: 'Item successfully created.' })
  } else {
    res.status(400).json({ messgae: 'Invalid item data recieved.' })
  }
})

const edit_item = asyncHandler(async (req, res, next) => {
  let { _id, sale, discount, active, hide, hideSale, carryOver, hideCarryOver } = req.body
  console.log(req.body)

  !active ? (active = true) : null
  hide ? (active = false) : null
  hideSale ? (sale = false) : null
  hideCarryOver ? (carryOver = false) : null

  if (!_id) {
    return res.status(400).json({ message: 'Invalid data.' })
  }

  const findAndUpdate = await Item.updateMany(
    { _id: { $in: _id } },
    { $set: { active: active, sale: sale, discount: discount, carry_over: carryOver } }
  )

  if (findAndUpdate) {
    res.status(200).json({ message: 'Success' })
  } else {
    res.status(400).json({ message: 'Error' })
  }
})

const edit_item_by_property = asyncHandler(async (req, res, next) => {
  const _id = req.params
  const property = Object.keys(req.body)[0]
  let value = req.body[Object.keys(req.body)[0]]
  if (!_id) {
    return res.status(400).json({ message: 'Invalid id.' })
  }

  console.log(property, value)

  const item = await Item.findByIdAndUpdate(_id.id, {
    [property]: value,
  })
  if (!item) {
    return res.status(400).json({ message: 'Item not found.' })
  }
  res.status(200).json({ message: 'Success' })
})

const get_item = asyncHandler(async (req, res, next) => {
  const _id = req.params

  if (!_id) {
    return res.status(400).json({ message: 'Invalid id.' })
  }

  const item = await Item.findById(_id.id)

  if (!item) {
    res.status(404).json({ message: 'User not found.' })
  } else {
    res.status(200).json({ item })
  }
})

module.exports = { get_all_items, add_new_item, edit_item, get_item, edit_item_by_property }
