import { useAtom } from 'jotai'
import { useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'

import useLectureTopicsHandlers from '@/hooks/useLectureTopicsHandlers'
import { topicUpdateAtom } from '@/atoms/lectureTopicsAtoms.js'

//
//

export default function TopicInput({
  berichtsheft,
  topic,
  setInputRef,
  handleInput,
  index,
  topicData,
  hoverSlot,
}) {
  //
  const local = true

  const [updateType, setUpdateType] = useState({})
  const [, setTopicUpdate] = useAtom(topicUpdateAtom)

  const { deleteLectureTopic } = useLectureTopicsHandlers()

  //
  //

  const handleSaveTopic = (_event, index, topic) => {
    const data = { ...topicData, index, topic: topic.trim() }

    const type =
      updateType && index in updateType ? 'update_topic' : 'create_topic'
    setTopicUpdate({ type, data })

    if (type === 'update_tpye')
      setUpdateType(prev => {
        const updated = { ...prev }
        delete updated[index]
        return updated
      })
  }

  //
  //

  const handleDeleteTopic = (_event, topic) => {
    const data = { ...topicData, topic: topic.trim() }

    deleteLectureTopic(data, local)
    setTopicUpdate({ type: 'delete_topic', data })
  }

  //
  //

  const handleCloseTopic = topic => {
    if (berichtsheft) return

    if (topic.trim() === '' && !hoverSlot) {
      const data = { ...topicData, topic: topic.trim() }
      deleteLectureTopic(data, local)
    }
  }

  //
  //

  return (
    <div className='flex'>
      <input
        className='bg-black/0 w-full focus:outline-none placeholder-black/40'
        placeholder='themen...'
        value={topic}
        ref={setInputRef}
        onChange={event => handleInput(event, topic, index)}
        onBlur={() => handleCloseTopic(topic)}
      />
      {topic.trim().length > 0 && (
        <IoIosCheckmarkCircle
          className='my-auto w-[28px] h-[28px] hover:opacity-50'
          onClick={event => handleSaveTopic(event, index, topic)}
        />
      )}
      <MdCancel
        onClick={event => handleDeleteTopic(event, topic)}
        className='my-auto w-[28px] h-[28px] hover:opacity-50'
      />
    </div>
  )
}
