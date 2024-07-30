const express = require('express')
const collection_routes = express.Router()
const collection_controller = require('../controllers/collection_controller')

// item_routes.route('/').get(item_controller.get_all_items)

collection_routes.route('/add').post(collection_controller.add_collection)

module.exports = collection_routes
