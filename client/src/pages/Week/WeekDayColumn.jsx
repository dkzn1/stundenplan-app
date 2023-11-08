import LectureSlot from './LectureSlot'

//
//

export default function WeekDayColumn({ day, timeline, id, screen }) {
  //
  const { date } = timeline[0]
  const lecetureSlots = timeline.slice(1)

  const dayOff = timeline[0]?.dayOff

  //
  //

  const createLectureSlots = (slot, idx) => {
    return (
      <LectureSlot
        key={idx}
        lectureData={slot}
        date={date}
        id={id}
        screen={screen}
      />
    )
  }

  //
  //

  const cssColumnWidth = screen.isPortraitRatio
    ? 'w-full'
    : 'w-[210px] lg:w-[220px] xl:w-[240px] 2xl:w-[260px] 3xl:w-[280px]'

  const cssDate = screen.isPortraitRatio
    ? 'text-text-2 text-lg'
    : 'text-text-2 text-sm 2xl:text-base'

  //
  //

  return (
    <div className={'relative ' + cssColumnWidth}>
      <div className='flex justify-center space-x-3 mb-2 2xl:w-[260px] 3xl:w-[280px]'>
        <p className={cssDate + ' uppercase'}>{day}</p>
        <p className={cssDate + ' font-semibold'}>{date}</p>
      </div>
      {dayOff ? (
        <div className='flex flex-col'>
          <p className='text-md mx-auto font-bold text-text-3'>
            {timeline[1].subject}
          </p>
        </div>
      ) : (
        <div className='flex flex-col'>
          {lecetureSlots.map(createLectureSlots)}
        </div>
      )}
    </div>
  )
}
