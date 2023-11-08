const mongoose = require('mongoose')
const topicSchema = require('./Topic')

const scheduleSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: 'customIdValue',
	},
	scheduleName: {
		type: String,
		required: true,
	},
	calendarWeek: {
		type: Number,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	updatedAt: {
		type: String,
		required: true,
	},
	updateType: {
		type: String,
		required: true,
		enum: ['newCalendarWeekRelease', 'sameCalendarWeekUpdate'],
	},
	timeline: {
		type: Object,
		required: true,
	},
	topics: {
		type: Object,
		required: true,
	},
})

module.exports =
	mongoose?.models?.Schedule || mongoose.model('Schedule', scheduleSchema)
