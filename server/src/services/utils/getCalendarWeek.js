function getCalendarWeek(dateStr) {
  const parts = dateStr.split('.')
  const year = parseInt(parts[2], 10)
  const month = parseInt(parts[1], 10) - 1
  const day = parseInt(parts[0], 10)

  const date = new Date(year, month, day)

  const oneJan = new Date(date.getFullYear(), 0, 1)
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000))
  const calendarWeek = Math.ceil((date.getDay() + 1 + numberOfDays) / 7)

  return calendarWeek
}

module.exports = { getCalendarWeek }
