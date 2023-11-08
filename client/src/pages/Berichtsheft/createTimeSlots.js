export default function createTimeSlots(timeline, day, topics, index) {
  //
  const date = topics && Object.keys(topics).toSorted()[index]

  const timeSlots = timeline[day].reduce((result, slot, index) => {
    if (index === 0) return result
    const { startTime } = slot

    const formattedStartTime = startTime.replace('.', '-')

    result[formattedStartTime] =
      date && formattedStartTime in topics[date]
        ? topics[date][formattedStartTime]
        : []

    return result
  }, {})

  return timeSlots
}
