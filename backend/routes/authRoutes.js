const express = require('express');
const router = express.Router();

// Import the authController correctly
const authController = require('../controllers/authController'); 

// User signup
router.post('/user-signup', authController.userSignup);

// User login
router.post('/user-login', authController.userLogin);

// Admin login
router.post('/admin-login', authController.adminLogin);

module.exports = router;
