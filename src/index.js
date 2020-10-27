const express = require('express')
const app = express()
const { port } = require('./config')

app.get('/', (req, res, next) => (
  res.send(`Server Status: 🟢 Online\nFor more information go to https://github.com/Ulzahk/Backend-Blog`)
))

app.listen(port, (req, res) => {
  console.log(`Server listening at http://localhost:${port}`)
})