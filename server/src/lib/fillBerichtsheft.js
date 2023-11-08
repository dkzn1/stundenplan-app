const path = require('path')
const ExcelJS = require('exceljs')
const sortObjectByKeys = require('../utils/sortObjectByKeys')

const createWeekTopics = topics => {
  const { lecture, praxis } = topics

  const lectureTopics = lecture ? sortObjectByKeys(lecture) : {}

  const dates = Object.keys(lectureTopics)

  const weekTopics = dates.map(date => {
    const dateTimeSlots = lectureTopics[date]
    const dateTopics = Object.keys(dateTimeSlots).reduce(
      (dateTopicsResult, timeSlot) => {
        const timeSlotTopics = dateTimeSlots[timeSlot]

        if (timeSlotTopics.length === 0) return dateTopicsResult

        const mergedTimeSlotTopics = timeSlotTopics
          .map(topic => topic.topic)
          .join(', ')

        return [...dateTopicsResult, mergedTimeSlotTopics]
      },
      []
    )

    const praxisTopics = date in praxis ? praxis[date] : []

    return [...dateTopics, ...praxisTopics].slice(0, 5)
  })

  return weekTopics
}

async function fillBerichtsheft(topics, calendarWeek, tempFileName) {
  const workbook = new ExcelJS.Workbook()

  const templatePath = path.join(
    __dirname,
    `../../assets/berichtsheft_template.xlsx`
  )

  await workbook.xlsx.readFile(templatePath)
  const worksheet = workbook.getWorksheet('berichtsheft')

  const weekTopics = createWeekTopics(topics)

  const rowStart = 4

  weekTopics.forEach((dayItems, idx) => {
    let startRow = rowStart + idx * 6

    if (typeof dayItems === 'string') {
      const valueCellB = worksheet.getCell(`B${startRow}`).value
      worksheet.getCell(`B${startRow}`).value = `${valueCellB} | ${dayItems}`

      for (let idx = 0; idx < 6; idx++) {
        worksheet.getCell(`E${startRow + idx}`).value = null
      }
    } else {
      dayItems.forEach((item, idx) => {
        const valueCellB = worksheet.getCell(`B${startRow + idx}`).value
        worksheet.getCell(
          `B${startRow + idx}`
        ).value = `${valueCellB} | ${item}`
      })
    }
  })

  // const calendarWeek = getCalendarWeek(scheduleData.monday[0].date)

  worksheet.getCell('D1').value = `KW ${calendarWeek}`

  for (let idx = 9; idx < 34; idx += 6) {
    const cell = worksheet.getCell(`F${idx}`)
    cell.value = { formula: cell.value.formula, result: undefined }
  }

  const f35 = worksheet.getCell(`F35`)
  f35.value = {
    formula: f35.value.formula,
    result: undefined,
  }

  const e35 = worksheet.getCell(`E35`)
  e35.value = {
    formula: e35.value.formula,
    result: undefined,
  }

  const tempBerichtsheftPath = path.join(
    __dirname,
    `../../downloads/${tempFileName}.xlsx`
  )

  await workbook.xlsx.writeFile(tempBerichtsheftPath)
}

module.exports = fillBerichtsheft
