const authController = require('express').Router();

const { catchAsyncError } = require('../Util/errorParser');

authController.post('/login', catchAsyncError((req, res) => {

}))

authController.post('/register', catchAsyncError((req, res) => {
    
}))

authController.post('/logout', catchAsyncError((req, res) => {
    
}))

module.exports = authController