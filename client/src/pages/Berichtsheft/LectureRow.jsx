import { useEffect } from 'react'
import { useAtom } from 'jotai'

import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'

import SubjectIcon from '@/components/SubjectIcon'

import { topicUpdateAtom } from '@/atoms/lectureTopicsAtoms.js'
import { localDayTopicsAtom } from '@/atoms/localDayTopicsAtom'
import useLectureTopicsHandlers from '@/hooks/useLectureTopicsHandlers'

import timeout from '@/utils/timeout'
import getSlotTopics from '@/lib/getSlotTopics'
import removeSpecialChars from '@/utils/removeSpecialChars'

//
//

export default function LectureRow({
  subjectColor,
  index,
  date,
  lectureSubject,
  id,
  timeSlots,
}) {
  //
  const [localDayTopics, setLocalDayTopics] = useAtom(localDayTopicsAtom)
  const [, setTopicUpdate] = useAtom(topicUpdateAtom)

  const {
    lectureTopics,
    createTopicHandler,
    deleteTopicHandler,
    deleteAllTopicsHandler,
  } = useLectureTopicsHandlers()

  //
  //

  const timeSlot = Object.keys(timeSlots)[index]
  const rowId = `${date}-${timeSlot}`

  const topicData = {
    id,
    date: date.replaceAll('.', '-'),
    startTime: timeSlot,
  }
  const localTopics = getSlotTopics(lectureTopics, topicData)

  const dayTopics = localTopics ? localTopics : timeSlots[timeSlot]

  const rowExists =
    id in localDayTopics &&
    date in localDayTopics[id] &&
    rowId in localDayTopics[id][date]

  const timeSlotTopics = rowExists
    ? localDayTopics[id][date][rowId].inputValue
    : dayTopics?.length > 0
    ? dayTopics.map(topic => topic.topic).join(', ')
    : false

  const mergedTopics = timeSlotTopics ? timeSlotTopics : ''

  const addedTopic = removeSpecialChars(
    mergedTopics.replace(timeSlots[timeSlot].join(', ').trim(), '')
  )
  const isNotEmpty = mergedTopics.length > 0

  const maxChars = 45

  //
  //

  const handleTopicInput = event => {
    const input = event.target
    const inputValue = input.value
    const charCount = inputValue.length

    if (charCount <= maxChars) {
      setLocalDayTopics(prev => {
        const updatedLocalDayTopics = { ...prev }
        updatedLocalDayTopics[id][date][rowId] = { inputValue, unsaved: true }
        return updatedLocalDayTopics
      })
    }
  }

  //
  //

  const handleSaveTopic = async () => {
    if (mergedTopics.trim() === timeSlots[timeSlot].join(', ').trim()) return

    const data = { ...topicData, topic: addedTopic }

    setLocalDayTopics(prev => {
      const updatedLocalDayTopics = { ...prev }
      updatedLocalDayTopics[id][date][rowId].unsaved = false
      return updatedLocalDayTopics
    })

    deleteAllTopicsHandler(topicData)
    setTopicUpdate({ type: 'delete_all_topics', data })

    await timeout(1)

    createTopicHandler(data)
    setTopicUpdate({ type: 'topic_event', data })
  }

  //
  //

  const handleDeleteTopic = event => {
    const data = { ...topicData, topic: addedTopic }

    deleteTopicHandler(data)
    setTopicUpdate({ type: 'delete_topic', data })

    setLocalDayTopics(prev => {
      const updatedLocalDayTopics = { ...prev }
      delete updatedLocalDayTopics[id][date][rowId]
      return updatedLocalDayTopics
    })
  }

  //
  //

  useEffect(() => {
    setLocalDayTopics(prev => {
      const updatedLocalDayTopics = { ...prev }

      if (!(id in updatedLocalDayTopics)) updatedLocalDayTopics[id] = {}
      if (!(date in updatedLocalDayTopics[id]))
        updatedLocalDayTopics[id][date] = {}

      const topic = {
        inputValue: '',
        unsaved: false,
      }
      if (dayTopics?.length > 0)
        topic.inputValue = dayTopics.map(topic => topic.topic).join(', ')

      updatedLocalDayTopics[id][date][rowId] = topic

      return updatedLocalDayTopics
    })
  }, [])

  //
  //

  const isUnsaved =
    rowExists &&
    localDayTopics[id][date][rowId]?.unsaved &&
    localDayTopics[id][date][rowId]?.inputValue.trim().length > 0

  //
  //

  return (
    <div className='flex m-auto'>
      <div
        className={
          'basis-1/5 flex opacity-90 justify-end mr-2 rounded-lg pr-2 border-[1px] border-text-1/10 min-w-[145px] ' +
          subjectColor
        }
      >
        <p className='my-auto xl:font-semibold text-xs whitespace-nowrap'>
          {lectureSubject.length > 11
            ? lectureSubject.slice(0, 11)
            : lectureSubject}
        </p>

        {
          <SubjectIcon
            subject={lectureSubject}
            type={'row'}
          />
        }
      </div>

      <div
        className={
          'rounded-md flex basis-4/5 justify-between py-1 pl-3 pr-2 space-x-1 hover:bg-accent-2 bg-accent-1 relative' +
          (isUnsaved
            ? ' border-[1px] border-text-1/50'
            : ' border-[1px] border-text-1/5')
        }
      >
        <input
          type='text'
          className='bg-gray-200/0 w-full text-text-1 focus:outline-none placeholder-text-1/40 min-h-[28px]'
          value={mergedTopics}
          onChange={handleTopicInput}
        />

        {isUnsaved && (
          <IoIosCheckmarkCircle
            className='w-[28px] h-[28px] text-text-3 hover:opacity-50 cursor-pointer'
            onClick={handleSaveTopic}
          />
        )}

        {isNotEmpty && (
          <MdCancel
            onClick={event => handleDeleteTopic(event)}
            className='my-auto w-[28px] text-text-3 h-[28px] hover:opacity-50 cursor-pointer'
          />
        )}
      </div>
    </div>
  )
}
