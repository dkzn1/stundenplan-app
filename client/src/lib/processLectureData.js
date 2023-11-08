export default function processLectureData({
  startTime,
  endTime,
  subject,
  blockType,
  subjectType,
}) {
  //
  const formatTime = time => {
    const doubleDigitHourTime = time.length === 4 ? 0 + time : time
    return doubleDigitHourTime.replace('.', ':')
  }

  const formattedStartTime = formatTime(startTime)
  const formattedEndTime = formatTime(endTime)

  const formattedSubject = subject?.startsWith('FIAE-')
    ? subject.replace('FIAE-', '')
    : !subject
    ? 'Praxis'
    : subject === 'Verfügungsstunde Mentor'
    ? 'Mentor'
    : subject

  const formattedLectureData = [
    formattedStartTime,
    formattedEndTime,
    formattedSubject,
  ]

  const slotTypes = {
    is45MinSlot: blockType === '45 min',
    isPraxis: formattedSubject === 'Praxis',
    isLEK: subjectType === 'LEK/Prüfung',
    lunchBreak: formattedStartTime === '12:35',
  }

  return { formattedLectureData, slotTypes }
}
