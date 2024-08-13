const Sale = require('../models/sale_model')
const asyncHandler = require('express-async-handler')

const add_sale = asyncHandler(async (req, res, next) => {
  const { name, default_discount } = req.body
  if (!name && !default_discount) {
    return res.status(400).json({ message: 'Imvalid data' })
  }

  const sale = await Sale.create({ name, default_discount })
  if (!sale) {
    return res.status(400).json({ message: 'Imvalid data' })
  }
  res.status(200).json({ message: 'Success' })
})

const get_sales = asyncHandler(async (req, res, next) => {
  const sales = await Sale.find().lean()
  if (!sales) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.status(200).json(sales)
})

const get_sale = asyncHandler(async (req, res, next) => {})

module.exports = {
  add_sale,
  get_sales,
  get_sale,
}
