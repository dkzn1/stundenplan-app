import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

import CwSelectionDropdown from './CwSelectionDropdown'

import { schedulesAtom, scheduleWeekDayAtom } from '@/atoms/schedulesAtom.js'

import setCalendarWeekRoute from '@/lib/setCalendarWeekRoute'
import getAvailableCalendarWeeks from '@/lib/getAvailableCalendarWeeks'

//
//

export default function ScheduleNavigation({ latestScheduleID, path, screen }) {
  //
  const [schedules] = useAtom(schedulesAtom)
  const [scheduleWeekDay, setScheduleWeekDay] = useAtom(scheduleWeekDayAtom)
  const [cwDropdownOpen, setCwDropdownOpen] = useState(false)

  const navigate = useNavigate()

  const cwDropdownRef = useRef(null)

  //
  //

  const { isPortraitRatio } = screen
  const isBerichtsheftView = path.includes('berichtsheft')

  const availableCalendarWeeks = getAvailableCalendarWeeks(schedules)
  const latestCW = availableCalendarWeeks[0]?.cw

  const currentPath =
    path.length === 0 || path === '/berichtsheft'
      ? `/week/${latestScheduleID}${path}`
      : path

  const currentPathParts = currentPath.split('/').slice(1)

  const currentRouteCW = currentPathParts[1]?.slice(-2)
  const currentRouteYear = currentPathParts[1]?.slice(0, 4)

  const prevCW = parseInt(currentRouteCW) - 1
  const prevWeekRoute = setCalendarWeekRoute(prevCW, currentPathParts)

  const nextCW = parseInt(currentRouteCW) + 1
  const nextWeekRoute = setCalendarWeekRoute(nextCW, currentPathParts)

  const viewedScheduleRoute = path.includes('/berichtsheft')
    ? '/berichtsheft'
    : '/week'

  //
  //

  const toggleCwDropdown = () => setCwDropdownOpen(prev => !prev)

  //
  //

  const handlePrevNavigation = event => {
    event.preventDefault()

    if (!isPortraitRatio || isBerichtsheftView) {
      navigate(prevWeekRoute)
      return
    }

    if (scheduleWeekDay === 0) {
      navigate(prevWeekRoute)
      setScheduleWeekDay(4)
    } else {
      setScheduleWeekDay(prev => prev - 1)
    }
  }

  //
  //

  const handleNextNavigation = event => {
    event.preventDefault()

    if (!isPortraitRatio || isBerichtsheftView) {
      navigate(nextWeekRoute)
      return
    }

    if (scheduleWeekDay === 4) {
      navigate(nextWeekRoute)
      setScheduleWeekDay(0)
    } else {
      setScheduleWeekDay(prev => prev + 1)
    }
  }

  //
  //

  useEffect(() => {
    const handleClickOutsideDropdown = event => {
      if (
        cwDropdownRef.current &&
        !cwDropdownRef.current.contains(event.target)
      ) {
        setCwDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutsideDropdown)

    return () => {
      document.removeEventListener('click', handleClickOutsideDropdown)
    }
  }, [])

  useEffect(() => {
    const currentDayNum = new Date().getDay()

    if (currentDayNum === 0 || currentDayNum === 6) {
      setScheduleWeekDay(0)
    } else {
      setScheduleWeekDay(currentDayNum - 1)
    }
  }, [])

  //
  //

  const cssLinkButton = isPortraitRatio
    ? 'basis-1/4 my-auto font-mono font-bold bg-accent-2 rounded-lg hover:bg-accent-3 text-text-1 h-[50px]'
    : 'my-auto font-mono font-bold bg-accent-2 rounded-lg hover:bg-accent-3 text-text-1 h-[40px]'

  const cssIcon =
    'mx-auto h-[50px] w-[58px] mx-auto p-3 fill-current text-text-1'
  const cssIconButton = ' flex items-center justify-center'

  const cssButtonDisabled = ' pointer-events-none opacity-50 cursor-not-allowed'

  const prevDisabledCondition =
    prevCW < 7 &&
    (!isPortraitRatio ||
      (isPortraitRatio && scheduleWeekDay === 0) ||
      isBerichtsheftView)
  const disabledButtonPrev = prevDisabledCondition ? cssButtonDisabled : ''

  const nextDisabledCondition =
    nextCW > latestCW &&
    (!isPortraitRatio ||
      (isPortraitRatio && scheduleWeekDay === 4) ||
      isBerichtsheftView)
  const disabledButtonNext = nextDisabledCondition ? cssButtonDisabled : ''

  const cssCwAndYearDisplay = isPortraitRatio
    ? 'basis-1/4 flex h-[60px] rounded-xl bg-accent-2 select-none '
    : 'flex m-auto max-h-[56px] min-w-[105px] rounded-xl bg-accent-2 select-none '
  const cssCwAndYearText =
    'text-text-1 m-auto py-2 sm:text-xl lg:text-2xl font-bold'

  //
  //

  const calendarWeekDropdown = (
    <div
      className={
        cssCwAndYearDisplay + ' relative cursor-pointer hover:bg-accent-3'
      }
      ref={cwDropdownRef}
      onClick={toggleCwDropdown}
    >
      <p className={cssCwAndYearText}>KW{currentRouteCW}</p>
      {cwDropdownOpen && (
        <CwSelectionDropdown
          calendarWeeks={availableCalendarWeeks}
          splitPath={currentPathParts}
          isPortraitRatio={isPortraitRatio}
        />
      )}
    </div>
  )

  const dateElements = (
    <div className={cssCwAndYearDisplay}>
      <p className={cssCwAndYearText}>{currentRouteYear}</p>
    </div>
  )

  const prevElement = (
    <Link
      className={cssLinkButton + cssIconButton + disabledButtonPrev}
      onClick={handlePrevNavigation}
    >
      <MdNavigateBefore className={cssIcon} />
    </Link>
  )

  const nextElement = (
    <Link
      className={cssLinkButton + cssIconButton + disabledButtonNext}
      onClick={handleNextNavigation}
    >
      <MdNavigateNext className={cssIcon} />
    </Link>
  )

  //
  //

  const portraitView = (
    <div className='flex justify-center space-x-2'>
      {prevElement}
      {dateElements}
      {calendarWeekDropdown}
      {nextElement}
    </div>
  )

  const landscapeView = (
    <div className='basis-2/4 flex justify-center space-x-2 px-[40px] xl:px-[81px] 3xl:px-24'>
      {!isPortraitRatio && (
        <Link
          to={viewedScheduleRoute}
          className={cssLinkButton + ' flex h-[40px]'}
        >
          <p className='m-auto px-3 h-[18px] select-none sm:text-sm lg:text-md whitespace-nowrap'>
            aktuelle kw
          </p>
        </Link>
      )}
      {dateElements}
      {calendarWeekDropdown}
      {prevElement}
      {nextElement}
    </div>
  )

  //
  //

  return isPortraitRatio ? portraitView : landscapeView
}
