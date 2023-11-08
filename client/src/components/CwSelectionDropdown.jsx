import { useAtom } from 'jotai'
import { Link } from 'react-router-dom'

import { scheduleWeekDayAtom } from '@/atoms/schedulesAtom.js'

import { splitIntoSubarrays } from '@/utils/splitIntoSubarrays'
import setCalendarWeekRoute from '@/lib/setCalendarWeekRoute'

//
//

export default function cwSelectionDropdown({
  calendarWeeks,
  splitPath,
  isPortraitRatio,
}) {
  //
  const calendarWeekRows = splitIntoSubarrays(calendarWeeks, 5)
  const [, setScheduleWeekDay] = useAtom(scheduleWeekDayAtom)

  const resetWeekDay = event => {
    setScheduleWeekDay(0)
  }

  //
  //

  const createLinkRows = rowData => {
    return (
      <Link
        key={rowData.cw}
        to={setCalendarWeekRoute(rowData.cw, splitPath)}
        className={
          'hover:text-text-1/50 text-text-1 font-semibold ' +
          (isPortraitRatio ? 'text-lg' : '')
        }
        onClick={resetWeekDay}
      >
        <p className='py-[9px] px-[12px]'>KW{rowData.cw}</p>
      </Link>
    )
  }

  //
  //

  const createLinkColumns = (row, index) => {
    return (
      <div
        key={index}
        className=''
      >
        {row.map(createLinkRows)}
      </div>
    )
  }

  //
  //

  return (
    <div
      className={
        'absolute p-2 bg-accent-2 shadow-md rounded-xl z-10 flex ' +
        (isPortraitRatio ? 'top-full mt-2' : 'left-full ml-2')
      }
    >
      {calendarWeekRows.map(createLinkColumns)}
    </div>
  )
}
