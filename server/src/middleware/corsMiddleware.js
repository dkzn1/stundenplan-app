const cors = require('cors')

const whitelist = ['http://127.0.0.1:5173', 'http://localhost:5173']

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   optionsSuccessStatus: 200,
// }

const options = {
  origin: ['http://localhost:5173', 'https://ibb-stundenplan.onrender.com'],
  methods: ['POST', 'GET'],
  credentials: true,
}

const corsMiddleware = cors(options)

module.exports = corsMiddleware
