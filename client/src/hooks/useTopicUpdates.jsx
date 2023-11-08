import { useState } from 'react'

export default function useTopicUpdates() {
  //
  const [topicUpdate, setTopicUpdate] = useState(null)

  return [topicUpdate, setTopicUpdate]
}
