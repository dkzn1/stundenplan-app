require('dotenv').config()
const bcrypt = require('bcrypt')

/**
 * @desc    Dashboard login
 * @route   POST dashboard/login
 * @access  Private
 */
const logIntoDashboard = async (req, res) => {
  const { username, password } = req.body

  const adminUsername = process.env.DEMO_LOGIN_USERNAME
  const adminPassword = process.env.DEMO_LOGIN_PASSWORD

  if (username === adminUsername) {
    bcrypt.compare(password, adminPassword, (err, result) => {
      if (result) {
        req.session.user = username

        res.send({ username, successful: true })
      } else {
        res.send({ message: 'Wrong password.', successful: false })
      }
    })
  } else {
    res.send({ message: 'Wrong username.', successful: false })
  }
}

/**
 * @desc    Check Login Status
 * @route   GET dashboard/login/status
 * @access  Public
 */
const checkLoginStatus = async (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true })
  } else {
    res.send({ loggedIn: false })
  }
}

module.exports = { logIntoDashboard, checkLoginStatus }
