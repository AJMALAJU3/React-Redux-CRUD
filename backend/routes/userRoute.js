const express = require('express')
const userRoute = express.Router()
const userController = require('../controllers/userController')


userRoute.post('/register',userController.registerUser)
userRoute.post('/login',userController.loginUser)
userRoute.post('/getUser',userController.getUserData)
userRoute.patch('/editUser',userController.editUserData)

module.exports = userRoute