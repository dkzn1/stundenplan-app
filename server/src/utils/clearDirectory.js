const { unlinkSync, readdirSync } = require('fs')

async function clearDirectory(dirPath) {
	try {
		const files = readdirSync(dirPath)

		if (files.length === 0) return

		await Promise.all(
			files.map(file => {
				const filePath = `${dirPath}/${file}`
				unlinkSync(filePath)
			})
		)
	} catch (err) {
		console.error(`Error clearing directory: ${dirPath}`, err)
	}
}

module.exports = clearDirectory
