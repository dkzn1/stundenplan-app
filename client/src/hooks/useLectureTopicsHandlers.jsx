import { useAtom } from 'jotai'
import {
  lectureTopicsAtom,
  localLectureTopicsAtom,
} from '@/atoms/lectureTopicsAtoms'
import getSlotTopics from '@/lib/getSlotTopics.js'

//
//

export default function useLectureTopicsHandlers() {
  //
  const [lectureTopics, setLectureTopics] = useAtom(lectureTopicsAtom)
  const [localLectureTopics] = useAtom(localLectureTopicsAtom)

  const syncLectureTopicsHandler = data => {
    setLectureTopics(prev => {
      const scheduleIDs = Object.keys(data)

      const createStoredTopics = (acc, id) => {
        if ('topics' in data[id]) acc[id] = data[id].topics
        return acc
      }
      const storedLectureTopics = scheduleIDs.reduce(createStoredTopics, {})

      return { ...storedLectureTopics, ...prev }
    })
  }

  //
  //

  const createTopicHandler = async topicData => {
    if (!topicData) return

    const { id, date, startTime, topic, unsaved } = topicData

    const cbCreate = prev => {
      const updatedLectureTopics = { ...prev }

      if (!(id in updatedLectureTopics)) updatedLectureTopics[id] = {}
      if (!(date in updatedLectureTopics[id]))
        updatedLectureTopics[id][date] = {}
      if (!(startTime in updatedLectureTopics[id][date])) {
        const savedSlotTopics = getSlotTopics(lectureTopics, topicData)

        updatedLectureTopics[id][date][startTime] = savedSlotTopics
          ? [...savedSlotTopics]
          : []
      }

      const topicEntries = updatedLectureTopics[id][date][startTime].filter(
        tpc => tpc?.topic.length > 0
      )

      const topics = topicEntries.map(tpc => tpc.topic)

      if (!topics.includes(topic)) {
        updatedLectureTopics[id][date][startTime] = [
          ...topicEntries,
          { topic, unsaved },
        ]
      }

      return updatedLectureTopics
    }

    setLectureTopics(cbCreate)
  }

  //
  //

  const deleteTopicHandler = topicData => {
    if (!topicData) return

    const { id, date, startTime, topic, index, unsaved } = topicData

    const cbDelete = prev => {
      const updatedLectureTopics = { ...prev }

      unsaved
        ? updatedLectureTopics[id][date][startTime].splice(index, 1)
        : (updatedLectureTopics[id][date][startTime] = updatedLectureTopics[id][
            date
          ][startTime].filter(sateTopic => sateTopic?.topic?.trim() !== topic))

      return updatedLectureTopics
    }

    setLectureTopics(cbDelete)
  }

  //
  //

  const deleteAllTopicsHandler = topicData => {
    if (!topicData) return

    const { id, date, startTime } = topicData

    const cbDelete = prev => {
      const updatedLectureTopics = { ...prev }

      if (id in updatedLectureTopics)
        updatedLectureTopics[id][date][startTime] = []

      return updatedLectureTopics
    }

    setLectureTopics(cbDelete)
  }

  //
  //

  const updateTopicHandler = topicData => {
    if (!topicData) return

    const { id, date, startTime, index, topic, unsaved } = topicData

    const cbUpdate = prev => {
      const updatedLectureTopics = { ...prev }

      updatedLectureTopics[id][date][startTime][index] = { topic, unsaved }

      if (!unsaved) {
        updatedLectureTopics[id][date][startTime][index].dbsynced = true
      }

      return updatedLectureTopics
    }

    setLectureTopics(cbUpdate)
  }

  //
  //

  return {
    lectureTopics,
    localLectureTopics,
    syncLectureTopicsHandler,
    createTopicHandler,
    deleteTopicHandler,
    deleteAllTopicsHandler,
    updateTopicHandler,
  }
}
