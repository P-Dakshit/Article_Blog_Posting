const express = require('express');
const { signup } = require('../controller/signupUserController');
const { login } = require('../controller/loginUserController');
const { resetPassword } = require('../controller/ResetPasswordController');
const { forgotPassword } = require('../controller/forgotPasswordController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

module.exports = router;