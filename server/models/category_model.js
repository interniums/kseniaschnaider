const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  items: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  gender: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Category', CategorySchema)
