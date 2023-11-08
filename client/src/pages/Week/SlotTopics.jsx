import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'
import useLectureTopicsHandlers from '@/hooks/useLectureTopicsHandlers'

import { topicUpdateAtom } from '@/atoms/lectureTopicsAtoms.js'
import slotTopicsHandlers from './slotTopicsHandlers'

//
//

export default function SlotTopics({ topics, topicData, hoverSlot }) {
  //
  const [slotTopics, setSlotTopics] = useState(topics)
  const [, setTopicUpdate] = useAtom(topicUpdateAtom)
  const [hoverTopicIndex, setHoverTopicIndex] = useState(false)

  const lectureTopicsHandlers = useLectureTopicsHandlers()

  const inputRefs = useRef([])
  inputRefs.current = []

  //
  //

  const handlers = slotTopicsHandlers(
    topicData,
    lectureTopicsHandlers,
    setTopicUpdate,
    hoverSlot
  )

  //
  //

  const setInputRef = element => {
    const refsArray = inputRefs.current

    if (element && !refsArray.includes(element) && element.value === '')
      refsArray.push(element)

    refsArray[refsArray.length - 1]?.focus()
  }

  //
  //

  useEffect(() => {
    setSlotTopics(topics)
  }, [topics])

  //
  //

  const slotTopicsElements = !slotTopics
    ? ''
    : slotTopics.map((slotTopic, index) => {
        const topic = slotTopic?.topic
        const isUnsaved = slotTopic?.unsaved

        return (
          <div
            className={
              'rounded-md flex justify-between py-1 px-3 my-1 space-x-1 hover:bg-black/10 bg-black/5 relative' +
              (isUnsaved
                ? ' border-[1px] border-black/60'
                : 'bg-black/5 border-[1px] border-black/0')
            }
            key={index}
            onClick={event => event.stopPropagation()}
          >
            <input
              className='bg-black/0 w-full focus:outline-none placeholder-black/40'
              placeholder='themen...'
              value={topic ? topic : ''}
              ref={setInputRef}
              onChange={event => handlers.handleInput(event, topic, index)}
              onBlur={() => handlers.closeTopic(topic)}
              onMouseEnter={() => setHoverTopicIndex(index)}
              onMouseLeave={() => setHoverTopicIndex(false)}
              onKeyDown={event => handlers.enterKeySave(event, index, topic)}
            />
            {isUnsaved && topic?.trim().length > 0 && (
              <IoIosCheckmarkCircle
                className='my-auto w-[28px] h-[28px] hover:opacity-50'
                onClick={event => handlers.saveTopic(event, index, topic)}
              />
            )}
            <MdCancel
              onClick={event => handlers.deleteTopic(event, index, topic)}
              className='my-auto w-[28px] h-[28px] hover:opacity-50'
            />
            {hoverTopicIndex === index && topic && topic.length > 25 && (
              <div className='bg-gray-800 text-white right-[0px] bottom-10 px-2 border-[1px] border-gray-200 rounded-lg absolute w-[214px] z-40 shadow-md opacity-[93%]'>
                <p>{topic}</p>
              </div>
            )}
          </div>
        )
      })

  return <form className='px-8 pt-2 pb-3'>{slotTopicsElements}</form>
}
