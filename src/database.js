const mongoose = require('mongoose')
const { dbUser, dbPassword, dbHost, dbName } = require('./config')

const mongoDbUrl = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`

const connection = async (cb) => {
  try {
    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('MongoDB Connected')
  } catch (error) {
    cb(error)
  }
}

module.exports = { connection }