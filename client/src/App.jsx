import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import io from 'socket.io-client'
import { useAtom } from 'jotai'
import { useWindowSize } from 'react-use'

import Header from './components/Header.jsx'
import Week from './pages/Week/Week.jsx'
import Berichtsheft from './pages/Berichtsheft/Berichtsheft'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Dashboard/Login'
import Error from './pages/Error.jsx'

import { topicUpdateAtom } from './atoms/lectureTopicsAtoms.js'
import useLectureTopicsHandlers from './hooks/useLectureTopicsHandlers.jsx'

import getCalendarWeek from './utils/getCalendarWeek'
import getScreenSizeRatio from '@/lib/getScreenSizeRatio'

import './App.css'

//

const socket = io.connect('http://localhost:5000')

//

export default function App() {
  const [newScheduleUpdate, setNewScheduleUpdate] = useState(false)
  const [topicUpdate, setTopicUpdate] = useAtom(topicUpdateAtom)

  const {
    createTopicHandler,
    deleteTopicHandler,
    deleteAllTopicsHandler,
    updateTopicHandler,
  } = useLectureTopicsHandlers()

  const { pathname } = useLocation()
  const isDashboard = pathname.includes('dashboard')

  const { width, height } = useWindowSize()
  const screen = getScreenSizeRatio(height, width)
  const { isPortraitRatio, isMobileRatio } = screen

  // demo version, static data
  // const currentCalendarWeek = getCalendarWeek()
  const currentCalendarWeek = 21

  const currentYear = new Date().getFullYear()
  const latestScheduleID = `${currentYear}cw${currentCalendarWeek}`

  //
  //

  useEffect(() => {
    // demo version, disabled
    // socket.on('new_schedule_update', data => {
    // 	setNewScheduleUpdate(data.schedule)
    // })

    socket.on('broadcast_created_topic', createTopicHandler)
    socket.on('broadcast_deleted_topic', deleteTopicHandler)
    socket.on('broadcast_updated_topic', updateTopicHandler)
    socket.on('broadcast_all_deleted_topics', deleteAllTopicsHandler)

    const cleanup = () => {
      socket.off(
        'broadcast_created_topic',
        'broadcast_updated_topic',
        'broadcast_deleted_topic',
        'broadcast_all_deleted_topics'
      )
    }

    return cleanup
  }, [socket])

  //
  //

  useEffect(() => {
    if (topicUpdate) {
      const { type, data } = topicUpdate

      switch (type) {
        case 'topic_event':
          socket.emit('topic_event', data)
          break

        case 'delete_topic':
          socket.emit('delete_topic', data)
          break

        case 'delete_all_topics':
          socket.emit('delete_all_topics', data)
          break
      }

      setTopicUpdate(null)
    }
  }, [topicUpdate])

  //
  //

  const weekView = (
    <Week
      latestScheduleID={latestScheduleID}
      newSchedule={newScheduleUpdate}
      screen={screen}
    />
  )

  const berichtsheftView = (
    <Berichtsheft
      latestScheduleID={latestScheduleID}
      screen={screen}
    />
  )

  const cssContainer = isMobileRatio
    ? 'w-full px-2'
    : isPortraitRatio
    ? 'w-[65%] mx-auto'
    : 'w-min md:mx-auto'

  //
  //

  return (
    <>
      <div className={cssContainer}>
        {!isDashboard && (
          <Header
            latestScheduleID={latestScheduleID}
            screen={screen}
          />
        )}
        <Routes>
          <Route
            path='/'
            element={weekView}
          />

          <Route
            path='/week'
            element={weekView}
          />

          <Route
            path='/week/:scheduleID'
            element={weekView}
          />
          <Route
            path='/week/:scheduleID/berichtsheft'
            element={berichtsheftView}
          />

          <Route
            path='/berichtsheft'
            element={berichtsheftView}
          />

          <Route
            path='/dashboard'
            element={<Dashboard />}
          />

          <Route
            path='/dashboard/login'
            element={<Login />}
          />

          <Route
            path='*'
            element={<Error />}
          />
        </Routes>
      </div>
    </>
  )
}
