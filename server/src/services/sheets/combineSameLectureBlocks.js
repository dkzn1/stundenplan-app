const refactorBlockData = block45Min => {
	return block45Min === null
		? { subjectType: 'Praxisunterricht', blockType: '45 min' }
		: {
				...block45Min,
				blockType: '45 min',
		  }
}

function combineSameLectureBlocks(dayTimeline45Min) {
	const lectureBlocks = dayTimeline45Min.reduce((timeline, block45Min, idx) => {
		const isDateBlock = idx === 0
		if (isDateBlock) return [block45Min]

		const current45MinBlock = refactorBlockData(block45Min)

		const firstPartBlocksOrBreakInbetween = [1, 3, 5, 6, 7]
		const notMergableBlocks = firstPartBlocksOrBreakInbetween.includes(idx)

		if (notMergableBlocks) return [...timeline, current45MinBlock]

		const prevBlock = timeline[timeline.length - 1]

		const blocksCanBeMerged =
			prevBlock &&
			prevBlock.blockType === '45 min' &&
			current45MinBlock.blockType === '45 min'

		const sameLecture = current45MinBlock.subjectType === prevBlock.subjectType

		if (blocksCanBeMerged && sameLecture) {
			timeline[timeline.length - 1] = {
				...current45MinBlock,
				blockType: '90 min',
			}
		} else {
			return [...timeline, current45MinBlock]
		}

		return timeline
	}, [])

	return lectureBlocks
}

module.exports = combineSameLectureBlocks
