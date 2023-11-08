const Schedule = require('../models/Schedule')

/**
 * @desc    get schedule topics by id
 * @route   GET api/schedules/:id/topics
 * @access  Public
 */
const getTopics = async (req, res) => {
  const schedule = await Schedule.findById(req.params.id, 'topics')

  res.status(200).json(schedule.topics)
}

/**
 * @desc    get schedule topics by id for a specific date
 * @route   GET api/schedules/:id/topics/:date
 * @access  Public
 */
const getTopicsByDate = async (req, res) => {
  const schedule = await Schedule.findById(req.params.id, 'topics')
  const topics = schedule.topics[req.params.date] || []

  res.status(200).json(topics)
}

/**
 * @desc    Create a new topic in a schedule
 * @route   POST api/schedules/:id/topics/:startTime
 * @access  Public
 */
const createTopic = async (req, res) => {
  const { id, date, startTime } = req.params
  const { topic } = req.body

  try {
    const schedule = await Schedule.findById(id)
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found.' })
    }

    if (!schedule.topics[date]) schedule.topics[date] = {}
    if (!schedule.topics[date][startTime]) schedule.topics[date][startTime] = []

    schedule.topics[date][startTime].push(topic)

    await schedule.save()

    res.status(201).json(schedule.topics)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create topic.' })
  }
}

/**
 * @desc    Delete a topic from a schedule
 * @route   DELETE api/schedules/:id/topics/:date/:startTime/:index
 * @access  Public
 */
const deleteTopic = async (req, res) => {
  const { id, date, startTime, index } = req.params

  try {
    const schedule = await Schedule.findById(id)
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found.' })
    }

    if (schedule.topics[date] && schedule.topics[date][startTime]) {
      schedule.topics[date][startTime] = [
        ...schedule.topics[date][startTime],
      ].splice(index, 1)
    }

    await schedule.save()

    res.status(200).json(schedule.topics)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete topic.' })
  }
}

/**
 * @desc    Update a topic in a schedule
 * @route   PUT api/schedules/:id/topics/:date/:startTime/:index
 * @access  Public
 */
const updateTopic = async (req, res) => {
  const { id, date, startTime, index } = req.params
  const { topic } = req.body

  try {
    const schedule = await Schedule.findById(id)
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found.' })
    }

    if (schedule.topics[date] && schedule.topics[date][startTime]) {
      schedule.topics[date][startTime][index] = topic
    }

    await schedule.save()

    res.status(200).json(schedule.topics)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update topic.' })
  }
}

module.exports = {
  getTopics,
  getTopicsByDate,
  createTopic,
  deleteTopic,
  updateTopic,
}
