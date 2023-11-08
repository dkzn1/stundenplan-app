import { SiMysql } from 'react-icons/si'
import { GiNightSleep } from 'react-icons/gi'
import { FaGraduationCap, FaPython } from 'react-icons/fa'
import { BiNetworkChart } from 'react-icons/bi'

//
//
export default function SubjectIcon({ subject, type, isPortraitRatio }) {
  //
  const cssSlot =
    'pr-2 py-1 h-14 w-14 2xl:h-16 2xl:w-16 ' +
    (isPortraitRatio ? '' : 'max-xl:hidden')
  const cssRow = 'h-[22px] w-[22px] my-auto ml-2'
  const cssSubject = type === 'row' ? cssRow : cssSlot

  const icons = {
    'AnwP-Python T2': <FaPython className={cssSubject} />,
    'ITT-Net': <BiNetworkChart className={cssSubject} />,
    'AnwP-DBSQL': <SiMysql className={cssSubject} />,
    'BGP-MuKb': <GiNightSleep className={cssSubject} />,
    Praxis: '',
  }

  if (!(subject in icons)) return <FaGraduationCap className={cssSubject} />

  return icons[subject]
}
