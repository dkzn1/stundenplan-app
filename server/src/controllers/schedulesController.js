const Schedule = require('../models/Schedule')

/**
 * @desc    get schedules
 * @route   GET api/schedules
 * @access  Public
 */
const getSchedules = async (req, res) => {
  const response = await Schedule.find()

  const schedules = response.reduce((resultObj, schedule) => {
    resultObj[schedule._id] = schedule

    return resultObj
  }, {})

  res.status(200).json(schedules)
}

/**
 * @desc    get schedule by id
 * @route   GET api/schedules/:id
 * @access  Public
 */
const getSchedule = async (req, res) => {
  const schedule = await Schedule.findById(req.params.id)

  res.status(200).json(schedule)
}

/**
 * @desc    get schedule by id
 * @route   GET api/schedules/:id
 * @access  Public
 */
const getSchedulesRange = async (req, res) => {
  const [startID, endID] = req.params.idRange.split('-')

  const response = await Schedule.find({
    _id: { $gte: startID, $lte: endID },
  })

  const schedules = response.reduce((resultObj, schedule) => {
    resultObj[schedule._id] = schedule

    return resultObj
  }, {})

  res.status(200).json(schedules)
}

module.exports = { getSchedules, getSchedule, getSchedulesRange }
