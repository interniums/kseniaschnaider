const express = require('express')
const category_routes = express.Router()
const category_controller = require('../controllers/category_controller')

category_routes.route('/add').post(category_controller.add_category)

category_routes.route('/').get(category_controller.get_categories)

category_routes.route('/:id').get(category_controller.get_category)

module.exports = category_routes
