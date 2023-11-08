const express = require('express')
const router = express.Router()

const {
  generateBerichtsheft,
  downloadBerichtsheft,
} = require('../controllers/berichtsheftController')

router.post('/generate', generateBerichtsheft)
router.get('/download-berichtsheft', downloadBerichtsheft)

module.exports = router
