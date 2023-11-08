import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { schedulesAtom } from '@/atoms/schedulesAtom'
import useLectureTopicsHandlers from '@/hooks/useLectureTopicsHandlers'

//
//

export default function useFetchSchedules(id) {
  //
  const [schedules, setSchedules] = useAtom(schedulesAtom)
  const { syncLectureTopicsHandler } = useLectureTopicsHandlers()

  const queryFn = async () => {
    const response = await fetch(`http://localhost:5000/api/schedules`)
    const data = await response.json()

    setSchedules(prevSchedules => ({
      ...prevSchedules,
      ...data,
    }))

    syncLectureTopicsHandler(data)

    return data[id]
  }

  const {
    data: fetchedSchedule,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['schedule', id],
    queryFn,
    enabled: !(id in schedules),
  })

  useEffect(() => {
    if (!isSuccess && id in schedules) {
      refetch()
    }
  }, [isSuccess, id, refetch, schedules])

  return { fetchedSchedule, isLoading, isError, isSuccess }
}
