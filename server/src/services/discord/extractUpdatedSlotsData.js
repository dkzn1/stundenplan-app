const { readFileSync } = require('fs')

const createDayData = (newDayData, oldDayData) => {
  const sameLength = newDayData.length === oldDayData.length

  if (sameLength) {
    return { newDayData, oldDayData }
  }

  const formatDayData = (dayData, newDay = false) => {
    dayData.forEach((newSlot, idx) => {
      const otherData = newDay ? oldDayData[idx] : newDayData[idx]

      if (
        idx < dayData.length - 1 &&
        newSlot?.blockType !== otherData?.blockType
      ) {
        const updatedDayData = dayData
        const combinedSlot = { ...updatedDayData[idx] }
        const nextSlot = updatedDayData[idx + 1]

        const subjectCombined = combinedSlot.subject
          ? combinedSlot.subject + ' + '
          : ''
        const lecturerCombined = combinedSlot.lecturer
          ? combinedSlot.lecturer + ' + '
          : ''

        const subjectNext = nextSlot.subject ? nextSlot.subject : ''
        const lecturerNext = nextSlot.lecturer ? nextSlot.lecturer : ''

        combinedSlot.subjectType = 'Combined'
        combinedSlot.subject = subjectCombined + subjectNext
        combinedSlot.lecturer = lecturerCombined + lecturerNext
        combinedSlot.endTime = nextSlot.endTime

        updatedDayData[idx] = combinedSlot
        updatedDayData.splice(idx + 1, 1)

        return {
          newDayData: newDay ? updatedDayData : newDayData,
          oldDayData: newDay ? oldDayData : updatedDayData,
        }
      }
    })
  }

  if (newDayData.length > oldDayData.length) {
    formatDayData(newDayData, true)
  } else {
    formatDayData(oldDayData)
  }

  return { newDayData, oldDayData }
}

function extractUpdatedSlotsData(updatedScheduleData, pathOldScheduleData) {
  const oldScheduleData = JSON.parse(readFileSync(pathOldScheduleData))

  const scheduleDays = Object.keys(updatedScheduleData)

  const createUpdates = (updatesResult, day) => {
    const dateSlot = updatedScheduleData[day][0]

    if (dateSlot?.dayOff) return updatesResult

    const date = `${dateSlot.day} - ${dateSlot.date}`.trim()

    const { newDayData, oldDayData } = createDayData(
      updatedScheduleData[day].slice(1),
      oldScheduleData[day].slice(1)
    )

    const createDayUpdates = (dayUpdatesResult, newSlot, idx) => {
      const oldSlot = oldDayData[idx]

      for (const key in newSlot) {
        const changedData = !(key in oldSlot) || newSlot[key] !== oldSlot[key]
        if (changedData) {
          const updateData = {
            date,
            oldSlot,
            newSlot,
          }

          dayUpdatesResult.push(updateData)
          break
        }
      }

      return dayUpdatesResult
    }

    const dayUpdates = newDayData.reduce(createDayUpdates, [])

    if (dayUpdates.length > 0) updatesResult = [...updatesResult, ...dayUpdates]

    return updatesResult
  }

  const updates = scheduleDays.reduce(createUpdates, [])

  const updatesInText = updates.map(update => {
    const sameTime =
      update.newSlot.startTime === update.oldSlot.startTime &&
      update.newSlot.endTime === update.oldSlot.endTime

    const oldData =
      update.oldSlot.subjectType === 'Praxisunterricht'
        ? `Praxisunterricht`
        : `${update?.oldSlot?.subject} / ${update?.oldSlot?.lecturer.trim()}`

    const newData =
      update.newSlot.subjectType === 'Praxisunterricht'
        ? `Praxisunterricht`
        : `${update?.newSlot?.subject} / ${update?.newSlot?.lecturer.trim()}`

    const text = `
**${update.date}**

**${
      sameTime &&
      update.newSlot.startTime.replace('.', ':') +
        '-' +
        update.newSlot.endTime.replace('.', ':')
    } Uhr**
${oldData} ---> ${newData}
`

    return text
  })

  return updatesInText.join(`
`)
}

module.exports = extractUpdatedSlotsData
