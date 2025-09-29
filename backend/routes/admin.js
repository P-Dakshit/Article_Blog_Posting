const express = require('express');
const { AllUsers, DeleteUser } = require('../controller/userManagement');
const verifyToken = require('../middleware/verifyToken');
const adminOnly = require('../middleware/adminOnly');

const router = express.Router();

router.get('/all_user', verifyToken, adminOnly, AllUsers);
router.delete('/d_user/:id', verifyToken, adminOnly, DeleteUser);

module.exports = router;