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
  },
  cost_eur: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Boolean,
    default: false,
    required: false,
  },
  item_collection: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  carry_over: {
    type: Boolean,
    default: false,
    required: false,
  },
  color: {
    type: [Object],
    required: true,
  },
  in_stock: {
    type: Boolean,
    required: true,
    default: true,
  },
  material: {
    type: String,
    default: 'unknown material',
  },
  size: {
    type: Object,
    default: {
      xxs: true,
      xs: true,
      s: true,
      m: true,
      l: true,
      xl: true,
      oneSize: true,
    },
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
})

module.exports = mongoose.model('Item', ItemSchema)
