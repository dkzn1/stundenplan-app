const createEvent = require('./createEvent')
const { gcal, getSubjectColorID } = require('./utils.js')

const timeout = require('../utils/timeout.js')

const pushEvents = async dayTimeline => {
	const { date, dayOff } = dayTimeline[0]

	if (dayOff) {
		const event = createEvent(dayTimeline[1], date, '8', true)
		await gcal.insertEvent(event)
		return
	}

	for (const lectureBlock of dayTimeline.slice(1)) {
		const { subjectType, subject } = lectureBlock

		const colorId = getSubjectColorID(subjectType, subject)

		const event = createEvent(lectureBlock, date, colorId)
		await gcal.insertEvent(event)
		await timeout(2)
	}
}

async function pushScheduleToGoogleCal(scheduleTimeline, updateType) {
	if (updateType === 'sameCalendarWeekUpdate') {
		const weekStartDate = scheduleTimeline.monday[0].date

		await gcal.deleteWeek(weekStartDate)
	}

	for (const day in scheduleTimeline) {
		await pushEvents(scheduleTimeline[day])
		await timeout(2)
	}
}

module.exports = pushScheduleToGoogleCal
