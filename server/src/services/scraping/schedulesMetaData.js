const { parse } = require('himalaya')

async function scrape(page, schedulesUrl) {
  await page.goto(schedulesUrl)

  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(2000)

  await page.fill('#searchinput', '2023 winter fiae d')

  await page.waitForTimeout(1000)

  await page.keyboard.press('Enter')

  await page.waitForTimeout(1500)

  const scheduleListHtml = await page.$eval('#thelist', el => el.innerHTML)

  await page.waitForTimeout(1000)

  return parse(scheduleListHtml)
}

function format(schedules, scheduleUrl) {
  const formattedSchedules = schedules.map(({ children }) => {
    const hrefAttribute = children[0].attributes[0].value
    const url = `${scheduleUrl}${hrefAttribute.slice(2)}`
    const scheduleName = hrefAttribute.slice(8)
    const updatedAtNode = children[2].children[0].children[0].children[0]
    const updatedAt = updatedAtNode.content.slice(1, -1)
    const calendarWeek = parseInt(scheduleName.slice(34, -4))

    return { scheduleName, calendarWeek, url, updatedAt }
  })

  return formattedSchedules
}

function checkForUpdates(latestSchedule, scrapedSchedules) {
  for (const schedule of scrapedSchedules) {
    const newScheduleReleased =
      schedule.calendarWeek > latestSchedule?.calendarWeek

    if (newScheduleReleased) {
      schedule.updateType = 'newCalendarWeekRelease'
      return schedule
    }

    const dateLastScheduleUpdate =
      latestSchedule?.updatedAt && new Date(latestSchedule.updatedAt)

    const dateScrapedScheduleUpdate = new Date(schedule.updatedAt)

    const lastScheduleWasUpdated =
      dateScrapedScheduleUpdate > dateLastScheduleUpdate

    if (lastScheduleWasUpdated) {
      schedule.updateType = 'sameCalendarWeekUpdate'
      return schedule
    }
  }

  return false
}

module.exports = { scrape, format, checkForUpdates }
