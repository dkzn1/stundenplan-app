const { Server } = require('socket.io')

function socket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  })

  return io
}

module.exports = socket
