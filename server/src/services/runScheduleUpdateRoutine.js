const { join } = require('path')
const { readFileSync } = require('fs')

const scheduleUpdater = require('./scheduleUpdater.js')
const timeout = require('./utils/timeout.js')

async function runScheduleUpdateRoutine() {
  const updaterStatusPath = join(
    process.cwd(),
    'data',
    'scheduleUpdaterStatus.json'
  )

  const updaterStatus = JSON.parse(readFileSync(updaterStatusPath))

  if (updaterStatus.running) await scheduleUpdater()

  const now = new Date()
  const currentHour = now.getHours()

  const isFriday = now.getDay() == 5

  const oneHour = 60 * 60

  const timeoutWorkingPeriod = isFriday ? 120 : 240
  const timeoutIdlePeriod = currentHour > 15 ? 3 * oneHour : oneHour

  const isWorkingPeriod = currentHour > 4 && currentHour < 16

  const timeoutDuration = isWorkingPeriod
    ? timeoutWorkingPeriod
    : timeoutIdlePeriod

  !isWorkingPeriod && console.log('idle for:', timeoutDuration / oneHour)

  await timeout(timeoutDuration)

  runScheduleUpdateRoutine()
}

module.exports = runScheduleUpdateRoutine
