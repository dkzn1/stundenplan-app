const { performTopicOperation } = require('../controllers/topicsController')

function topicsEvents(io) {
  io.on('connection', socket => {
    // socket.on('topic_submit', data => {
    // 	socket.emit('topic_submit', data)
    // })

    socket.on('topic_event', async data => {
      const type = await performTopicOperation('topic_event', data)
      if (!type) return

      socket.broadcast.emit(`broadcast_${type}`, data)
    })

    socket.on('delete_topic', async data => {
      socket.broadcast.emit('broadcast_deleted_topic', data)
      await performTopicOperation('delete', data)
    })

    socket.on('delete_all_topics', async data => {
      socket.broadcast.emit('broadcast_all_deleted_topics', data)
      await performTopicOperation('delete_all', data)
    })
  })
}

module.exports = topicsEvents
