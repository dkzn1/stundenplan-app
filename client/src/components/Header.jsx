import { useLocation } from 'react-router-dom'

import Menu from './Menu'
import ScheduleNavigation from './ScheduleNavigation'
import Logo from './Logo'

//
//

export default function Header({ latestScheduleID, screen }) {
  //
  const { pathname } = useLocation()
  const isBerichtsheftView = pathname.includes('berichtsheft')

  const path = ['/', '/week'].includes(pathname) ? '' : pathname
  const isError = pathname === '/404'

  const { isPortraitRatio } = screen

  return (
    !isError && (
      <div
        className={
          'flex my-8 portrait:mt-4 portrait:mb-6 justify-center 2xl:justify-between ' +
          (isPortraitRatio ? 'flex-col' : 'flex-row')
        }
      >
        <Menu
          path={path}
          screen={screen}
        />
        <ScheduleNavigation
          latestScheduleID={latestScheduleID}
          path={path}
          screen={screen}
        />
        {!isPortraitRatio && <Logo />}
      </div>
    )
  )
}
