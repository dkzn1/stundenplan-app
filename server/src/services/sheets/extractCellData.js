function extractCellData(cellValue, rowNumber) {
  if (cellValue === null) return null

  if (typeof cellValue === 'string') {
    const splitCellText = cellValue.split('/')
    const lecturer =
      splitCellText.length > 1 ? splitCellText[1].replace('\n', '') : null

    const lecture = {
      subject: splitCellText[0].trim(),
    }

    if (lecturer !== null) {
      const correctSpacing = lecturer.includes(', ')
      lecture.lecturer = correctSpacing ? lecturer : lecturer.replace(',', ', ')
    }

    return lecture
  }

  const cellData = cellValue.richText

  const dateRow = rowNumber === 6
  if (dateRow) {
    const dateData = {
      day: cellData[0].text.replace('\n', ''),
      date: cellData[1].text,
    }
    return dateData
  }

  const threeLinesRow = rowNumber === 9
  if (threeLinesRow) {
    const splitCellText = cellData[0].text.split('\n')

    const [subject, lecturer] =
      splitCellText.length > 2 ? splitCellText[1].split('/') : [null, null]

    const subjectFormatted = subject.startsWith('FIAE-')
      ? subject.replace('FIAE-', '')
      : subject

    const lecture = {
      subjectType: splitCellText[0],
      subject: subjectFormatted.trim(),
      lecturer,
    }

    return lecture
  }

  const halfBlockRowFirst = [11, 19].includes(rowNumber)
  if (halfBlockRowFirst) {
    const subjectType = cellData[1].text
      .replace('45 min\n', '')
      .replace('90 min\n', '')

    return { subjectType }
  }

  const halfBlockRowSecond = [12, 20].includes(rowNumber)
  if (halfBlockRowSecond) {
    const [subject, lecturer] = cellData[0].text.split('/')

    const subjectFormatted = subject.startsWith('FIAE-')
      ? subject.replace('FIAE-', '')
      : subject

    const lecture = {
      subject: subjectFormatted.trim(),
      lecturer: lecturer.replace('\n', ''),
    }

    return lecture
  }

  // remaining full data rows [7, 13, 16, 22, 24]
  const splitCellText = cellData[1].text.split('\n')

  const dayOff = splitCellText[0] === '480 min'
  if (dayOff) return { subject: splitCellText[1] }

  const lectureData =
    splitCellText.length > 2 ? splitCellText[2].split('/') : null

  const lecture = {
    subjectType: splitCellText[1],
  }

  if (lectureData !== null) {
    const subjectFormatted = lectureData[0].startsWith('FIAE-')
      ? lectureData[0].replace('FIAE-', '')
      : lectureData[0]

    lecture.subject = subjectFormatted.trim()
    lecture.lecturer = lectureData[1]
  }

  return lecture
}

module.exports = extractCellData
