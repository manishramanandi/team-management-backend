const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
    unique: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'light'
  },
  dashboardLayout: {
    type: String,
    enum: ['grid', 'list', 'compact'],
    default: 'grid'
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    weekly_summary: {
      type: Boolean,
      default: true
    }
  },
  langauge: {
    type: String,
    default: 'en'
  }
}, {
  timestamps: true
});

module.export = mongoose.model('Preferences', preferencesSchema);



















