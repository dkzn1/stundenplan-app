import { useDashboardLogin } from '@/hooks/useDashboardLogin'

export default function Dashboard() {
  const [loginStatus] = useDashboardLogin()

  // not finished

  return (
    loginStatus && (
      <div className='flex flex-row min-w-[1100px] mt-10'>
        <div className='basis-1/6'>
          <ul className='space-y-1'>
            <li>
              <p className='text-text-1 font-semibold'>first</p>
            </li>
            <li>
              <p className='text-text-1 font-semibold'>second</p>
            </li>
            <li>
              <p className='text-text-1 font-semibold'>third</p>
            </li>
          </ul>
        </div>
        <div className='basis-5/6 bg-accent-1/50 rounded-2xl py-3 px-5 text-text-1 text-xl'>
          not finished
        </div>
      </div>
    )
  )
}
