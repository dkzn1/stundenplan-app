const Schedule = require('../models/Schedule')

async function performTopicOperation(type, data) {
  if (!data) return

  const { id, date, startTime, topic } = data

  try {
    const schedule = await Schedule.findById(id)

    if (!schedule) throw new Error('Schedule not found.')

    const topicNotFound =
      type !== 'topic_event' &&
      !(date in schedule.topics) &&
      !(startTime in schedule.topics[date])

    if (topicNotFound) throw new Error('Topic not found.')

    let broadcast_type = null

    switch (type) {
      case 'topic_event':
        const { index } = data

        const topicExists = schedule.topics[date][startTime]
          .map(tpc => tpc.topic)
          .includes(topic)
        if (topicExists) return

        if (index < schedule.topics[date][startTime].length) {
          schedule.topics[date][startTime][index] = { topic }
          broadcast_type = 'updated_topic'
          break
        }

        if (!schedule.topics) schedule.topics = {}
        if (!schedule.topics[date]) schedule.topics[date] = {}
        if (!schedule.topics[date][startTime])
          schedule.topics[date][startTime] = []

        schedule.topics[date][startTime].push({ topic })
        broadcast_type = 'created_topic'
        break

      case 'delete':
        schedule.topics[date][startTime] = schedule.topics[date][
          startTime
        ].filter(dbTopic => dbTopic && dbTopic.topic !== topic)
        break

      case 'delete_all':
        schedule.topics[date][startTime] = []

        break
    }

    schedule.markModified('topics')
    await schedule.save()

    return broadcast_type
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = { performTopicOperation }
