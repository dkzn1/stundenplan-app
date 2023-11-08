const mongoose = require('mongoose')

const topicDateSchema = new mongoose.Schema({
	startTime: {
		type: Map,
		of: Array,
		required: false,
	},
})

const topicSchema = new mongoose.Schema({
	date: {
		type: Map,
		of: topicDateSchema,
		required: false,
	},
})

module.exports = topicSchema
