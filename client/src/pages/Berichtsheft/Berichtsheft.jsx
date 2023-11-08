import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAtom } from 'jotai'

import DayBlock from './DayBlock'
import DownloadMenu from './DownloadMenu'
import Error from '../Error.jsx'

import { schedulesAtom } from '@/atoms/schedulesAtom'
import useFetchSchedules from '@/hooks/useFetchSchedules'

import createLectureSubjects from './createLectureSubjects'
import extractIdFromPath from './extractIdFromPath'
import createTimeSlots from './createTimeSlots'

import { DAYS } from '@/lib/constants'

//
//

export default function Berichtsheft({ latestScheduleID, screen }) {
  //
  const [schedules] = useAtom(schedulesAtom)
  const [allPraxisVisible, setAllPraxisVisible] = useState(false)

  const { pathname: path } = useLocation()

  //
  //

  const id = ['/', '/week', '/berichtsheft'].includes(path)
    ? latestScheduleID
    : extractIdFromPath(path)

  const { fetchedSchedule, isLoading, isError } = useFetchSchedules(id)

  if (!schedules[id] && isLoading)
    return <div className='mx-auto'>Loading schedule...</div>

  if (isError) return <Error />

  //
  //

  const toggleAllPraxisTopics = (type = null) => {
    if (type === 'fill' && allPraxisVisible) return

    setAllPraxisVisible(prev => !prev)
  }

  //
  //

  const createDayBlocks = (day, index) => {
    const { topics, timeline } =
      id in schedules ? schedules[id] : fetchedSchedule

    const lectureSubjects = createLectureSubjects(timeline[day])

    const isDayOff = timeline[day][0].dayOff
    const timeSlots = isDayOff
      ? {}
      : createTimeSlots(timeline, day, topics, index)

    return (
      <DayBlock
        key={index}
        id={id}
        index={index}
        dayData={timeline[day]}
        timeSlots={timeSlots}
        lectureSubjects={lectureSubjects}
        allPraxisVisible={allPraxisVisible}
        isPortraitRatio={screen.isPortraitRatio}
      />
    )
  }

  //
  //

  const landscapeView = (
    <div className='flex min-w-[1134px] xl:min-w-[1234px] 2xl:min-w-[1434px]'>
      <div className='basis-1/6'>
        <DownloadMenu
          scheduleID={id}
          toggleAllPraxisTopics={toggleAllPraxisTopics}
          isPortraitRatio={screen.isPortraitRatio}
        />
      </div>
      <div className='basis-5/6 m-auto rounded-2xl'>
        {DAYS.map(createDayBlocks)}
      </div>
    </div>
  )

  const portraitView = (
    <div className='flex flex-col'>
      <div className='mb-6'>
        <DownloadMenu
          scheduleID={id}
          toggleAllPraxisTopics={toggleAllPraxisTopics}
          isPortraitRatio={screen.isPortraitRatio}
        />
      </div>
      <div className='rounded-2xl'>{DAYS.map(createDayBlocks)}</div>
    </div>
  )

  return screen.isPortraitRatio ? portraitView : landscapeView
}
