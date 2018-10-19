const mongoose = require('mongoose')

const shortenerSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  shortcode: {
    type: String,
    unique: [true, 'shortcode already exist!']
  },
  redirectCount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

const Shortener = mongoose.model('Shortener', shortenerSchema)

module.exports = Shortener
