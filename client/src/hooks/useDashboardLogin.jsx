import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { loginStatusAtom } from '@/atoms/loginAtom'

export function useDashboardLogin() {
  const [loginStatus, setLoginStatus] = useAtom(loginStatusAtom)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/dashboard/login/status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        if (!data.loggedIn) {
          setLoginStatus(false)
          navigate('/dashboard/login', { replace: true })
        } else {
          setLoginStatus(true)
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error)
      })
  }, [])

  return [loginStatus, setLoginStatus]
}
