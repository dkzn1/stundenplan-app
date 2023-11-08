import { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import usePraxisTopics from '@/hooks/usePraxisTopics'

//
//

export default function PraxisRow({ index, date }) {
  //
  const { praxisTopics, setPraxisTopics } = usePraxisTopics()
  const [topics, setTopics] = useState(praxisTopics)

  //
  //

  const formattedDate = date.replaceAll('.', '-')

  //
  //

  useEffect(() => {
    setTopics(praxisTopics)
  }, [praxisTopics])

  //
  //

  const maxChars = 45

  const handleTopicInput = event => {
    const input = event.target
    const inputValue = input.value
    const charCount = inputValue.length

    if (charCount <= maxChars) {
      setPraxisTopics(prev => {
        const updatedEntry = { ...prev }

        const noPraxisEntries = !(formattedDate in updatedEntry)
        if (noPraxisEntries) updatedEntry[formattedDate] = []

        const noPraxisIndex = !(index in updatedEntry[formattedDate])
        if (noPraxisIndex) updatedEntry[formattedDate].push('')

        updatedEntry[formattedDate][index] = inputValue

        return updatedEntry
      })
    }
  }

  //
  //

  const handleDeleteTopic = () => {
    setPraxisTopics(prev => {
      const updatedEntry = { ...prev }
      updatedEntry[formattedDate][index] = ''
      return updatedEntry
    })
  }

  //
  //

  const praxisTopicEntry =
    formattedDate in topics && index in topics[formattedDate]
      ? topics[formattedDate][index]
      : ''

  const isNotEmpty = praxisTopicEntry.length > 0

  //
  //

  return (
    <div className='flex m-auto'>
      <div
        className={
          'basis-1/5 text-sm flex opacity-90 justify-end mr-2 rounded-lg pr-3 border-[1px] border-text-1/10 bg-[#5e6266] min-w-[145px]'
        }
      >
        <p className='my-auto xl:font-semibold select-none'>Praxis</p>
      </div>

      <div
        className={
          'rounded-md flex basis-4/5 justify-between py-1 pl-3 pr-2 space-x-1 hover:bg-accent-2 bg-accent-1 relative border-[1px] border-text-1/5'
        }
      >
        <input
          type='text'
          className='text-text-1 bg-accent-1/0 w-full focus:outline-none placeholder-text-1/60 min-h-[28px]'
          value={praxisTopicEntry}
          onChange={handleTopicInput}
        />

        {isNotEmpty && (
          <MdCancel
            onClick={handleDeleteTopic}
            className='my-auto w-[28px] text-text-3 h-[28px] hover:opacity-50 cursor-pointer'
          />
        )}
      </div>
    </div>
  )
}
