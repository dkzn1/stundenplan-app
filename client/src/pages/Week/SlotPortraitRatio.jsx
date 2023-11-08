export default function SlotPortraitRatio({
  startTime,
  endTime,
  subject,
  formattedLecturer,
  cssTimeText,
}) {
  //
  return (
    <div className='flex space-x-6 ml-4'>
      <div className={'flex justify-center flex-col'}>
        <div className='flex items-center'>
          <p className={cssTimeText + ' h-[27px]'}>{startTime}</p>
        </div>
        <div className='flex items-center'>
          <p className={cssTimeText + ' h-[27px]'}>{endTime}</p>
        </div>
      </div>

      <div className={'flex justify-center flex-col'}>
        <p
          className={
            'flex justify-start font-mono text-base whitespace-nowrap h-[27px] font-semibold'
          }
        >
          {subject}
        </p>
        <div>
          <p className='my-auto flex font-mono justify-start whitespace-nowrap h-[23px] text-md'>
            {formattedLecturer}
          </p>
        </div>
      </div>
    </div>
  )
}
