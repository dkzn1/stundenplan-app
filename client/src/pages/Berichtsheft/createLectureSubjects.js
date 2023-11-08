export default function createLectureSubjects(timeline) {
  //
  return timeline
    .slice(1)
    .reduce((acc, slot, idx) => {
      const is45MinBlock =
        slot?.blockType === '90 min' ||
        (slot?.blockType === '45 min' &&
          !(acc[idx - 1]?.subject === slot?.subject))

      if (slot?.subjectType === 'Theorieunterricht' && is45MinBlock) {
        acc.push(slot)
      }

      return acc
    }, [])
    .map(slot =>
      slot.subject.startsWith('FIAE') ? slot.subject.slice(5) : slot.subject
    )
}
