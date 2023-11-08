export default function getSlotEndTime(date, endTime) {
  //
  const [endTimeDay, endTimeMonth, endTimeYear] = date.split('.')
  const endTimeMonthFormatted =
    (endTimeMonth.startsWith('0')
      ? endTimeMonth.replace('0', '')
      : endTimeMonth) - 1

  const [endTimeHours, endTimeMin] = endTime.split('.')
  const slotEndTime = new Date(endTimeYear, endTimeMonthFormatted, endTimeDay)
  slotEndTime.setHours(endTimeHours, endTimeMin)

  return slotEndTime
}
