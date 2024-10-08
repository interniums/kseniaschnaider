const express = require('express')
const item_routes = express.Router()
const item_controller = require('../controllers/item_controller')

item_routes.route('/').get(item_controller.get_all_items)

item_routes.route('/get/:id').get(item_controller.get_item)

item_routes.route('/add').post(item_controller.add_new_item)

item_routes.route('/edit').patch(item_controller.edit_item)

item_routes.route('/edit/:id').patch(item_controller.edit_item_by_property)

module.exports = item_routes
