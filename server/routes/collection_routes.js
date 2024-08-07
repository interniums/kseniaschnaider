const express = require('express')
const collection_routes = express.Router()
const collection_controller = require('../controllers/collection_controller')

collection_routes.route('/add').post(collection_controller.add_collection)

collection_routes.route('/').get(collection_controller.get_collections)

collection_routes.route('/:id').get(collection_controller.get_collection)

module.exports = collection_routes
