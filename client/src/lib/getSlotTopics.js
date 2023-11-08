export default function getSlotTopics(topics, { id, date, startTime }) {
  //
  return topics[id] && topics[id][date] && topics[id][date][startTime]
}
