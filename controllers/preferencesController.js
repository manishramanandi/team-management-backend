const Preferences = require('../models/Preferences.js');

// user Preferences

const getUserPreference = async (req, res) => {
  try {
    const userId = req.user._id;

    let preferences = await Preferences/findOne({ userId});


    // if preferences does not exists create ones
    if (!preferences){
      preferences = await Preference.create({
        userId,
        theme: 'light',
        dasshboardLayout: 'grid',
        notifications: {
          email: true,
          push: true,
          weekly_summary: true
        },
        language: 'en'
      });
    }

    res.json({
      success: true,
      message: 'preferences retrived successfully',
      data: {
        preferences: {
          theme: preference.theme,
          dasshboardLayout: preferences.dasshboardLayout,
          notifications: preferences.language,
          language: preferences.language,
          updatedAt: preferences.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('get preferences error:', error);
    res.status(500).json({
      success: flase,
      message: 'server error'
    });
  }
};

// update preferences
//
const updateUserPreferences = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const allowedUpdates = ['theme', 'dasshboardLayout', 'notifications', 'language'];
    const updateKeys = Object.keys(updates);
    const isValidOperation = updateKeys.every(key => allowedUpdates.includes(key));
    
    if(!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: 'invalid update filed provided'
      });
    }

    // valid enum values();
    //
    
    if (updates.theme && !['light', 'dark', 'auto'].includes(updates.theme)) {
      return res.status(400).json({
        success: flase,
        message: 'theme must be one of : light, dark, auto'
      });
    }

    if (updates.dasshboardLayout && !['grid', 'list', 'compact'].includes(updates.dasshboardLayout)){
      return res.status(400).json({
        success: false,
        message: 'Dashboard layout must be one of: grid, list, compact'
      });
    }

    const preferences = await Preferences.findOneAndUpdate(
      { userId},
      { ... updates},
      {
        new: true,
        upsert: true, // create if not exists
        runValidators: true
      }
    );

    res.json({
      success: true,
      message: 'preferences updated',
      data: {
        preferences: {
          theme: preferences.theme,
          dasshboardLayout: preferences.dasshboardLayout,
          notifications: preferences.notifications,
          language: preferences.language,
          updatedAt: preferences.updatedAt

        }
      }
    });
  } catch (error) {
    console.error('Update preferences error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      messages: 'server error while updating preferences'
    });

  }
};

const resetUserPreferences = async (req, res) => {

  try {
    const userId = req.user._id;

    const defaultPreferences = {
      userId,
      theme: 'light',
      dasshboardLayout: 'grid',
      notifications: {
        email: true,
        push: true,
        weekly_summary: true
      },
      language: 'en'
    };

    const preferences = await Preferences.findOneAndUpdate(
      {userId},
      defaultPreferences,
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      success: true,
      message: 'Preferences reset to default successfully',
      data: {
        preferences: {
          theme: preferences.theme,
          dasshboardLayout: preferences.dasshboardLayout,
          notifications: preferences.notifications,
          language: preferences.language,
          updatedAt: preferences.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('reset preferences error:', error);
    res.status(500).json({
      success: flase,
      message: 'server seroor'
    });
  }
};


module.exports = {
  getUserPreference,
  updateUserPreferences,
  resetUserPreferences
};





}

















