const express = require('express')
const adminRoute = express.Router()
const adminController = require('../controllers/adminController')

adminRoute.post('/login',adminController.loginUser)
adminRoute.get('/getAllUsers',adminController.getAllUsers)
adminRoute.delete('/deleteUser',adminController.deleteUser)

module.exports = adminRoute