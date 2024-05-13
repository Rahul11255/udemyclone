const express = require("express")
const router = express.Router()
const {ordered} = require('../controllers/Product')

router.route('/order').post(ordered)

module.exports = router