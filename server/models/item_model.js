const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  new: {
    type: Boolean,
    default: true,
    required: false,
  },
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  img: {
    type: [String],
    required: true,
  },
  cost_uah: {
    type: Number,
    required: true,
    default: 0,
  },
  cost_eur: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
    required: true,
  },
  item_collection: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  collection_name: {
    type: String,
    required: true,
    default: '',
  },
  carry_over: {
    type: Boolean,
    default: false,
    required: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
    default: 'no category',
  },
  color: {
    type: [Object],
    required: true,
  },
  material: {
    type: String,
    default: 'unknown material',
  },
  size: {
    type: Object,
    default: [
      { xxs: true, in_stock: 0 },
      { xs: true, in_stock: 0 },
      { s: true, in_stock: 0 },
      { m: true, in_stock: 0 },
      { l: true, in_stock: 0 },
      { xl: true, in_stock: 0 },
      { oneSize: true, in_stock: 0 },
    ],
    required: true,
  },
  height: {
    type: Boolean,
    default: false,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  sale: {
    type: Boolean,
    default: false,
    required: true,
  },
  description: {
    type: String,
    default: 'no description provided',
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  recycled: {
    type: Boolean,
    required: true,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
})

module.exports = mongoose.model('Item', ItemSchema)
