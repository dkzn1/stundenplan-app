const Log = require('../models/Log')

/**
 * @desc    get logs
 * @route   GET api/logs
 * @access  Public
 */
const getLogs = async (req, res) => {
  const logs = await Log.find()

  res.status(200).json(logs)
}

/**
 * @desc    get schedule by id
 * @route   GET api/schedules/:id
 * @access  Public
 */
const createLog = async (req, res) => {
  const body = await req.json()

  await Log.create({ body })

  res.status(201)
}

module.exports = { getLogs, createLog }
