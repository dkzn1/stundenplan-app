const { unlink } = require('fs')

function deleteFile(filePath) {
  unlink(filePath, err => {
    if (err) console.error('Error deleting file:', err)
  })
}

module.exports = deleteFile
