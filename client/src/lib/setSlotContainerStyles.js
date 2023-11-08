import setSubjectColor from './setSubjectColor'

function check45MinSlotBorderRadius(startTime, endTime) {
  //
  const noBorderRadiusTimes = ['08:45', '10:25', '14:15']

  const noTopRadius = noBorderRadiusTimes.includes(startTime)
  const noBottomRadius = noBorderRadiusTimes.includes(endTime)

  return [noTopRadius, noBottomRadius]
}

export default function setSlotContainerStyles({
  startTime,
  endTime,
  subject,
  is45MinSlot,
  isPraxis,
  subjectType,
  fadePastSlot,
}) {
  //
  const break10Min =
    !(startTime === '08:00') &&
    (!is45MinSlot || ['11:20', '12:35', '09:40', '13:30'].includes(startTime))

  const [noTopRadius45MinSlot, noBottomRadius45MinSlot] = is45MinSlot
    ? check45MinSlotBorderRadius(startTime, endTime)
    : [false, false]

  const borderRadius45MinBlocks = noBottomRadius45MinSlot
    ? ' rounded-b-none'
    : noTopRadius45MinSlot
    ? ' rounded-t-none'
    : ''

  const slotSpaceInbetween = break10Min ? ' mt-2' : ''
  const slotHeight = is45MinSlot ? ' min-h-[66px] ' : ' min-h-[132px] '
  const subjectColor = setSubjectColor(subject, subjectType)

  const styles =
    'min-w-full flex flex-col justify-center rounded-2xl border-[1px] select-none border-text-1/[12%] ' +
    borderRadius45MinBlocks +
    slotSpaceInbetween +
    slotHeight +
    subjectColor +
    fadePastSlot +
    (isPraxis ? '' : ' cursor-pointer')

  return styles
}
