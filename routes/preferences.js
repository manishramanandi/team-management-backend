const express = require('express');
const {
  getUserPreferences,
  updateUserPreferences,
  resetUserPreferences
} = require('../controllers/preferencesController.js');
const { authenticateToken} = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', getUserPreferences);
router.post('/', updateUserPreferences);
router.put('/reset', resetUserPreferences);

module.exports = router;
