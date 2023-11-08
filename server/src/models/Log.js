const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['status', 'error'],
    default: 'status',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose?.models?.Log || mongoose.model('Log', logSchema)
