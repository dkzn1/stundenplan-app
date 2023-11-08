require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const { errorHandler } = require('./middleware/errorMiddleware')
const corsMiddleware = require('./middleware/corsMiddleware')
const socket = require('./config/socket')
const topicsEvents = require('./events/topicsEvents')
const runScheduleUpdateRoutine = require('./services/runScheduleUpdateRoutine')
const db = require('./config/db')

function startServer() {
  const app = express()
  const server = require('http').createServer(app)
  const io = socket(server)
  topicsEvents(io)

  app.use(corsMiddleware)
  app.use(errorHandler)

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(
    session({
      key: 'dashboard',
      secret: 'demo-version',
      saveUninitialized: false,
      resave: false,
      cookie: {
        expires: 1000 * 60 * 60 * 24,
      },
    })
  )

  app.use('/api/schedules', require('./routes/schedulesRoutes'))
  app.use('/api/logs', require('./routes/logsRoutes'))
  app.use('/api/berichtsheft', require('./routes/berichtsheftRoutes'))
  app.use('/api/schedule-updater', require('./routes/scheduleUpdaterRoutes'))
  app.use('/dashboard/login', require('./routes/loginRoutes'))

  const port = process.env.PORT || 5000
  server.listen(port, () => console.log(`Server started on port ${port}`))
}

db.connect()
// runScheduleUpdateRoutine()
startServer()
