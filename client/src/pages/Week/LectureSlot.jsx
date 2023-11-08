import { useState } from 'react'

import SlotTopics from './SlotTopics'
import SlotBaseData from './SlotBaseData'

import useLectureTopicsHandlers from '@/hooks/useLectureTopicsHandlers'

import setSlotContainerStyles from '@/lib/setSlotContainerStyles'
import processLectureData from '@/lib/processLectureData'
import getSlotEndTime from '@/lib/getSlotEndTime'
import getSlotTopics from '@/lib/getSlotTopics'

//
//

export default function LectureSlot({ lectureData, date, id, screen }) {
  //
  const [hoverSlot, setHoverSlot] = useState(false)

  const { lectureTopics, createTopicHandler, deleteTopicHandler } =
    useLectureTopicsHandlers()

  //
  //

  const { subjectType, lecturer, startTime, endTime } = lectureData

  const {
    formattedLectureData: [slotStartTime, slotEndTime, slotSubject],
    slotTypes: { is45MinSlot, isPraxis, isLEK, lunchBreak },
  } = processLectureData(lectureData)

  const topicData = {
    id,
    date: date.replaceAll('.', '-'),
    startTime: startTime.replaceAll('.', '-'),
  }

  const slotTopics = getSlotTopics(lectureTopics, topicData) || []
  const topicsExist = slotTopics.length > 0

  //
  //

  const handleSlotClick = () => {
    if (isPraxis) return

    const emptyTopicOpened =
      slotTopics[slotTopics.length - 1]?.topic?.trim() === ''

    const data = { ...topicData, topic: '', unsaved: true }

    if (emptyTopicOpened) {
      deleteTopicHandler(data)
      return
    }

    createTopicHandler(data)
  }

  //
  //

  const pastSlot = new Date() > getSlotEndTime(date, endTime)
  const fadePastSlot = pastSlot ? ' opacity-100' : ''

  const slotData = {
    startTime: slotStartTime,
    endTime: slotEndTime,
    subject: slotSubject,
    subjectType,
    lecturer,
    is45MinSlot,
    isPraxis,
    isLEK,
    topicsExist,
  }

  //

  const cssContainer = setSlotContainerStyles({
    ...slotData,
    fadePastSlot,
  })

  //
  //

  return (
    <>
      {lunchBreak && (
        <div
          className={
            'text-text-3/95 mt-2 flex justify-center rounded select-none ' +
            (screen.isPortraitRatio ? 'text-md mt-3' : 'text-sm mt-2') +
            fadePastSlot
          }
        >
          <p>Mittagspause - 30 min.</p>
        </div>
      )}

      <div
        className={cssContainer}
        onClick={handleSlotClick}
        onMouseEnter={() => setHoverSlot(true)}
        onMouseLeave={() => setHoverSlot(false)}
      >
        <SlotBaseData
          data={slotData}
          screen={screen}
        />
        {topicsExist && (
          <SlotTopics
            topics={slotTopics}
            topicData={topicData}
            hoverSlot={hoverSlot}
            screen={screen}
          />
        )}
      </div>
    </>
  )
}
