import { useState } from 'react'

import { BiDownload } from 'react-icons/bi'
import { MdOutlineFormatAlignCenter } from 'react-icons/md'
import { RiMenuUnfoldFill } from 'react-icons/ri'
import { GiCycle } from 'react-icons/gi'

import usePraxisTopics from '@/hooks/usePraxisTopics'

//
//

export default function DownloadMenu({
  scheduleID,
  toggleAllPraxisTopics,
  isPortraitRatio,
}) {
  //
  const [downloadLink, setDownloadLink] = useState(null)
  const { praxisTopics, lectureTopics, fillPraxisAllTopics } = usePraxisTopics()

  //
  //

  const topics = {
    lecture: lectureTopics[scheduleID],
    praxis: praxisTopics,
  }

  const berichtsheftData = { topics, calendarWeek: scheduleID.slice(-2) }

  //
  //

  const handleFillAllClick = () => {
    toggleAllPraxisTopics('fill')
    fillPraxisAllTopics(scheduleID)
  }

  //
  //

  const generateBerichtsheft = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/berichtsheft/generate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(berichtsheftData),
        }
      )

      if (response.ok) {
        const data = await response.json()
        setDownloadLink(data.downloadLink)
      } else {
        console.error('Failed to generate file')
      }
    } catch (error) {
      console.error('Error generating file:', error)
    }
  }

  //
  //

  const cssButton =
    'bg-accent-2 hover:bg-accent-3 border-[1px] border-black/5 rounded-xl ' +
    (isPortraitRatio ? 'px-2 py-1 flex-grow ' : 'px-3 py-2 ')

  const cssButtonText =
    'leading-5 m-auto text-text-1 flex justify-center select-none '

  const cssIcon = 'h-10 w-10 m-auto text-text-1'

  //
  //

  return (
    <div className={isPortraitRatio ? 'flex ' : 'flex'}>
      <div
        className={
          'flex ' +
          (isPortraitRatio
            ? 'space-x-2 flex-grow'
            : 'basis-2/3 flex-col space-y-2')
        }
      >
        <button
          className={cssButton}
          onClick={toggleAllPraxisTopics}
        >
          <RiMenuUnfoldFill className={cssIcon} />
          <p className={cssButtonText}>praxiseinheiten toggle</p>
        </button>

        <button className={cssButton + (isPortraitRatio ? '' : 'mt-3')}>
          <MdOutlineFormatAlignCenter className={cssIcon} />
          <p
            className={cssButtonText}
            onClick={handleFillAllClick}
          >
            praxiseinheiten ausfüllen
          </p>
        </button>

        <button
          className={cssButton + (isPortraitRatio ? '' : 'mt-8')}
          onClick={generateBerichtsheft}
        >
          <GiCycle className={cssIcon + ' mb-1'} />
          <p className={cssButtonText}>berichtsheft generieren</p>
        </button>

        {downloadLink && (
          <a
            className={cssButton + (isPortraitRatio ? ' flex' : 'mt-3')}
            href={downloadLink}
            download
          >
            <BiDownload className='h-8 w-8 m-auto text-text-1' />
          </a>
        )}
      </div>
    </div>
  )
}
