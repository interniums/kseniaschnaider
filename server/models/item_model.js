const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  new: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  cost_uah: {
    type: Number,
    minLength: 1,
    default: 99,
  },
  cost_eur: {
    type: Number,
    minLength: 1,
    default: 99,
  },
  discount: {
    type: Boolean,
    default: false,
    value: 0,
  },
  item_collection: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  carry_over: {
    type: Boolean,
    default: false,
  },
  color: {
    type: Object,
    required: true,
  },
  in_stock: {
    type: Boolean,
    required: true,
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
    },
  },
  height: {
    type: Object,
    default: {
      below: true,
      above: true,
    },
  },
  article: {
    type: String,
    required: true,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: 'no description provided',
  },
  gender: {
    type: String,
    required: true,
  },
  recycled: {
    type: Boolean,
    required: true,
  },
})

module.exports = mongoose.model('Item', ItemSchema)
