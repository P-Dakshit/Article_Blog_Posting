const express = require('express');
const signupUserRoute = require('./users');
const blogRoute = require('./blog');
const adminRoute = require('./admin');

const router = express.Router();

router.use('/users', signupUserRoute);
router.use('/blog', blogRoute);
router.use('/admin', adminRoute);

module.exports = router;