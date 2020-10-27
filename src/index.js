const express = require('express')
const database = require('./database')
const { port } = require('./config')
const cors = require('cors')
const usersAPI = require('./components/users/routes')
const postsAPI = require('./components/blogPosts/routes')

// Api
const api = express()

// MongoDB Connection
database.connection()

// Body Parser
api.use(express.json({ extended: true, limit: '5mb' }))

/// Cors
api.use(cors())

// Routes
usersAPI(api)
postsAPI(api)
api.get('/', (req, res, next) => (
  res.send('Server Status: [🟢 Online]\nFor more information go to https://github.com/Ulzahk/Backend-Blog')
))

// Server
const server = api.listen(port, (req, res) => {
  console.log(`Server listening at http://localhost:${server.address().port}`)
})
