const express = require("express")
const router = express.Router()
const {signupUser,loginUser,getAllusers} = require('../controllers/auth')

router.route('/signup').post(signupUser)
router.route('/users').get(getAllusers)
router.route('/login').post(loginUser)

module.exports = router