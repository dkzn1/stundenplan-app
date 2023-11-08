function scheduleUpdateEvent(io, schedule) {
  io.on('connection', socket => {
    // console.log(`User connected: ${socket.id}`)

    // socket.on('new_schedule_update', data => {
    //   socket.broadcast.emit('new_schedule_update', data)
    // })

    socket.emit('new_schedule_update', { schedule })
  })
}

module.exports = scheduleUpdateEvent
