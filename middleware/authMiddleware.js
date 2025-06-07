const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header.authorization;
    const token = authHeader &&  authHeader.split(' ')[1];

    if(!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.finfById(decoded.userId).select('-password');
    
      if (!user || !user.isActive) {
        return res.status(401).json({
          successa: false,
          message: 'Invalid token or user not found'
        });
      }

      req.user = user;
      next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({
      success: false,
      message: 'Invalid or expire token'
    });
  }
  };

module.exports = { authenticateToken };
