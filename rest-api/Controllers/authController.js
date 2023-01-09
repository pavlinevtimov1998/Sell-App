const { catchAsyncError } = require('../Util/errorParser');

const authController = require('express').Router();

authController.post('/login', catchAsyncError((req, res) => {

}))

authController.post('/register', catchAsyncError((req, res) => {
    
}))

authController.post('/logout', catchAsyncError((req, res) => {
    
}))

module.exports = authController