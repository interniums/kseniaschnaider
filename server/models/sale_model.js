const mongoose = require('mongoose')

const SaleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  default_discount: {
    type: String,
    default: '0',
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
})

module.exports = mongoose.model('Sale', SaleSchema)
