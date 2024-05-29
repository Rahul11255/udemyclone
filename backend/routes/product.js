const express = require("express")
const router = express.Router()
const {ordered,createProduct,getAllProducts,getSingleProducts,updateProduct,getAllOrders,searchProducts, getOrderwithUserID,updateOrderStatus} = require('../controllers/Product')
const {jwtAuthMiddleware} = require("../jwt")
const {runValidation} = require('../validate/index')
const {createProductValidator} = require("../validate/createProduct")

router.route('/order').post(jwtAuthMiddleware,ordered)
router.route('/products').get(getAllProducts)
router.route('/orders').get(getAllOrders)
router.route('/order').get(jwtAuthMiddleware,getOrderwithUserID)
router.route('/product/:slug').get(getSingleProducts)
router.route('/products/:search').get(searchProducts)
router.route('/update/:slug').put(updateProduct)
router.route('/update/order/:id').put(jwtAuthMiddleware,updateOrderStatus)
router.route('/createproduct').post( jwtAuthMiddleware ,createProductValidator,runValidation, createProduct)

module.exports = router