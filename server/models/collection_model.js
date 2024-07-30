const mongoose = require('mongoose')

const CollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  items: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    required: false,
  },
})

module.exports = mongoose.model('Collection', CollectionSchema)
