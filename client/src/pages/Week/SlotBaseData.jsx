import SubjectIcon from '@/components/SubjectIcon'
import Slot45Min from './Slot45Min'
import SlotPortraitRatio from './SlotPortraitRatio'

//
//

export default function SlotBaseData({ data, screen: { isPortraitRatio } }) {
  //
  const {
    startTime,
    endTime,
    subject,
    lecturer,
    is45MinSlot,
    isPraxis,
    isLEK,
    topicsExist,
  } = data

  let formattedLecturer = lecturer

  const lecturerNameMaxLength = is45MinSlot ? 12 : 16

  if (lecturer?.length > lecturerNameMaxLength) {
    const splitName = lecturer.split(', ')
    const firstName = splitName[1].slice(0, 1)
    formattedLecturer = `${splitName[0]}, ${firstName}.`
  }

  //
  //

  const slotType = () => {
    if (is45MinSlot) {
      return Slot45Min({ ...data, isPortraitRatio, formattedLecturer })
    }

    const cssTimeText =
      'font-mono font-bold' + (isPortraitRatio ? ' text-xl' : ' text-lg')

    if (isPortraitRatio && !isPraxis) {
      return SlotPortraitRatio({
        ...data,
        formattedLecturer,
        cssTimeText,
      })
    }

    const cssTimeContainer =
      'flex justify-start space-x-1 max-xl:justify-center' +
      (isPraxis ? ' justify-center' : '')

    const cssSubjectText =
      'flex justify-start font-mono text-base max-xl:justify-center whitespace-nowrap' +
      (isPraxis ? ' justify-center' : ' font-semibold') +
      (isPortraitRatio ? ' text-lg' : ' text-sm')

    // default slot
    return (
      <div>
        <div className={cssTimeContainer}>
          <p className={cssTimeText}>{startTime}</p>
          <span className={cssTimeText}>-</span>
          <p className={cssTimeText}>{endTime}</p>
        </div>

        <div>
          <p className={cssSubjectText}>{subject}</p>
          <div>
            <p
              className={
                'my-auto flex font-mono max-xl:justify-center  whitespace-nowrap' +
                (isPortraitRatio ? ' text-md' : ' text-xs 2xl:text-sm')
              }
            >
              {formattedLecturer}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const lekIcon =
    'my-auto rounded-md border-2 border-black px-2 font-bold' +
    (is45MinSlot ? ' text-lg mr-2' : ' text-2xl mr-1')

  return (
    <div
      className={
        'flex items-center justify-center lg:px-2 2xl:px-3' +
        (topicsExist ? (is45MinSlot ? ' mt-[9px]' : ' mt-[27px]') : '') +
        (isPortraitRatio ? ' pb-1' : '')
      }
    >
      <div
        className={
          'flex max-xl:justify-center' + (isPraxis ? ' content-center' : '')
        }
      >
        {!is45MinSlot && !isLEK && (
          <div className='flex items-center'>
            <SubjectIcon
              subject={subject}
              type={'slot'}
              isPortraitRatio={isPortraitRatio}
            />
          </div>
        )}

        {isLEK && (
          <div className='flex'>
            <p className={lekIcon}>LEK</p>
          </div>
        )}

        {slotType()}
      </div>
    </div>
  )
}
