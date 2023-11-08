const express = require('express')
const router = express.Router()

const {
  runScheduleUpdater,
  stopScheduleUpdater,
} = require('../controllers/scheduleUpdaterController')

router.get('/run', runScheduleUpdater)
router.get('/stop', stopScheduleUpdater)

module.exports = router
