const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');


const router = express.Router();

// public rs 
router.post('/register', registerUser);
router.post('/login', loginUser);

// protect reverse();
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;
