const ExcelJS = require('exceljs')
const { readFileSync } = require('fs')
const { getCalendarWeek } = require('../utils/getCalendarWeek')

const createScheduleItems = scheduleData => {
  const setDayItems = (itemsObj, slot, idx, initialArr) => {
    const is45MinSlot = slot.blockType === '45 min'

    const prevSlot = initialArr[idx === 0 ? idx : idx - 1]
    const sameLastSlot =
      prevSlot.subject === slot.subject ||
      prevSlot.subjectType.startsWith('LEK')

    const isConsultation = slot.subjectType === 'Konsultation'

    if (slot.subjectType !== 'Praxisunterricht' && !isConsultation) {
      if (!is45MinSlot || (is45MinSlot && sameLastSlot))
        itemsObj.lectures.push(slot.subject)
    } else {
      if (!is45MinSlot || (is45MinSlot && sameLastSlot) || isConsultation)
        itemsObj.praxis.push('Praxisunterricht')
    }

    return itemsObj
  }

  const setScheduleItems = (lecturesArr, day) => {
    const dayData = scheduleData[day].slice(1)

    const dayItems = !('subjectType' in dayData[0])
      ? dayData[0].subject
      : dayData.reduce(setDayItems, { lectures: [], praxis: [] })

    lecturesArr.push(dayItems)

    return lecturesArr
  }

  const scheduleItems = Object.keys(scheduleData)
    .reduce(setScheduleItems, [])
    .map(dayItems => {
      if (typeof dayItems === 'string') return dayItems
      return [...dayItems.lectures, ...dayItems.praxis]
    })

  return scheduleItems
}

async function fillBerichtsheftBaseData(scheduleData) {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile('./assets/berichtsheft_template.xlsx')
  const worksheet = workbook.getWorksheet('berichtsheft')

  const scheduleItems = createScheduleItems(scheduleData)

  const rowStart = 4

  scheduleItems.forEach((dayItems, idx) => {
    let startRow = rowStart + idx * 6

    if (typeof dayItems === 'string') {
      worksheet.getCell(`B${startRow}`).value = dayItems

      for (let idx = 0; idx < 6; idx++) {
        worksheet.getCell(`E${startRow + idx}`).value = null
      }
    } else {
      dayItems.forEach((item, idx) => {
        const cell = `B${startRow + idx}`
        worksheet.getCell(cell).value = item
      })
    }
  })

  const calendarWeek = getCalendarWeek(scheduleData.monday[0].date)

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

  await workbook.xlsx.writeFile(
    `./downloads/berichtsheft_kw${calendarWeek}.xlsx`
  )
}

module.exports = fillBerichtsheftBaseData
