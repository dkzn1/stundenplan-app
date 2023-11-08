const {
  readFileSync,
  writeFileSync,
  existsSync,
  rename,
  unlinkSync,
} = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const launchPlaywright = require('./scraping/launchPlaywright.js')
const schedulesMetaData = require('./scraping/schedulesMetaData.js')

const downloadSchedulePDF = require('./scraping/downloadSchedulePDF.js')
const convertPdfToXlsx = require('./scraping/convertPdfToXlsx.js')
const extractScheduleSheetData = require('./sheets/extractScheduleSheetData.js')
const clearDirectory = require('./utils/clearDirectory.js')
const fillBerichtsheftBaseData = require('./sheets/fillBerichtsheftBaseData.js')

const pushScheduleToGoogleCal = require('./google_calendar/pushScheduleToGoogleCal.js')
const sendDiscordNotification = require('./discord/sendDiscordNotification.js')

const { SCHEDULES_URL, DISCORD_TOKEN } = process.env

async function scheduleUpdater(attempts = 5) {
  try {
    const pathLatestScheduleMetaData = path.join(
      __dirname,
      '../state/latestScheduleMetaData.json'
    )

    const metaDataLatestSchedule =
      existsSync(pathLatestScheduleMetaData) &&
      JSON.parse(readFileSync(pathLatestScheduleMetaData))

    const { page, browser } = await launchPlaywright()
    const scrapedSchedules = await schedulesMetaData.scrape(page, SCHEDULES_URL)
    const metaDataScrapedSchedules = schedulesMetaData.format(
      scrapedSchedules,
      SCHEDULES_URL
    )

    const newScheduleUpdate =
      metaDataLatestSchedule &&
      schedulesMetaData.checkForUpdates(
        metaDataLatestSchedule,
        metaDataScrapedSchedules
      )

    if (!metaDataLatestSchedule) {
      writeFileSync(
        pathLatestScheduleMetaData,
        JSON.stringify(newScheduleUpdate, null, 2),
        err => {
          if (err) console.error(err)
        }
      )
    }

    const now = new Date().toISOString()
    if (!newScheduleUpdate) {
      await browser.close()
      console.log(`${now} - no updates available`)
      return
    }
    console.log(`${now} - schedule was updated`)

    await downloadSchedulePDF(path, newScheduleUpdate.url)
    await convertPdfToXlsx(path, page)
    await browser.close()

    const sheetPath = path.join(__dirname, '../downloads/newSchedule.xlsx')
    if (!existsSync(sheetPath)) return
    const scheduleData = await extractScheduleSheetData(sheetPath)

    const pathScheduleData = path.join(
      __dirname,
      '../state',
      `cw${newScheduleUpdate.calendarWeek}.json`
    )

    const pathOldScheduleData = path.join(
      __dirname,
      '../state',
      `oldScheduleData.json`
    )

    if (newScheduleUpdate.updateType === 'sameCalendarWeekUpdate') {
      rename(pathScheduleData, pathOldScheduleData, error => {
        if (error) console.error('Error renaming file:', error)
      })
    }

    writeFileSync(
      pathScheduleData,
      JSON.stringify(scheduleData, null, 2),
      err => {
        if (err) console.error(err)
      }
    )

    await fillBerichtsheftBaseData(scheduleData)

    const pathDownloadsDir = path.join(__dirname, '..', 'downloads')
    // await clearDirectory(pathDownloadsDir)

    // pushScheduleToGoogleCal(scheduleData, newScheduleUpdate.updateType)
    // sendDiscordNotification(
    //   DISCORD_TOKEN,
    //   newScheduleUpdate,
    //   pathDownloadsDir,
    //   scheduleData,
    //   pathOldScheduleData
    // )

    writeFileSync(
      pathLatestScheduleMetaData,
      JSON.stringify(newScheduleUpdate, null, 2),
      err => {
        if (err) console.error(err)
      }
    )
  } catch (error) {
    console.error(error)

    if (existsSync(pathOldScheduleData)) {
      unlinkSync(pathOldScheduleData)
    }

    while (attempts > 0) await scheduleUpdater(attempts--)
  }
}

module.exports = scheduleUpdater
