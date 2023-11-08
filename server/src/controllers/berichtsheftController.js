const path = require('path')
const { unlink } = require('fs')
const fillBerichtsheft = require('../lib/fillBerichtsheft')
const deleteFile = require('../utils/deleteFile')

/**
 * @desc    generate berichtsheft
 * @route   POST api/berichtsheft
 * @access  Public
 */
const generateBerichtsheft = async (req, res) => {
  try {
    const { topics, calendarWeek } = await req.body

    const tempFileName = new Date().getTime()

    await fillBerichtsheft(topics, calendarWeek, tempFileName)

    const downloadLink = `http://localhost:5000/api/berichtsheft/download-berichtsheft?file=${tempFileName}&cw=${calendarWeek}`
    res.status(200).json({ message: 'File generated', downloadLink })
  } catch (error) {
    console.error('Error generating file:', error)
    res.status(500).json({ message: 'Error generating file' })
  }
}

/**
 * @desc    download berichtsheft
 * @route   GET api/berichtsheft/download
 * @access  Public
 */
const downloadBerichtsheft = async (req, res) => {
  const tempFileName = req.query.file
  const calendarWeek = req.query.cw

  const tempFilePath = path.join(
    __dirname,
    `../../downloads/${tempFileName}.xlsx`
  )
  const fileName = `berichtsheft-kw${calendarWeek}.xlsx`

  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)

  res.sendFile(tempFilePath, err => {
    if (err) {
      console.error('Error downloading file:', err)
      res.status(500).json({ message: 'Error downloading file' })
    }
  })

  setTimeout(() => {
    unlink(tempFilePath, err => {
      if (err) console.error('Error deleting file:', err)
    })
  }, 30000)
}

module.exports = { generateBerichtsheft, downloadBerichtsheft }
