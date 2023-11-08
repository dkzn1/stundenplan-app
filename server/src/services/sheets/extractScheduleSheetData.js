const ExcelJS = require('exceljs')
const extractDayColumn = require('./extractDayColumn')
const { COLUMN_WEEKDAYS } = require('../constants/sheets.js')

async function extractScheduleSheetData(sheetPath) {
	const workbook = new ExcelJS.Workbook()

	await workbook.xlsx.readFile(sheetPath)

	const scheduleSheet = workbook.worksheets[0]

	const extractDayTimeline = (timeline, column) => {
		timeline[COLUMN_WEEKDAYS[column]] = extractDayColumn(scheduleSheet, column)

		return timeline
	}

	const relevantColumns = Object.keys(COLUMN_WEEKDAYS)
	const fullWeekTimeline = relevantColumns.reduce(extractDayTimeline, {})

	return fullWeekTimeline
}

module.exports = extractScheduleSheetData
