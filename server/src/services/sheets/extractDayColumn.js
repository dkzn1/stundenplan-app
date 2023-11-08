const extractCellData = require('./extractCellData')
const combineSameLectureBlocks = require('./combineSameLectureBlocks')
const addBlockTimes = require('./addBlockTimes')
const { TIME_SLOTS, RELEVANT_COLUMN_ROWS } = require('../constants/sheets.js')

const mergeRowsTo45MinLectureBlocks = (lectures, rowData, idx) => {
	const partialRows = [4, 8].includes(idx)

	if (partialRows) {
		const prevBlockIdx = lectures.length - 1
		const previousBlock = lectures[prevBlockIdx]

		const noPreviousLecture =
			!previousBlock || Object.keys(previousBlock).length === 0

		if (noPreviousLecture) {
			lectures[prevBlockIdx] = null
		} else {
			const updatedMergedBlock = Object.assign(previousBlock, rowData || {})
			lectures[prevBlockIdx] = updatedMergedBlock
		}

		return lectures
	}

	lectures.push(rowData)
	return lectures
}

function extractDayColumn(scheduleSheet, column) {
	const columnData = []

	scheduleSheet.getColumn(column).eachCell((cell, row) => {
		if (RELEVANT_COLUMN_ROWS.includes(row)) {
			const cellData = extractCellData(cell.value, row)

			columnData.push(cellData)
		}
	})

	const timeline45Min = columnData.reduce(mergeRowsTo45MinLectureBlocks, [])

	const moreThan7BlocksAreEmpty =
		timeline45Min.filter(block => block === null).length > 6

	const dayOff = moreThan7BlocksAreEmpty

	if (dayOff) {
		const dateInfoBlock = timeline45Min[0]
		const dateInfoBLockWithDayOffAdded = { ...dateInfoBlock, dayOff: true }

		const dayOffTimeline = [
			dateInfoBLockWithDayOffAdded,
			...timeline45Min.slice(1),
		]

		return dayOffTimeline
	}

	const formattedTimeline = combineSameLectureBlocks(timeline45Min)

	const timeline = addBlockTimes(formattedTimeline, TIME_SLOTS)

	return timeline
}

module.exports = extractDayColumn
