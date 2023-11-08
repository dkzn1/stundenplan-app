import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDashboardLogin } from '@/hooks/useDashboardLogin'

//
//

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [wrongLoginMessage, setWrongLoginMessage] = useState(false)

  const [loginStatus, setLoginStatus] = useDashboardLogin()

  const navigate = useNavigate()

  if (loginStatus) navigate('/dashboard', { replace: true })

  //
  //

  const login = () => {
    const requestBody = JSON.stringify({ username, password })

    fetch('http://localhost:5000/dashboard/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        if (data.successful) {
          setLoginStatus(true)
          if (wrongLoginMessage) setWrongLoginMessage(false)
          navigate('/dashboard', { replace: true })
        } else {
          setWrongLoginMessage(data.message)
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    login()
  }

  //
  //

  return (
    <div className=''>
      <h1 className='text-text-1 text-center my-2'>Admin Dashboard Login</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          className='mb-1 rounded-md px-2 py-1 bg-accent-1 text-text-1'
          type='text'
          placeholder='Username...'
          onChange={event => {
            setUsername(event.target.value)
          }}
        />
        <input
          className='rounded-md px-2 py-1 bg-accent-1 text-text-1'
          type='password'
          placeholder='Password...'
          onChange={event => {
            setPassword(event.target.value)
          }}
        />
        <button
          type='submit'
          className='mt-1 text-text-1 bg-accent-2 px-4 py-1 rounded-md w-full'
          onClick={login}
        >
          Login
        </button>
      </form>

      {wrongLoginMessage && (
        <p className='mt-2 text-center text-red-400'>{wrongLoginMessage}</p>
      )}
    </div>
  )
}
