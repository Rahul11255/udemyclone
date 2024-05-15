const express = require("express")
const router = express.Router()
const {ordered,createProduct} = require('../controllers/Product')
const {jwtAuthMiddleware} = require("../jwt")
const {runValidation} = require('../validate/index')
const {createProductValidator} = require("../validate/createProduct")

router.route('/order').post(ordered)
router.route('/createproduct').post( jwtAuthMiddleware ,createProductValidator,runValidation, createProduct)

module.exports = router