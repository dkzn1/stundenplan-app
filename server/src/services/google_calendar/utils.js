const path = require('path')
const { readFileSync, writeFileSync } = require('fs')
const { google } = require('googleapis')
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '..', '.env'),
})
const timeout = require('../utils/timeout.js')
const shuffleArray = require('../utils/shuffleArray.js')

const CREDENTIALS = JSON.parse(process.env.GCALENDAR_CREDS)
const CALENDAR_ID = process.env.GCALENDAR_ID

const SCOPES = 'https://www.googleapis.com/auth/calendar'
const calendar = google.calendar({ version: 'v3' })

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
)

const gcal = {
  insertEvent: async event => {
    try {
      calendar.events.insert({
        auth: auth,
        calendarId: CALENDAR_ID,
        resource: event,
      })
    } catch (err) {
      console.error(err.message)
    }
  },

  deleteWeek: async startDate => {
    const [day, month, year] = startDate.split('.')

    const dateStart = new Date(year, month - 1, day)
    dateStart.setDate(dateStart.getDate())

    const dateEnd = new Date(dateStart)
    dateEnd.setDate(dateEnd.getDate() + 6)

    const timeMin = dateStart.toISOString()
    const timeMax = dateEnd.toISOString()

    const events = await calendar.events.list({
      auth: auth,
      calendarId: CALENDAR_ID,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    })

    for (const event of events.data.items) {
      await calendar.events.delete({
        auth: auth,
        calendarId: CALENDAR_ID,
        eventId: event.id,
      })

      await timeout(1)
    }
  },
}

function getSubjectColorID(subjectType, subject) {
  const colorIDsPath = path.join(__dirname, 'subjectColorIDs.json')
  const colorIDs = JSON.parse(readFileSync(colorIDsPath))

  const colorIdKey = subjectType === 'Praxisunterricht' ? subjectType : subject

  if (colorIdKey in colorIDs) return colorIDs[colorIdKey]

  const shuffeledColorIDs = shuffleArray(colorIDs.openIDs)

  const colorId = shuffeledColorIDs[0]

  colorIDs[subject] = colorId
  colorIDs.openIDs = shuffeledColorIDs.slice(1)

  writeFileSync(colorIDsPath, JSON.stringify(colorIDs, null, 2), err => {
    if (err) console.error(err)
  })

  return colorId
}

module.exports = { gcal, getSubjectColorID }
