import { MdLightMode } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

//
//

export default function Menu({ path, screen }) {
  //
  const [theme, setTheme] = useState('dark')

  const { pathname } = useLocation()

  const isBerichtsheftView = pathname.includes('berichtsheft')
  const isWeekView = !isBerichtsheftView

  const pathBerichtsheftView = path.includes('/berichtsheft')
    ? path
    : `${path}/berichtsheft`

  const pathWeekView =
    path.length === 0 || path === '/berichtsheft'
      ? `/week`
      : path.replace('/berichtsheft', '')

  const handleThemeToggle = () => {
    setTheme(prev => {
      if (prev === 'dark') return 'light'

      return 'dark'
    })
  }

  //
  //

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  //
  //

  const { isPortraitRatio } = screen

  const cssLink =
    'hover:text-rose-400 rounded-lg text-text-1 outline-none ' +
    (isPortraitRatio
      ? 'px-4  h-[34px]  text-lg'
      : 'px-2 my-auto text-base  h-[28px]')

  const cssContainer = isPortraitRatio
    ? 'flex flex-row space-x-2 justify-center mt-2 mb-5'
    : 'basis-1/4 flex list-none flex-row justify-start portrait:justify-center space-x-2'

  //
  //

  return (
    <ul className={cssContainer}>
      <li className={cssLink + (isWeekView ? ' bg-accent-3 ' : '')}>
        <Link to={pathWeekView}>wochenplan</Link>
      </li>
      <li className={cssLink + (isBerichtsheftView ? ' bg-accent-3 ' : '')}>
        <Link to={pathBerichtsheftView}>berichtsheft</Link>
      </li>
      <li className={cssLink}>
        <button
          onClick={handleThemeToggle}
          className={
            'flex flex-row' + (!isPortraitRatio ? ' mt-1 2xl:mt-0' : '')
          }
        >
          <MdLightMode className='m-auto' />
          <p
            className={
              'px-1 m-auto whitespace-nowrap' +
              (!isPortraitRatio ? ' hidden 2xl:block' : '')
            }
          >{`${theme == 'dark' ? 'light' : 'dark'} mode`}</p>
        </button>
      </li>
    </ul>
  )
}
