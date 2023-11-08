import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/404', { replace: true })

    return () => {}
  }, [navigate])

  return (
    <section className='min-w-max m-auto'>
      <h2>404</h2>
      <p>page not found</p>
      <Link to='/'>back home</Link>
    </section>
  )
}
