const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')

const updaterStatusPath = join(
  process.cwd(),
  'data',
  'scheduleUpdaterStatus.json'
)

//
//

const runScheduleUpdater = async (req, res) => {
  const updaterStatus = JSON.parse(readFileSync(updaterStatusPath))

  if (!updaterStatus.running) {
    const newStatus = { running: true }

    writeFileSync(
      updaterStatusPath,
      JSON.stringify(newStatus, null, 2),
      err => {
        if (err) console.error(err)
      }
    )
  }

  res.status(201)
}

//
//

const stopScheduleUpdater = async (req, res) => {
  const updaterStatus = JSON.parse(readFileSync(updaterStatusPath))

  if (updaterStatus.running) {
    const newStatus = { running: false }

    writeFileSync(
      updaterStatusPath,
      JSON.stringify(newStatus, null, 2),
      err => {
        if (err) console.error(err)
      }
    )
  }

  res.status(201)
}

//
//

module.exports = { runScheduleUpdater, stopScheduleUpdater }
