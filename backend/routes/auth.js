const express = require("express")
const router = express.Router()
const {signupUser,loginUser,getAllusers,getSingleUser} = require('../controllers/auth')
const {jwtAuthMiddleware} = require('../jwt')

router.route('/signup').post(signupUser)
router.route('/users').get(getAllusers)
router.route('/user').get(jwtAuthMiddleware,getSingleUser)
router.route('/login').post(loginUser)

module.exports = router