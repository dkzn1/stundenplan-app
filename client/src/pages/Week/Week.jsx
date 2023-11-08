import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import WeekDayColumn from './WeekDayColumn'
import Error from '../Error.jsx'

import { schedulesAtom, scheduleWeekDayAtom } from '@/atoms/schedulesAtom.js'
import useFetchSchedules from '@/hooks/useFetchSchedules'

import { DAYS } from '@/lib/constants'

//
//

export default function Week({ newSchedule, latestScheduleID, screen }) {
  //
  const { scheduleID } = useParams()
  const id = scheduleID ? scheduleID : latestScheduleID

  const [schedules, setSchedules] = useAtom(schedulesAtom)
  const [scheduleWeekDay] = useAtom(scheduleWeekDayAtom)

  const { fetchedSchedule, isLoading, isError } = useFetchSchedules(id)

  //
  //

  useEffect(() => {
    const updateSchedules = () => {
      if (newSchedule)
        setSchedules(prevSchedules => ({
          ...prevSchedules,
          ...newSchedule,
        }))
    }

    updateSchedules()
  }, [newSchedule])

  //
  //

  const schedule = id in schedules ? schedules[id] : fetchedSchedule

  if (!schedule && isLoading)
    return <div className='mx-auto'>Loading schedule...</div>

  if (isError) return <Error />

  //
  //

  const createWeekDayColumns = day => {
    return (
      <WeekDayColumn
        key={day}
        day={day}
        timeline={schedule.timeline[day]}
        id={id}
        screen={screen}
      />
    )
  }

  const dayColumns = DAYS.map(createWeekDayColumns)

  //
  //

  return (
    <div className='flex flex-row justify-center space-x-2'>
      {screen.isPortraitRatio ? dayColumns[scheduleWeekDay] : dayColumns}
    </div>
  )
}
