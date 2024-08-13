const express = require('express')
const sale_routes = express.Router()
const sale_controller = require('../controllers/sale_controller')

sale_routes.route('/add').post(sale_controller.add_sale)

sale_routes.route('/').get(sale_controller.get_sales)

sale_routes.route('/:id').get(sale_controller.get_sale)

module.exports = sale_routes
