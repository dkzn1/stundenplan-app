export default function Slot45Min({
  startTime,
  endTime,
  subject,
  is45MinSlot,
  isPraxis,
  isLEK,
  isPortraitRatio,
  formattedLecturer,
}) {
  //
  const cssBoldText =
    'font-mono font-bold' + (isPortraitRatio ? ' text-lg' : ' text-md')
  const cssContainer =
    'flex max-h-[23px] ' + (isPortraitRatio ? 'space-x-6' : 'space-x-3')

  //
  //

  if (isPraxis)
    return (
      <div className='flex flex-col justify-center'>
        <div className={cssContainer}>
          <p className={cssBoldText}>{startTime}</p>
          <span className={cssBoldText}>-</span>
          <p className={cssBoldText}>{endTime}</p>
        </div>
      </div>
    )

  //
  //

  return (
    <div className='flex flex-col justify-center items'>
      <div className={cssContainer}>
        <p className={cssBoldText}>{startTime}</p>
        <div
          className={
            isPortraitRatio
              ? 'flex items-end'
              : 'flex items-center justify-center'
          }
        >
          <p
            className={
              cssBoldText +
              (isPortraitRatio ? ' text-sm h-[80%]' : ' text-sm h-[90%]')
            }
          >
            {isLEK && is45MinSlot ? subject.slice(0, 7) + '.' : subject}
          </p>
        </div>
      </div>

      <div className={cssContainer}>
        <p className={cssBoldText}>{endTime}</p>
        <div
          className={
            isPortraitRatio
              ? 'flex items-end'
              : 'flex items-center justify-center'
          }
        >
          <p
            className={
              'font-mono ' +
              (isPortraitRatio
                ? 'text-sm h-[80%]'
                : 'flex text-xs h-[105%] mt-[2px] lg-mt-0 2xl:items-end 2xl:text-sm items-center')
            }
          >
            {formattedLecturer}
          </p>
        </div>
      </div>
    </div>
  )
}
