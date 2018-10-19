const express = require('express')
const router = express.Router()
const { getUrl, getStats, newUrl } = require('../controllers/shortener.controller')

router
  .get('/:shortcode', getUrl)
  .get('/:shortcode/stats', getStats)
  .post('/shorten', newUrl)

module.exports = router