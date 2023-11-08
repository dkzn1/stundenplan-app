function addBlockTimes(dayTimeline, openTimeSlots) {
	const assignTimeSlots = (dayBlocks, block, idx) => {
		const isDateBlock = idx === 0
		if (isDateBlock) {
			dayBlocks.scheduleTimeBlocks.push(block)
			return dayBlocks
		}

		const fillTimeSlotsBasedOnBlockLength = numberOfBlocks => {
			const { timeSlots } = dayBlocks

			const timeAddedBlock = {
				...block,
				startTime: timeSlots[0].start,
				endTime: timeSlots[numberOfBlocks - 1].end,
			}

			dayBlocks.scheduleTimeBlocks.push(timeAddedBlock)

			dayBlocks.timeSlots = timeSlots.slice(numberOfBlocks)

			return dayBlocks
		}

		return block.blockType === '45 min'
			? fillTimeSlotsBasedOnBlockLength(1)
			: fillTimeSlotsBasedOnBlockLength(2)
	}

	const lectureData = dayTimeline.reduce(assignTimeSlots, {
		scheduleTimeBlocks: [],
		timeSlots: openTimeSlots,
	})

	const last1HourBlock = {
		subjectType: 'Praxisunterricht',
		startTime: '15.00',
		endTime: '16.00',
	}

	lectureData.scheduleTimeBlocks.push(last1HourBlock)

	return lectureData.scheduleTimeBlocks
}

module.exports = addBlockTimes
