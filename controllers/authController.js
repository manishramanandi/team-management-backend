const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate token

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// register of user 

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // if valid
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'please provide name, email and password',
      });
    }
    
// check user exist or not 
const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({
    success: false,
    message: 'User already exists'
  });
}



// user create
const user = await User.create({
  name: name.trim(),
  email: email.toLowerCase().trim(),
  password
});

const token = generateToken(user._id);

res.status(201).json({
  success: true,
  message: 'Successfully registered',
  data: {
    user: {
        id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    },
    token
  }
});


  } catch (error) {
    console.error('Register error:', error);

    // validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: flase,
        message: messages.join(', ')
      });
      
    }

    res.status(500).json({
      success: false,
      message: 'server error try again'
    });


    
  }
};

// user login

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    // valid
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }


    // find user and compare password
    const user = await User.findOne({
      email: email.toLowerCase().trim()
    }).select('+password');

    if(!user || !user.isActive) {
      return res.status(401).json ({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // chjeck password
    const isPasswordMatch = await user.comparePassword(passwprd);
    if (!isPasswordMatch)  {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'login succesful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        },
        token
      }
    });


  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'server error'
    });
  }

};

const getUserProfile = async (req, res) => {
  try {
    const user = req.user; 

    res.json({
      success: true,
      message: 'profile retrived successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }

    });

  } catch (error) {
    console.error('get profile error:', error);
    res.status(500).json({
      success: false,
      message: ' server error while fetching profile'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
