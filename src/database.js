const mongoose = require('mongoose')
const debug = require('debug')('mongoose:connection')
const { dbUser, dbPassword, dbHost, dbName } = require('./config')

const mongoDbUrl = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`

const connection = async () => {
  try {
    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    debug('MongoDB Connected')
  } catch (error) {
    debug(error)
  }
}

module.exports = { connection }
