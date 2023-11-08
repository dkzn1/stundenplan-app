const express = require('express')
const router = express.Router()

const {
  logIntoDashboard,
  checkLoginStatus,
} = require('../controllers/loginController')

router.post('/', logIntoDashboard)
router.get('/status', checkLoginStatus)

module.exports = router
