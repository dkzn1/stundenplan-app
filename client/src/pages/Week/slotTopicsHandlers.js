import getSlotTopics from '@/lib/getSlotTopics'

//
//

export default function slotTopicsHandlers(
  topicData,
  lectureTopicsHandlers,
  setTopicUpdate,
  hoverSlot
) {
  //
  const { lectureTopics, deleteTopicHandler, updateTopicHandler } =
    lectureTopicsHandlers

  //
  //

  const handleInput = (event, topic, index) => {
    const { value: inputValue } = event.target
    const charCount = inputValue.length

    if (charCount <= 40) {
      const data = { ...topicData, index, topic: inputValue, unsaved: true }

      const tdata = getSlotTopics(lectureTopics, topicData)[index]

      if (tdata?.topic === inputValue.trim()) data.unsaved = false

      updateTopicHandler(data)
    }
  }

  //
  //

  const saveTopic = (event, index, topic) => {
    const data = { ...topicData, topic: topic.trim(), unsaved: false }

    const topics = getSlotTopics(lectureTopics, topicData)

    const type = 'topic_event'

    data.index = index

    const topicExists =
      topics
        .map(tpc => tpc.topic)
        .reduce((result, topic) => {
          return topic === data.topic ? result + 1 : result
        }, 0) > 1

    if (!topicExists || topics.length === 0) {
      setTopicUpdate({ type, data })
      updateTopicHandler(data)
    }
  }

  //
  //

  const deleteTopic = (event, index, topic) => {
    const existingTopic = getSlotTopics(lectureTopics, topicData)[index]

    const data = {
      ...topicData,
      topic: topic?.trim(),
      index,
      unsaved: existingTopic.unsaved,
    }

    deleteTopicHandler(data)

    if (!existingTopic.unsaved) setTopicUpdate({ type: 'delete_topic', data })
  }

  //
  //

  const closeTopic = topic => {
    if (topic?.trim() === '' && !hoverSlot) {
      const data = { ...topicData, topic: topic.trim() }
      deleteTopicHandler(data)
    }
  }

  //
  //

  const enterKeySave = (event, index, topic) => {
    if (event.key == 'Enter') {
      event.preventDefault()
      saveTopic(event, index, topic)
    }
  }

  //
  //

  return {
    handleInput,
    saveTopic,
    deleteTopic,
    closeTopic,
    enterKeySave,
  }
}
