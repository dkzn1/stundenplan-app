export default function getCalendarWeek() {
	const today = new Date()

	today.setDate(today.getDate() + 4 - (today.getDay() || 7))

	const year = today.getFullYear()

	const calendarWeek = Math.ceil(
		((today - new Date(year, 0, 1)) / 86400000 + 1) / 7
	)

	return calendarWeek
}
