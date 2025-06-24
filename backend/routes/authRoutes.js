const express = require('express');
const router = express.Router();

// Import authentication controller functions
const { registerUser, loginUser } = require('../controllers/authController');

// Route to register a new user
router.post('/register', registerUser);

// Route to log in an existing user
router.post('/login', loginUser);

module.exports = router;
