import { useEffect, useState } from 'react'

import LectureRow from './LectureRow'
import PraxisRow from './PraxisRow'

import setSubjectColor from '@/lib/setSubjectColor'
import createPraxisUnitsArray from './createPraxisUnitsArray'

//
//

export default function DayBlock({
  dayData,
  timeSlots,
  lectureSubjects,
  id,
  index,
  allPraxisVisible,
  isPortraitRatio,
}) {
  //
  const [praxisIsVisible, setPraxisIsVisible] = useState(false)

  const { day, date } = dayData[0]
  const { dayOff } = dayData[0]

  //
  //

  const togglePraxisVisibility = () => {
    setPraxisIsVisible(prev => !prev)
  }

  //
  //

  useEffect(() => {
    setPraxisIsVisible(allPraxisVisible)
  }, [allPraxisVisible])

  //
  //

  const createLectureRows = (_subject, index) => {
    return (
      <LectureRow
        key={index}
        subjectColor={setSubjectColor(lectureSubjects[index])}
        index={index}
        date={date}
        lectureSubject={lectureSubjects[index]}
        id={id}
        timeSlots={timeSlots}
      />
    )
  }

  const praxisUntis = createPraxisUnitsArray(lectureSubjects.length)

  const createPraxisRows = (_, index) => {
    return (
      <PraxisRow
        key={index}
        index={index}
        date={date}
      />
    )
  }

  //
  //

  const cssDate =
    'text-text-1 w-fit m-auto text-md xl:text-lg 2xl:text-xl font-semibold'

  //
  //

  return (
    <div>
      <div
        className={
          'flex bg-gray-100/0 rounded-2xl ' +
          (isPortraitRatio ? 'pb-4 flex-col' : 'pl-10 pb-4') +
          (index === 0 ? '' : ' pt-4')
        }
      >
        <div
          className={
            'w-full basis-1/6  border-[1px] border-text-1/5 rounded-xl mr-2 flex select-none' +
            (!dayOff ? ' cursor-pointer' : '') +
            (isPortraitRatio
              ? ' mb-2 bg-accent-2 hover:bg-accent-3'
              : ' bg-accent-1 hover:bg-accent-2')
          }
          onClick={togglePraxisVisibility}
        >
          <div
            className={
              'm-auto px-2 ' +
              (isPortraitRatio ? 'flex flex-row space-x-2 py-3' : 'py-2')
            }
          >
            <h1 className={cssDate}>{day}</h1>
            <h1 className={cssDate}>{date}</h1>

            {dayOff && (
              <p className='text-text-1 w-fit m-auto font-light'>
                {dayData[1].subject}
              </p>
            )}
          </div>
        </div>

        <div className='w-full basis-5/6 space-y-2 m-auto'>
          {lectureSubjects.map(createLectureRows)}
        </div>
      </div>

      {!dayOff && praxisIsVisible && (
        <div className={'flex ' + (isPortraitRatio ? 'pb-4' : 'pl-10 pb-4')}>
          {!isPortraitRatio && (
            <div className='min-w-[120.45px] basis-1/6 mr-2'></div>
          )}

          <div
            className={
              'w-full m-auto space-y-2 ' + (isPortraitRatio ? '' : 'basis-5/6 ')
            }
          >
            {praxisUntis.map(createPraxisRows)}
          </div>
        </div>
      )}
    </div>
  )
}
