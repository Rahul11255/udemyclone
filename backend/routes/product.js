const express = require("express")
const router = express.Router()
const {ordered,createProduct,getAllProducts,getSingleProducts,updateProduct,getAllOrders,searchProducts} = require('../controllers/Product')
const {jwtAuthMiddleware} = require("../jwt")
const {runValidation} = require('../validate/index')
const {createProductValidator} = require("../validate/createProduct")

router.route('/order').post(jwtAuthMiddleware,ordered)
router.route('/products').get(getAllProducts)
router.route('/orders').get(getAllOrders)
router.route('/product/:slug').get(getSingleProducts)
router.route('/products/:search').get(searchProducts)
router.route('/update/:slug').put(updateProduct)
router.route('/createproduct').post( jwtAuthMiddleware ,createProductValidator,runValidation, createProduct)

module.exports = router