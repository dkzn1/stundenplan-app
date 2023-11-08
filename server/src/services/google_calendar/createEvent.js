function setEventTime(date, startTime, endTime) {
	const [day, month, year] = date.split('.')

	const changeTimeFormat = time => {
		const gcalFormatDate = `${year}-${month}-${day}`

		if (!time) return gcalFormatDate

		const [hour, minutes] = time.split('.')

		const gcalFormatTime = `T${hour}:${minutes}:00.00`

		const gcalFullDate = gcalFormatDate + gcalFormatTime

		return gcalFullDate
	}

	if (!startTime) return changeTimeFormat(false)

	return {
		start: changeTimeFormat(startTime),
		end: changeTimeFormat(endTime),
	}
}

function createEvent(lectureBlock, date, colorId, dayOff = false) {
	const { startTime, endTime, subjectType, subject, lecturer } = lectureBlock

	const eventTime = setEventTime(date, startTime, endTime)

	const subjectFormatted = `${subject ? '[' + subject + ']' : ''}`
	const lecturerFormatted = `${lecturer ? ' —' + lecturer + ' — ' : ''}`
	const eventName = !dayOff
		? `${subjectFormatted}${lecturerFormatted}${subjectType}`
		: subject

	const event = {
		summary: eventName,
		description: ``,
		start: {
			timeZone: 'Europe/Berlin',
		},
		end: {
			timeZone: 'Europe/Berlin',
		},
		colorId: subjectType === 'LEK/Prüfung' ? '11' : colorId,
	}

	if (dayOff) {
		event.start.date = eventTime
		event.end.date = eventTime
	} else {
		event.start.dateTime = eventTime.start
		event.end.dateTime = eventTime.end
	}

	return event
}

module.exports = createEvent
