const express  = require('express');
const { getDashboardSummary, getRecentActivity } = require('../controllers/dashboardController.js');
const { authenticateToken} = require('../middleware/authMiddleware.js');

const router = express.Router();


// dashboard routes protected

router.use(authenticateToken);

router.get('/summary', getDashboardSummary);
router.get('/activity', getRecentActivity);

module.exports = router;
