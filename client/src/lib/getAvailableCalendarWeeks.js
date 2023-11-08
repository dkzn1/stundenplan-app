export default function getAvalailableCalendarWeeks(schedules) {
  //
  return Object.keys(schedules)
    .map(schedule => ({
      year: schedule.slice(0, 4),
      cw: schedule.slice(-2),
    }))
    .sort((a, b) => b.cw.localeCompare(a.cw))
}
