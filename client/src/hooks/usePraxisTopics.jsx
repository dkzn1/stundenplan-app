import { useAtom } from 'jotai'

import { praxisTopicsAtom } from '@/atoms/praxisTopicsAtom'
import { lectureTopicsAtom } from '../atoms/lectureTopicsAtoms'
import { schedulesAtom } from '@/atoms/schedulesAtom'

import shuffleArray from '../utils/shuffleArray'
import createLectureSubjects from '../pages/Berichtsheft/createLectureSubjects'

export default function usePraxisTopics() {
  //
  const [praxisTopics, setPraxisTopics] = useAtom(praxisTopicsAtom)
  const [lectureTopics] = useAtom(lectureTopicsAtom)
  const [schedules] = useAtom(schedulesAtom)

  const fillPraxisAllTopics = id => {
    const dates = Object.keys(lectureTopics[id]).toSorted()

    const { timeline } = schedules[id]

    const timelineDays = Object.keys(timeline)
    const dateTimeline = timelineDays.reduce((result, day) => {
      result[timeline[day][0].date.replaceAll('.', '-')] = timeline[day]

      return result
    }, {})

    const createTopicsArray = date => {
      return Object.keys(lectureTopics[id][date]).reduce(
        (result, timeSlot, index) => {
          const mergedSlotTopics = lectureTopics[id][date][timeSlot]
            .map(item => item.topic)
            .join(', ')

          if (mergedSlotTopics.length === 0) return result

          const dateSubjects = createLectureSubjects(dateTimeline[date])

          result.push(`${dateSubjects[index]} | ${mergedSlotTopics}`)
          return result
        },
        []
      )
    }

    setPraxisTopics(prev => {
      const updatedEntries = { ...prev }

      for (const date of dates) {
        const formattedDate = date.replaceAll('.', '-')

        const dateTopics =
          id in lectureTopics && date in lectureTopics[id]
            ? createTopicsArray(date)
            : []

        if (dateTopics.length === 0) continue

        const shuffledDateTopics = shuffleArray(dateTopics)

        updatedEntries[formattedDate] = [
          ...shuffledDateTopics,
          ...shuffledDateTopics.reverse(),
          ...shuffledDateTopics,
        ]
      }

      return updatedEntries
    })
  }

  return {
    praxisTopics,
    lectureTopics,
    setPraxisTopics,
    fillPraxisAllTopics,
  }
}
