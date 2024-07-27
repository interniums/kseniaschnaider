const express = require('express')
const item_routes = express.Router()
const item_controller = require('../controllers/item_controller')

item_routes.route('/').get(item_controller.get_all_items)

module.exports = item_routes
