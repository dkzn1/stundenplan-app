const https = require('https')
const { createWriteStream } = require('fs')

module.exports = async (path, url) => {
	const schedulePath = path.join(__dirname, '../../downloads/newSchedule.pdf')

	https.get(url, response => {
		response.pipe(createWriteStream(schedulePath))
	})
}
