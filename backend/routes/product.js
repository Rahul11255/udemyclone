const express = require("express")
const router = express.Router()
const {ordered,createProduct} = require('../controllers/Product')
const {jwtAuthMiddleware} = require("../jwt")

router.route('/order').post(ordered)
router.route('/createproduct').post( jwtAuthMiddleware, createProduct)

module.exports = router