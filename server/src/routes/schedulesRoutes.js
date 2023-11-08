const express = require('express')
const router = express.Router()

const {
  getSchedules,
  getSchedule,
  getSchedulesRange,
} = require('../controllers/schedulesController')

// const {
// 	getTopics,
// 	getTopicsByDate,
// 	createTopic,
// 	deleteTopic,
// 	updateTopic,
// } = require('../controllers/topicsController')

router.get('/', getSchedules)
router.get('/:id', getSchedule)
router.get('/range/:idRange', getSchedulesRange)

// router.get('/:id/topics/', getTopics)
// router.get('/:id/topics/:date', getTopicsByDate)
// router.post('/:id/topics/:date/:startTime', createTopic)
// router.delete('/:id/topics/:date/:startTime/:index', deleteTopic)
// router.put('/:id/topics/:date/:startTime/:index', updateTopic)

module.exports = router
