const mongoose = require('mongoose')
const Schedule = require('../models/Schedule') 
const db = require('./db')

db.connect()

const updateDocuments = async () => {
	try {
		// await Schedule.updateMany({}, { $set: { topics: {} } })

		const schedules = await Schedule.find({})

		console.log(schedules)

		console.log('Documents updated successfully.')
	} catch (error) {
		console.error('Error updating documents:', error)
	} finally {
		db.disconnect()
	}
}

updateDocuments()
